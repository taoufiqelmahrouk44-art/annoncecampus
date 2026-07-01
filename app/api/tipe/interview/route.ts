import { NextRequest, NextResponse } from 'next/server'

const MODEL = 'gemini-2.5-flash'

function juryPrompt(presentationText: string) {
  return `Tu es un jury d'entretien oral TIPE pour le concours CNC marocain (classes préparatoires). Tu es rigoureux mais bienveillant, comme un vrai jury d'école d'ingénieur.

Voici le texte extrait de la présentation TIPE de l'étudiant :
"""
${presentationText.slice(0, 40000)}
"""

Règles strictes :
- Tu poses UNE seule question à la fois, formulée naturellement à l'oral (jamais de liste, jamais de markdown, jamais de numérotation).
- Tes questions testent tour à tour : la maîtrise technique du sujet, la capacité à vulgariser/expliquer simplement, la motivation et le recul critique sur le travail effectué.
- Adapte ta question suivante à la réponse précédente : creuse si la réponse est vague, challenge poliment si l'étudiant semble trop sûr de lui, varie l'angle si la réponse était bonne.
- Ne donne AUCUN feedback ni évaluation pendant l'entretien. Pose uniquement des questions, comme dans un vrai oral.
- Réponds uniquement avec le texte de ta question (et éventuellement une très courte phrase de transition), rien d'autre.`
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Clé Gemini non configurée côté serveur.' }, { status: 500 })
    }

    const { presentationText, history } = await req.json()
    if (!presentationText || !Array.isArray(history)) {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
    }

    const contents = history.map((h: { role: string; text: string }) => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.text }],
    }))

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: juryPrompt(presentationText) }] },
          contents,
        }),
      }
    )
    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return NextResponse.json({ error: data?.error?.message || 'Réponse vide du jury.' }, { status: 502 })
    }

    return NextResponse.json({ reply: text })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur serveur.' }, { status: 500 })
  }
}