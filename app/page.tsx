'use client'

import { useEffect, useRef, useState } from 'react'
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
  evenements: '#7A0019',
  opportunites: '#7A0019',
  annonces: '#7A0019',
  'vie-etudiante': '#7A0019',
  stages: '#1a5276',
  logement: '#1e8449',
}

const STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif; background: #f5f6f8; }
  @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes drawerIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  a { text-decoration: none; }
  img { display: block; }
  @media(max-width:1024px){ .three-col { grid-template-columns: repeat(2,1fr) !important; } }
  @media(max-width:768px){
    .nav-links { display: none !important; }
    .hamburger { display: flex !important; }
    .hero-title { font-size: 28px !important; }
    .hero-img { height: 420px !important; }
    .hero-content-pad { padding: 32px 28px !important; }
    .featured-grid { grid-template-columns: 1fr !important; }
    .three-col { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .main-pad { padding: 32px 20px !important; }
  }
`

// ── Ticker ──────────────────────────────────────────────────────────────────
function NewsTicker({ posts }: { posts: Post[] }) {
  const text = (posts.length > 0 ? posts.map(p => p.title) : ["Bienvenue sur AnnonceCampus", "L'info campus en temps réel"]).join('   ·   ')
  return (
    <div style={{ background: '#7A0019', padding: '7px 0', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ flexShrink: 0, background: 'white', color: '#7A0019', fontSize: 9, fontWeight: 900, letterSpacing: '0.15em', padding: '3px 12px', margin: '0 20px', textTransform: 'uppercase' }}>LIVE</span>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <p style={{ whiteSpace: 'nowrap', color: 'rgba(255,255,255,0.92)', fontSize: 12, animation: 'ticker 40s linear infinite', letterSpacing: '0.03em' }}>
            {text} &nbsp;&nbsp;&nbsp;&nbsp; {text}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [
    { label: 'Accueil', href: '/' },
    { label: 'Actualités', href: '/category/actualites' },
    { label: 'Stages', href: '/category/stages' },
    { label: 'Logement', href: '/category/logement' },
    { label: 'Événements', href: '/category/evenements' },
    { label: 'À propos', href: '/about' },
  ]
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #e8eaed', boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none', transition: 'box-shadow 0.3s' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        <button className="hamburger" onClick={onMenuOpen} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 6, flexDirection: 'column', gap: 5, marginRight: 12 }}>
          <div style={{ width: 22, height: 2, background: '#1e293b', borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: '#1e293b', borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: '#1e293b', borderRadius: 2 }} />
        </button>
        <Link href="/"><img src="/logo.jpg" alt="AnnonceCampus" style={{ height: 100, width: 'auto' }} /></Link>
        <div className="nav-links" style={{ display: 'flex', gap: 2 }}>
          {links.map(item => (
            <Link key={item.href} href={item.href} style={{ color: '#374151', fontSize: 14, fontWeight: 500, padding: '7px 15px', borderRadius: 8, transition: 'all 0.18s', letterSpacing: '0.01em' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#7A0019'; e.currentTarget.style.background = '#fef2f2' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent' }}>
              {item.label}
            </Link>
          ))}
        </div>
        <div style={{ width: 44 }} />
      </div>
    </nav>
  )
}

// ── Mobile Drawer ─────────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const links = [
    { label: 'Accueil', href: '/', icon: '🏠' },
    { label: 'Actualités', href: '/category/actualites', icon: '📰' },
    { label: 'Stages', href: '/category/stages', icon: '💼' },
    { label: 'Logement', href: '/category/logement', icon: '🏡' },
    { label: 'Événements', href: '/category/evenements', icon: '🎉' },
    { label: 'À propos', href: '/about', icon: 'ℹ️' },
  ]
  if (!open) return null
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, backdropFilter: 'blur(3px)' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 290, background: 'white', zIndex: 201, animation: 'drawerIn 0.25s ease', boxShadow: '6px 0 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
          <img src="/logo.jpg" alt="AnnonceCampus" style={{ height: 36, width: 'auto' }} />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: 24, lineHeight: 1, padding: 4 }}>×</button>
        </div>
        <nav style={{ padding: '12px', flex: 1 }}>
          {links.map(item => (
            <Link key={item.href} href={item.href} onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', color: '#1e293b', fontWeight: 500, fontSize: 15, borderRadius: 10, marginBottom: 2, transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#7A0019' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1e293b' }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9' }}>
          <p style={{ color: '#94a3b8', fontSize: 12 }}>© {new Date().getFullYear()} AnnonceCampus</p>
        </div>
      </div>
    </>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ post }: { post: Post }) {
  return (
    <Link href={`/articles/${post.slug.current}`}>
      <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', marginBottom: 56, transition: 'transform 0.3s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
        {post.imageUrl
          ? <img className="hero-img" src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 600, objectFit: 'cover' }} />
          : <div className="hero-img" style={{ width: '100%', height: 600, background: 'linear-gradient(135deg, #7A0019, #c0392b)' }} />
        }
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)' }} />
        <div className="hero-content-pad" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '56px 64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ background: categoryColors[post.category] || '#7A0019', color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 13px', borderRadius: 5 }}>
              {categoryLabels[post.category] || post.category}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>À la une</span>
          </div>
          <h1 className="hero-title" style={{ color: 'white', fontWeight: 900, fontSize: 46, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 820 }}>{post.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.7, marginBottom: 28, maxWidth: 580, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
              {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span style={{ background: 'white', color: '#0f172a', fontSize: 13, fontWeight: 700, padding: '11px 28px', borderRadius: 9 }}>
              Lire l'article →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Featured Row (3 cards) ────────────────────────────────────────────────────
function FeaturedRow({ posts }: { posts: Post[] }) {
  if (!posts.length) return null
  return (
    <div style={{ marginBottom: 64 }}>
      <div className="featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {posts.map(post => (
          <Link key={post._id} href={`/articles/${post.slug.current}`}>
            <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid #f0f2f5', transition: 'all 0.25s', height: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.13)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                {post.imageUrl
                  ? <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)' }} />
                }
                <span style={{ position: 'absolute', top: 12, left: 12, background: categoryColors[post.category] || '#7A0019', color: 'white', fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4 }}>
                  {categoryLabels[post.category] || post.category}
                </span>
              </div>
              <div style={{ padding: '20px 22px 24px' }}>
                <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: 16, lineHeight: 1.45, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h3>
                <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f8fafc', paddingTop: 14 }}>
                  <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 500 }}>{new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span style={{ color: '#7A0019', fontSize: 12, fontWeight: 700 }}>Lire →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
function Section({ title, categoryKey, posts }: { title: string; categoryKey: string; posts: Post[] }) {
  if (!posts.length) return null
  return (
    <div style={{ marginBottom: 72 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 3, height: 26, background: categoryColors[categoryKey] || '#7A0019', borderRadius: 2 }} />
          <h2 style={{ color: '#0f172a', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>{title}</h2>
        </div>
        <Link href={`/category/${categoryKey}`} style={{ color: '#7A0019', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', border: '1.5px solid #fecdd3', borderRadius: 8, transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#7A0019'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#7A0019' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7A0019'; e.currentTarget.style.borderColor = '#fecdd3' }}>
          Voir plus →
        </Link>
      </div>
      <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
        {posts.slice(0, 4).map(post => (
          <Link key={post._id} href={`/articles/${post.slug.current}`}>
            <div style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5', transition: 'all 0.25s', height: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 14px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                {post.imageUrl
                  ? <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)' }} />
                }
              </div>
              <div style={{ padding: '16px 18px 20px' }}>
                <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: 14, lineHeight: 1.45, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h4>
                <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f8fafc', paddingTop: 12 }}>
                  <span style={{ color: '#94a3b8', fontSize: 11 }}>{new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                  <span style={{ color: categoryColors[categoryKey] || '#7A0019', fontSize: 11, fontWeight: 700 }}>Lire →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const { client } = await import('@/sanity/lib/client')
        const { urlFor } = await import('@/sanity/lib/image')
        const data = await client.fetch(`*[_type == "post"] | order(publishedAt desc) { _id, title, slug, excerpt, mainImage, category, publishedAt }`)
        const withImages = data.map((p: Post) => ({
          ...p,
          imageUrl: p.mainImage ? urlFor(p.mainImage).width(1200).height(700).url() : null
        }))
        setPosts(withImages)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const byCategory = (cat: string) => posts.filter(p => p.category === cat)
  const featured = posts[0]
  const featuredRow = posts.slice(1, 4)

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f8' }}>
      <style>{STYLES}</style>
      <NewsTicker posts={posts} />
      <Navbar onMenuOpen={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="main-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '52px 36px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '160px 0' }}>
            <div style={{ width: 30, height: 30, border: '2.5px solid #7A0019', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '160px 0' }}>
            <p style={{ color: '#94a3b8', fontSize: 16 }}>Aucun article publié pour le moment.</p>
          </div>
        ) : (
          <>
            {featured && <Hero post={featured} />}
            <FeaturedRow posts={featuredRow} />
            <Section title="Actualités" categoryKey="actualites" posts={byCategory('actualites')} />
            <Section title="Événements" categoryKey="evenements" posts={byCategory('evenements')} />
            <Section title="Stages" categoryKey="stages" posts={byCategory('stages')} />
            <Section title="Logement" categoryKey="logement" posts={byCategory('logement')} />
          </>
        )}
      </main>

      <footer style={{ background: '#0f172a', color: 'white', marginTop: 80 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 36px 36px' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <img src="/logo.jpg" alt="AnnonceCampus" style={{ height: 100, width: 'auto', marginBottom: 16, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.75, maxWidth: 300 }}>
                La plateforme de référence pour l'information étudiante au Maroc. Actualités, stages, logements et événements campus.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Rubriques</h4>
              {[
                { label: 'Actualités', href: '/category/actualites' },
                { label: 'Stages', href: '/category/stages' },
                { label: 'Logement', href: '/category/logement' },
                { label: 'Événements', href: '/category/evenements' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 12, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Informations</h4>
              {[
                { label: 'À propos', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Mentions légales', href: '/mentions-legales' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 12, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ color: '#475569', fontSize: 13 }}>© {new Date().getFullYear()} AnnonceCampus · L'info étudiante en temps réel</p>
            <div style={{ display: 'flex', gap: 4 }}>
              {['#7A0019', '#1a5276', '#1e8449'].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}