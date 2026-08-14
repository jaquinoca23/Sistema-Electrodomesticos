import { ShoppingCart, Home as HomeIcon, LayoutGrid, Flame, Sparkles } from 'lucide-react'
function Navbar({ activeTab, setActiveTab, cartCount, onOpenCart }) {
  const tabs = [
    { key: 'inicio', label: 'Inicio', icon: HomeIcon },
    { key: 'catalogo', label: 'Catálogo', icon: LayoutGrid },
    { key: 'ofertas', label: 'Ofertas', icon: Flame },
    { key: 'asesor', label: 'Asesor IA', icon: Sparkles }
  ]

  return (
    <header className="sticky top-0 z-40 bg-jaq-navy/95 backdrop-blur border-b border-jaq-slate/30 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img
              src="/Imagenes/logo.png"
              alt="Logo JAQUINO STORE"
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-2xl font-bold tracking-wide text-white">
              JAQUINO <span className="text-jaq-amber">STORE</span>
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-1 bg-white/5 rounded-full p-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-body text-sm font-semibold transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-jaq-amber text-jaq-navy shadow-pop'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-jaq-amber hover:bg-jaq-amberDark text-jaq-navy font-body font-bold px-4 py-2 rounded-full transition-colors duration-200 shadow-pop"
            >
              <ShoppingCart size={18} strokeWidth={2.5} />
              <span className="hidden sm:inline text-sm">Carrito</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-jaq-ember text-white text-[11px] font-bold flex items-center justify-center border-2 border-jaq-navy">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="flex sm:hidden items-center gap-1 bg-white/5 rounded-full p-1 mb-3">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-body text-sm font-semibold transition-all duration-200 ${
                activeTab === key
                  ? 'bg-jaq-amber text-jaq-navy shadow-pop'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar