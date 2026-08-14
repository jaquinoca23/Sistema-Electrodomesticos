import { useState, useMemo } from 'react'
import { Sparkles, ArrowRight, RotateCcw, Plus, Check, Snowflake, Utensils, Shirt, Wind, Tv, SprayCan, LayoutGrid } from 'lucide-react'
import products from '../data/products'

const necesidades = [
  { key: 'Todas', label: 'Todo el hogar', icon: LayoutGrid },
  { key: 'Refrigeración', label: 'Refrigeración', icon: Snowflake },
  { key: 'Cocina', label: 'Cocina', icon: Utensils },
  { key: 'Lavandería', label: 'Lavandería', icon: Shirt },
  { key: 'Climatización', label: 'Climatización', icon: Wind },
  { key: 'Electrónica', label: 'Electrónica', icon: Tv },
  { key: 'Limpieza', label: 'Limpieza', icon: SprayCan }
]

const presupuestos = [
  { key: 'bajo', label: 'Económico', descripcion: 'Hasta S/ 600', min: 0, max: 600 },
  { key: 'medio', label: 'Intermedio', descripcion: 'S/ 600 - S/ 1,500', min: 600, max: 1500 },
  { key: 'alto', label: 'Premium', descripcion: 'Más de S/ 1,500', min: 1500, max: Infinity }
]

const prioridades = [
  { key: 'precio', label: 'El precio más bajo' },
  { key: 'marca', label: 'Marca reconocida' },
  { key: 'oferta', label: 'Que esté en oferta' }
]

const marcasTop = ['LG', 'Samsung', 'Philips']

function Advisor({ onAddToCart, addedIds }) {
  const [paso, setPaso] = useState(0)
  const [necesidad, setNecesidad] = useState(null)
  const [presupuesto, setPresupuesto] = useState(null)
  const [prioridad, setPrioridad] = useState(null)

  const recomendaciones = useMemo(() => {
    if (!necesidad || !presupuesto) return []

    let resultado = products.filter((p) => {
      const coincideCategoria = necesidad === 'Todas' || p.categoria === necesidad
      const coincidePrecio = p.precio >= presupuesto.min && p.precio <= presupuesto.max
      return coincideCategoria && coincidePrecio
    })

    if (prioridad === 'oferta') {
      const enOferta = resultado.filter((p) => p.enOferta)
      resultado = enOferta.length > 0 ? enOferta : resultado
    }

    if (prioridad === 'marca') {
      resultado = [...resultado].sort((a, b) => {
        const aTop = marcasTop.includes(a.marca) ? 0 : 1
        const bTop = marcasTop.includes(b.marca) ? 0 : 1
        return aTop - bTop || a.precio - b.precio
      })
    } else if (prioridad === 'precio') {
      resultado = [...resultado].sort((a, b) => a.precio - b.precio)
    }

    return resultado.slice(0, 6)
  }, [necesidad, presupuesto, prioridad])

  const reiniciar = () => {
    setPaso(0)
    setNecesidad(null)
    setPresupuesto(null)
    setPrioridad(null)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-jaq-navy flex items-center justify-center">
          <Sparkles size={20} className="text-jaq-amber" />
        </div>
        <h1 className="font-display text-4xl font-extrabold text-jaq-navy">Asesor de Compra</h1>
      </div>
      <p className="font-body text-jaq-slate mb-10">
        Responde 3 preguntas rápidas y te recomendamos los productos ideales para ti.
      </p>

      {paso === 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-jaq-navy mb-5">
            ¿Qué necesitas equipar?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {necesidades.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setNecesidad(key)
                  setPaso(1)
                }}
                className="flex flex-col items-center gap-3 bg-white rounded-xl2 border border-jaq-mist shadow-card p-6 hover:border-jaq-amber hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-jaq-mist flex items-center justify-center">
                  <Icon size={22} className="text-jaq-steel" />
                </div>
                <span className="font-body text-sm font-semibold text-jaq-navy text-center">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {paso === 1 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-jaq-navy mb-5">
            ¿Cuál es tu presupuesto?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {presupuestos.map((p) => (
              <button
                key={p.key}
                onClick={() => {
                  setPresupuesto(p)
                  setPaso(2)
                }}
                className="bg-white rounded-xl2 border border-jaq-mist shadow-card p-6 text-left hover:border-jaq-amber hover:-translate-y-1 transition-all duration-200"
              >
                <span className="font-display text-xl font-bold text-jaq-navy block">{p.label}</span>
                <span className="font-body text-sm text-jaq-slate">{p.descripcion}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setPaso(0)}
            className="mt-6 font-body text-sm font-semibold text-jaq-slate hover:text-jaq-navy"
          >
            ← Volver
          </button>
        </div>
      )}

      {paso === 2 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-jaq-navy mb-5">
            ¿Qué es lo más importante para ti?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {prioridades.map((p) => (
              <button
                key={p.key}
                onClick={() => {
                  setPrioridad(p.key)
                  setPaso(3)
                }}
                className="bg-white rounded-xl2 border border-jaq-mist shadow-card p-6 text-left hover:border-jaq-amber hover:-translate-y-1 transition-all duration-200"
              >
                <span className="font-body text-base font-semibold text-jaq-navy">{p.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setPaso(1)}
            className="mt-6 font-body text-sm font-semibold text-jaq-slate hover:text-jaq-navy"
          >
            ← Volver
          </button>
        </div>
      )}

      {paso === 3 && (
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="font-display text-2xl font-bold text-jaq-navy">
              {recomendaciones.length > 0
                ? 'Esto te recomendamos'
                : 'No encontramos productos con esos criterios'}
            </h2>
            <button
              onClick={reiniciar}
              className="flex items-center gap-2 font-body text-sm font-semibold text-jaq-navy border border-jaq-mist rounded-full px-4 py-2 hover:bg-jaq-mist transition-colors"
            >
              <RotateCcw size={14} />
              Empezar de nuevo
            </button>
          </div>

          {recomendaciones.length === 0 ? (
            <p className="font-body text-jaq-slate">
              Intenta con otro presupuesto o categoría.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recomendaciones.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white rounded-xl2 overflow-hidden shadow-card border border-jaq-mist hover:-translate-y-1 hover:shadow-pop transition-all duration-200"
                >
                  <div className="relative h-40 overflow-hidden bg-jaq-mist">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {producto.enOferta && (
                      <span className="absolute top-3 left-3 bg-jaq-ember text-white text-[11px] font-body font-bold px-2.5 py-1 rounded-full">
                        Oferta
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-white/90 text-jaq-navy text-[11px] font-body font-bold px-2.5 py-1 rounded-full">
                      {producto.marca}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-jaq-navy leading-tight min-h-[2.5rem]">
                      {producto.nombre}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-body text-xl font-extrabold text-jaq-navy">
                        S/ {producto.precio.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onAddToCart(producto)}
                        className={`flex items-center gap-1.5 font-body text-sm font-bold px-4 py-2.5 rounded-full transition-all duration-200 ${
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
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Advisor