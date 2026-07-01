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

    const formData = await req.formData()
    const studentName = formData.get('studentName') as string
    const studentEmail = formData.get('studentEmail') as string
    const transcript = JSON.parse((formData.get('transcript') as string) || '[]')
    const report = JSON.parse((formData.get('report') as string) || 'null')
    const file = formData.get('pdf') as File | null

    let pdfFileField: any = undefined
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const asset = await client.assets.upload('file', buffer, {
        filename: file.name,
        contentType: file.type || 'application/pdf',
      })
      pdfFileField = { _type: 'file', asset: { _type: 'reference', _ref: asset._id } }
    }

    const created = await client.create({
      _type: 'tipeSubmission',
      studentName,
      studentEmail,
      pdfFile: pdfFileField,
      transcript,
      report,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true, id: created._id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur serveur.' }, { status: 500 })
  }
}