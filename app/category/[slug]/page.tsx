'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage: any
  category: string
  publishedAt: string
  imageUrl?: string
}

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

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { client } = await import('@/sanity/lib/client')
        const { urlFor } = await import('@/sanity/lib/image')
        const data = await client.fetch(`
          *[_type == "post" && category == $category] | order(publishedAt desc) {
            _id, title, slug, excerpt, mainImage, category, publishedAt
          }
        `, { category: slug })
        const withImages = data.map((p: Post) => ({
          ...p,
          imageUrl: p.mainImage ? urlFor(p.mainImage).width(800).height(500).url() : null
        }))
        setPosts(withImages)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  const label = categoryLabels[slug] || slug
  const color = categoryColors[slug] || '#7A0019'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full" style={{ background: color }} />
            <h1 className="text-3xl font-black text-gray-800">{label}</h1>
          </div>
          <p className="text-gray-500 text-sm ml-4">
            {posts.length} article{posts.length !== 1 ? 's' : ''} publié{posts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: color, borderTopColor: 'transparent' }} />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-6">
              <span className="text-2xl">📰</span>
            </div>
            <h3 className="text-gray-700 font-bold text-xl mb-2">Aucun article dans cette catégorie</h3>
            <p className="text-gray-400 text-sm mb-6">Notre équipe prépare des articles. Revenez bientôt !</p>
            <Link href="/" className="text-[#7A0019] font-bold hover:underline text-sm">← Retour à l'accueil</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(post => (
              <Link key={post._id} href={`/articles/${post.slug.current}`}>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    {post.imageUrl
                      ? <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="w-full h-full bg-gray-100" />
                    }
                    <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded text-white" style={{ background: color }}>
                      {label}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="text-gray-800 font-bold text-base line-clamp-2 mb-2">{post.title}</h4>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">
                        {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="text-xs font-bold group-hover:underline" style={{ color }}>Lire →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 mt-20 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src="/logo.jpg" alt="AnnonceCampus" className="h-40 w-auto mx-auto mb-3" />
          <p className="text-gray-400 text-sm">L'info étudiante en temps réel · © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}