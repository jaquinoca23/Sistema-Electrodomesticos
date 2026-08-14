import { useMemo, useState } from 'react'
import { Search, Plus, Check, SlidersHorizontal, X } from 'lucide-react'
import products from '../data/products'

function Catalog({ onAddToCart, addedIds }) {
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([])
  const [precioMin, setPrecioMin] = useState('')
  const [precioMax, setPrecioMax] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const categorias = useMemo(() => {
    const unicas = Array.from(new Set(products.map((p) => p.categoria)))
    return ['Todas', ...unicas]
  }, [])

  const marcas = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.marca))).sort()
  }, [])

  const toggleMarca = (marca) => {
    setMarcasSeleccionadas((prev) =>
      prev.includes(marca) ? prev.filter((m) => m !== marca) : [...prev, marca]
    )
  }

  const limpiarFiltros = () => {
    setMarcasSeleccionadas([])
    setPrecioMin('')
    setPrecioMax('')
    setCategoria('Todas')
  }

  const filtrados = useMemo(() => {
    return products.filter((p) => {
      const coincideNombre = p.nombre.toLowerCase().includes(query.toLowerCase())
      const coincideCategoria = categoria === 'Todas' || p.categoria === categoria
      const coincideMarca = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(p.marca)
      const coincideMin = precioMin === '' || p.precio >= Number(precioMin)
      const coincideMax = precioMax === '' || p.precio <= Number(precioMax)
      return coincideNombre && coincideCategoria && coincideMarca && coincideMin && coincideMax
    })
  }, [query, categoria, marcasSeleccionadas, precioMin, precioMax])

  const filtrosActivos =
    marcasSeleccionadas.length > 0 || precioMin !== '' || precioMax !== '' || categoria !== 'Todas'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-extrabold text-jaq-navy">Catálogo</h1>
          <p className="font-body text-jaq-slate mt-1">
            Explora nuestros {filtrados.length} de {products.length} productos disponibles.
          </p>
        </div>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="lg:hidden flex items-center gap-2 bg-jaq-navy text-white font-body text-sm font-semibold px-4 py-2.5 rounded-full"
        >
          <SlidersHorizontal size={16} />
          Filtros
        </button>
      </div>

      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-jaq-slate" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar electrodoméstico..."
          className="w-full font-body pl-11 pr-4 py-3 rounded-full border border-jaq-mist bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-jaq-amber transition-shadow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
        <div>
          <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                className={`whitespace-nowrap font-body text-sm font-semibold px-4 py-2.5 rounded-full border transition-colors duration-200 ${
                  categoria === cat
                    ? 'bg-jaq-navy text-white border-jaq-navy'
                    : 'bg-white text-jaq-slate border-jaq-mist hover:border-jaq-steel'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtrados.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-jaq-slate text-lg">No encontramos productos con ese criterio.</p>
              {filtrosActivos && (
                <button
                  onClick={limpiarFiltros}
                  className="mt-4 font-body text-sm font-semibold text-jaq-amberDark underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtrados.map((producto) => (
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
                    <span className="absolute top-3 left-3 bg-jaq-navy/90 text-white text-[11px] font-body font-semibold px-2.5 py-1 rounded-full">
                      {producto.categoria}
                    </span>
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

        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block bg-white rounded-xl2 border border-jaq-mist shadow-card p-6 lg:sticky lg:top-24`}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-jaq-navy" />
              <h2 className="font-display text-xl font-bold text-jaq-navy">Filtros</h2>
            </div>
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-jaq-mist"
            >
              <X size={18} className="text-jaq-slate" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-body font-semibold text-jaq-navy text-sm mb-3">Rango de precio (S/)</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
                placeholder="Mín"
                className="w-full font-body text-sm px-3 py-2 rounded-lg border border-jaq-mist focus:outline-none focus:ring-2 focus:ring-jaq-amber"
              />
              <span className="text-jaq-slate">–</span>
              <input
                type="number"
                min="0"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
                placeholder="Máx"
                className="w-full font-body text-sm px-3 py-2 rounded-lg border border-jaq-mist focus:outline-none focus:ring-2 focus:ring-jaq-amber"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-body font-semibold text-jaq-navy text-sm mb-3">Marca</h3>
            <div className="flex flex-col gap-2.5">
              {marcas.map((marca) => (
                <label key={marca} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={marcasSeleccionadas.includes(marca)}
                    onChange={() => toggleMarca(marca)}
                    className="w-4 h-4 rounded accent-jaq-amber cursor-pointer"
                  />
                  <span className="font-body text-sm text-jaq-slate group-hover:text-jaq-navy transition-colors">
                    {marca}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {filtrosActivos && (
            <button
              onClick={limpiarFiltros}
              className="w-full font-body text-sm font-semibold text-jaq-ember border border-jaq-ember/30 rounded-full py-2.5 hover:bg-jaq-ember/5 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </aside>
      </div>
    </div>
  )
}

export default Catalog