'use client'
import Link from 'next/link'
export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1a1a1a', marginBottom: '1rem' }}>Contact</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Pour toute question ou demande, contactez-nous :</p>
      <a href="mailto:contact@annoncecampus.com" style={{ background: '#7A0019', color: 'white', fontWeight: 700, padding: '1rem 2rem', borderRadius: '0.75rem', textDecoration: 'none' }}>
        contact@annoncecampus.com
      </a>
      <div style={{ marginTop: '2rem' }}>
        <Link href="/" style={{ color: '#7A0019', textDecoration: 'none', fontSize: '0.9rem' }}>← Retour à l&#39;accueil</Link>
      </div>
    </div>
  )
}