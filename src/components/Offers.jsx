import { Flame, Plus, Check, Tag } from 'lucide-react'
import products from '../data/products'

function Offers({ onAddToCart, addedIds }) {
  const ofertas = products.filter((p) => p.enOferta)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-jaq-ember flex items-center justify-center">
          <Flame size={20} className="text-white" />
        </div>
        <h1 className="font-display text-4xl font-extrabold text-jaq-navy">Ofertas</h1>
      </div>
      <p className="font-body text-jaq-slate mb-8">
        Precios especiales por tiempo limitado. ¡Aprovecha antes de que se acaben!
      </p>

      {ofertas.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-body text-jaq-slate text-lg">No hay ofertas disponibles por el momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ofertas.map((producto) => {
            const descuento = Math.round(
              ((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100
            )
            return (
              <div
                key={producto.id}
                className="group bg-white rounded-xl2 overflow-hidden shadow-card border border-jaq-mist hover:-translate-y-1 hover:shadow-pop transition-all duration-200"
              >
                <div className="relative h-44 overflow-hidden bg-jaq-mist">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-jaq-ember text-white text-[11px] font-body font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Tag size={11} />
                    -{descuento}%
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-jaq-navy leading-tight min-h-[2.5rem]">
                    {producto.nombre}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-body text-sm text-jaq-slate line-through">
                      S/ {producto.precioOriginal.toFixed(2)}
                    </span>
                    <span className="font-body text-xl font-extrabold text-jaq-ember">
                      S/ {producto.precio.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => onAddToCart(producto)}
                    className={`w-full mt-4 flex items-center justify-center gap-1.5 font-body text-sm font-bold px-4 py-2.5 rounded-full transition-all duration-200 ${
                      addedIds.includes(producto.id)
                        ? 'bg-jaq-steel text-white'
                        : 'bg-jaq-amber hover:bg-jaq-amberDark text-jaq-navy'
                    }`}
                  >
                    {addedIds.includes(producto.id) ? <Check size={16} /> : <Plus size={16} />}
                    {addedIds.includes(producto.id) ? 'Agregado' : 'Agregar'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Offers