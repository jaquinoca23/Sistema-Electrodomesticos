import Brands from './Brands'
import { Truck, ShieldCheck, BadgePercent, Wrench, MapPin, Clock, Phone } from 'lucide-react'

function Home({ onGoToCatalog }) {
  const beneficios = [
    { icon: Truck, titulo: 'Envío a domicilio', descripcion: 'Entregamos en Huarmey y alrededores en 24-48 horas.' },
    { icon: ShieldCheck, titulo: 'Garantía oficial', descripcion: 'Todos los productos incluyen garantía de fábrica.' },
    { icon: BadgePercent, titulo: 'Precios de fábrica', descripcion: 'Compra directa a proveedores, sin intermediarios.' },
    { icon: Wrench, titulo: 'Servicio técnico', descripcion: 'Instalación y soporte postventa especializado.' }
  ]

  const horarios = [
    { dia: 'Lunes a Viernes', hora: '9:00 am - 8:00 pm' },
    { dia: 'Sábados', hora: '9:00 am - 6:00 pm' },
    { dia: 'Domingos', hora: '10:00 am - 2:00 pm' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-jaq-navy via-jaq-steel to-jaq-slate mt-8 px-6 py-14 sm:px-14 sm:py-16 shadow-pop">
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-jaq-amber/20 rounded-full blur-3xl" />
        <div className="absolute -left-16 bottom-0 w-72 h-72 bg-jaq-ember/10 rounded-full blur-3xl" />
        <div className="relative grid grid-{activeTab === 'inicio' ? (
        <Home onGoToCatalog={() => setActiveTab('catalogo')} />
      ) : activeTab === 'catalogo' ? (
        <Catalog onAddToCart={addToCart} addedIds={addedIds} />
      ) : activeTab === 'ofertas' ? (
        <Offers onAddToCart={addToCart} addedIds={addedIds} />
      ) : (
        <Advisor onAddToCart={addToCart} addedIds={addedIds} />
      )}cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-jaq-amber text-jaq-navy font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              Electrodomésticos de confianza
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white leading-[0.95] text-balance">
              Equipa tu hogar con JAQUINO STORE
            </h1>
            <p className="font-body text-jaq-mist/90 text-lg mt-5 max-w-lg">
              Refrigeración, cocina, lavandería y climatización al mejor precio de Huarmey. Calidad garantizada, entrega rápida.
            </p>
            <button
              onClick={onGoToCatalog}
              className="mt-8 bg-jaq-amber hover:bg-jaq-amberDark text-jaq-navy font-body font-bold px-7 py-3.5 rounded-full transition-colors duration-200 shadow-pop"
            >
              Ver catálogo completo
            </button>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-jaq-amber/10 rounded-full blur-3xl scale-90" />
            <img
              src="/Imagenes/local.png"
              alt="Local JAQUINO STORE"
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl rounded-xl2 shadow-2xl object-cover animate-[float_4s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
        {beneficios.map(({ icon: Icon, titulo, descripcion }) => (
          <div
            key={titulo}
            className="bg-white rounded-xl2 p-6 shadow-card border border-jaq-mist hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="w-11 h-11 rounded-lg bg-jaq-mist flex items-center justify-center mb-4">
              <Icon size={22} className="text-jaq-steel" />
            </div>
            <h3 className="font-display text-xl font-bold text-jaq-navy">{titulo}</h3>
            <p className="font-body text-sm text-jaq-slate mt-1.5 leading-relaxed">{descripcion}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-14">
        <div className="bg-white rounded-xl2 p-8 shadow-card border border-jaq-mist">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-jaq-navy flex items-center justify-center">
              <MapPin size={18} className="text-jaq-amber" />
            </div>
            <h2 className="font-display text-2xl font-bold text-jaq-navy">Ubicación</h2>
          </div>
          <p className="font-body text-jaq-slate leading-relaxed">
            Av. Cabo Alberto Reyes 261, Huarmey, Áncash, Perú.
          </p>
          <p className="font-body text-jaq-slate leading-relaxed mt-2">
            Referencia: a dos cuadras de la Plaza de Armas, frente al Banco de la Nación.
          </p>
          <div className="flex items-center gap-2 mt-5 text-jaq-navy font-body font-semibold">
            <Phone size={16} className="text-jaq-amberDark" />
            <span>+51 923 856 570</span>
          </div>
        </div>

        <div className="bg-white rounded-xl2 p-8 shadow-card border border-jaq-mist">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-jaq-navy flex items-center justify-center">
              <Clock size={18} className="text-jaq-amber" />
            </div>
            <h2 className="font-display text-2xl font-bold text-jaq-navy">Horario de atención</h2>
          </div>
          <ul className="divide-y divide-jaq-mist">
            {horarios.map(({ dia, hora }) => (
              <li key={dia} className="flex items-center justify-between py-3 font-body">
                <span className="text-jaq-slate">{dia}</span>
                <span className="text-jaq-navy font-semibold">{hora}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Brands />
    </div>
  )
}

export default Home