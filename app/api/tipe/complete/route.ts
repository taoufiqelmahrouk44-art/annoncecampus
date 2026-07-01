import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: '1x46h9dd',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json({ error: 'Token Sanity non configuré côté serveur.' }, { status: 500 })
    }

    const { submissionId, transcript, report } = await req.json()
    if (!submissionId) {
      return NextResponse.json({ error: 'submissionId manquant.' }, { status: 400 })
    }

    await client
      .patch(submissionId)
      .set({ transcript, report, completedAt: new Date().toISOString() })
      .commit()

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur serveur.' }, { status: 500 })
  }
}
