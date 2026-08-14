const marcas = [
  'LG', 'Samsung', 'Mabe', 'Indurama', 'Coldex', 'Miray', 'Oster', 'Philips'
]

function Brands() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-extrabold text-jaq-navy">Marcas que trabajamos</h2>
        <p className="font-body text-jaq-slate mt-1">Productos originales, con garantía de fábrica.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {marcas.map((marca) => (
          <div
            key={marca}
            className="bg-white rounded-xl2 border border-jaq-mist shadow-card h-20 flex items-center justify-center grayscale hover:grayscale-0 hover:-translate-y-1 transition-all duration-200"
          >
            <span className="font-display text-lg font-bold text-jaq-navy">{marca}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Brands