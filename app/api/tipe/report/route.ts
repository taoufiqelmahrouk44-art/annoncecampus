import { NextRequest, NextResponse } from 'next/server'

const MODEL = 'gemini-2.5-flash'
const SCORE_MAX = 20

const REPORT_SYSTEM_PROMPT = `Tu es un jury TIPE expérimenté qui corrige un entretien blanc pour aider un étudiant à se préparer au concours CNC marocain. Sois précis, concret et bienveillant mais honnête.

Réponds UNIQUEMENT avec un objet JSON valide, sans markdown, sans texte autour, au format exact suivant :
{
  "items": [
    {"question": "...", "score": 14, "points_forts": "...", "a_ameliorer": "..."}
  ],
  "conseils_generaux": ["...", "...", "..."]
}
Le score est sur ${SCORE_MAX}. "points_forts" et "a_ameliorer" sont des phrases courtes et concrètes (1-2 phrases max chacune). "conseils_generaux" contient 3 à 5 conseils actionnables pour le jour de l'entretien réel.`

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Clé Gemini non configurée côté serveur.' }, { status: 500 })
    }

    const { transcriptText } = await req.json()
    if (!transcriptText) {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: REPORT_SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: `Voici la transcription complète de l'entretien :\n\n${transcriptText}` }] }],
        }),
      }
    )
    const data = await res.json()
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!raw) {
      return NextResponse.json({ error: data?.error?.message || 'Réponse vide.' }, { status: 502 })
    }

    const clean = raw.replace(/```json|```/g, '').trim()
    const report = JSON.parse(clean)

    return NextResponse.json({ report })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur serveur.' }, { status: 500 })
  }
}