import Link from 'next/link'

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <img src="/logo.jpg" alt="AnnonceCampus" className="h-30 w-auto" />
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <img src="/logo.jpg" alt="AnnonceCampus" className="h-40 w-auto mx-auto mb-6" />
          <h1 className="text-4xl font-black text-gray-800 mb-4">À propos d'AnnonceCampus</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            La plateforme de référence pour l'information étudiante au Maroc.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-[#7A0019] rounded-full" />
            <h2 className="text-xl font-black text-gray-800">Notre mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            AnnonceCampus est une plateforme digitale d'information campus qui centralise les nouvelles les plus importantes pour les étudiants. Contrairement aux plateformes traditionnelles, tout le contenu est rédigé et vérifié par notre équipe éditoriale, garantissant une information fiable, pertinente et bien présentée.
          </p>
        </div>

        {/* What we cover */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#7A0019] rounded-full" />
            <h2 className="text-xl font-black text-gray-800">Ce que nous couvrons</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '', title: 'Actualités campus', desc: 'Les dernières nouvelles de vos universités' },
              { icon: '', title: 'Événements étudiants', desc: 'Concerts, conférences, activités et plus' },
              { icon: '', title: 'Opportunités', desc: 'Stages, concours, bourses et offres d\'emploi' },
              { icon: '', title: 'Annonces importantes', desc: 'Informations académiques et administratives' },
              { icon: '', title: 'Vie étudiante', desc: 'Histoires et expériences de la vie campus' },
              { icon: '', title: 'Multi-campus', desc: 'Plusieurs universités et villes bientôt' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="bg-[#7A0019] rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-white rounded-full" />
            <h2 className="text-xl font-black">Notre vision</h2>
          </div>
          <p className="text-red-100 leading-relaxed">
            L'objectif d'AnnonceCampus est de devenir le média de référence de la vie étudiante, où les étudiants peuvent rapidement découvrir ce qui se passe dans leurs universités et campus. À terme, la plateforme ambitionne de couvrir de nombreux campus et villes, devenant ainsi une source centrale d'informations et d'actualités étudiantes.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <h2 className="text-xl font-black text-gray-800 mb-2">Nous contacter</h2>
          <p className="text-gray-500 text-sm mb-4">Une question, un partenariat, une suggestion ?</p>
          <a href="mailto:contact@annoncecampus.com" className="inline-block bg-[#7A0019] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#9b1a2e] transition-colors text-sm">
            contact@annoncecampus.com
          </a>
        </div>
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