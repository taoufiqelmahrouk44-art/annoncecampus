'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

const categoryLabels: Record<string, string> = {
  actualites: 'Actualités',
  evenements: 'Événements',
  opportunites: 'Opportunités',
  annonces: 'Annonces',
  'vie-etudiante': 'Vie étudiante',
  stages: 'Stages',
  logement: 'Logement',
}

const categoryColors: Record<string, string> = {
  actualites: '#7A0019',
  evenements: '#9b2c2c',
  opportunites: '#c53030',
  annonces: '#7A0019',
  'vie-etudiante': '#b91c1c',
  stages: '#1a5276',
  logement: '#1e8449',
}

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <img src="/logo.jpg" alt="AnnonceCampus" className="h-40 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
             { label: 'Accueil', href: '/' },
{ label: 'Actualités', href: '/category/actualites' },
{ label: 'Stages', href: '/category/stages' },
{ label: 'Logement', href: '/category/logement' },
{ label: 'Événements', href: '/category/evenements' },
{ label: 'À propos', href: '/about' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="text-gray-600 hover:text-[#7A0019] text-sm font-medium transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7A0019] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { client } = await import('@/sanity/lib/client')
        const { urlFor } = await import('@/sanity/lib/image')
        const data = await client.fetch(`
          *[_type == "post" && slug.current == $slug][0] {
            _id, title, excerpt, mainImage, category, publishedAt, body
          }
        `, { slug })
        if (data?.mainImage) {
          data.imageUrl = urlFor(data.mainImage).width(900).height(500).url()
        }
        setPost(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#7A0019] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!post) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 mb-4">Article introuvable</p>
        <Link href="/" className="text-[#7A0019] hover:underline font-bold">← Retour</Link>
      </div>
    </div>
  )

  const color = categoryColors[post.category] || '#7A0019'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded text-white" style={{ background: color }}>
            {categoryLabels[post.category] || post.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">{post.title}</h1>

        <p className="text-gray-400 text-sm mb-8">
          {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        {post.imageUrl && (
          <div className="w-full h-72 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-md">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <p className="text-lg text-gray-600 font-medium mb-8 border-l-4 border-[#7A0019] pl-4 bg-red-50 py-3 rounded-r-xl">
          {post.excerpt}
        </p>

        <div className="prose prose-lg max-w-none text-gray-700">
          {post.body && <PortableText value={post.body} />}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-[#7A0019] hover:underline font-bold text-sm">← Retour aux articles</Link>
        </div>
      </article>

      <footer className="border-t border-gray-200 mt-20 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src="/logo.jpg" alt="AnnonceCampus" className="h-40 w-auto mx-auto mb-3" />
          <p className="text-gray-400 text-sm">L'info étudiante en temps réel · © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}