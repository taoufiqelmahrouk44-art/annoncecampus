'use client'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <img src="/logo.jpg" alt="AnnonceCampus" style={{ height: 120, width: 'auto' }} />
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
                <Link key={item.href} href={item.href} className="text-gray-600 hover:text-[#7A0019] text-sm font-medium transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <img src="/logo.jpg" alt="AnnonceCampus" style={{ height: 160, width: 'auto', margin: '0 auto 2rem' }} />
          <h1 className="text-3xl font-black text-gray-800 mb-4">À propos d&apos;AnnonceCampus</h1>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <p className="text-gray-600 leading-relaxed mb-4">
            AnnonceCampus est une plateforme digitale d&apos;information dédiée à la vie étudiante au Maroc. Notre équipe éditoriale publie chaque jour des actualités, des opportunités de stages, des offres de logement et des événements campus, afin d&apos;offrir aux étudiants une source d&apos;information fiable et centralisée.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Tout le contenu publié sur AnnonceCampus est vérifié et rédigé par notre équipe. Nous nous engageons à fournir une information de qualité, pertinente et accessible à tous les étudiants marocains.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <h2 className="text-lg font-black text-gray-800 mb-2">Nous contacter</h2>
          <p className="text-gray-500 text-sm mb-4">Pour toute question ou partenariat :</p>
          <a href="mailto:contact@annoncecampus.com" className="inline-block bg-[#7A0019] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#9b1a2e] transition-colors text-sm">
            contact@annoncecampus.com
          </a>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src="/logo.jpg" alt="AnnonceCampus" style={{ height: 160, width: 'auto', margin: '0 auto 0.75rem' }} />
          <p className="text-gray-400 text-sm">L&apos;info étudiante en temps réel · © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}