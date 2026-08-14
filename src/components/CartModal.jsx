import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react'

const WHATSAPP_NUMBER = '51923856570'

function CartModal({ isOpen, onClose, cart, onIncrease, onDecrease, onRemove }) {
  if (!isOpen) return null

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const generarMensaje = () => {
    const lineas = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.nombre} x${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}`
      )
      .join('\n')
    const mensaje = `Hola JAQUINO STORE, quiero hacer el siguiente pedido:\n\n${lineas}\n\nTotal: S/ ${total.toFixed(2)}\n\nQuedo atento(a), gracias.`
    return encodeURIComponent(mensaje)
  }

  const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${generarMensaje()}`

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-jaq-ink/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-xl2 rounded-t-xl2 shadow-pop max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-jaq-mist">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-jaq-navy" />
            <h2 className="font-display text-2xl font-bold text-jaq-navy">Tu carrito</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-jaq-mist transition-colors"
          >
            <X size={20} className="text-jaq-slate" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={40} className="mx-auto text-jaq-mist" />
              <p className="font-body text-jaq-slate mt-3">Tu carrito está vacío.</p>
            </div>
          ) : (
            <ul className="divide-y divide-jaq-mist">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-16 h-16 rounded-lg object-cover bg-jaq-mist flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-jaq-navy truncate">{item.nombre}</p>
                    <p className="font-body text-sm text-jaq-slate">S/ {item.precio.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onDecrease(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-jaq-mist hover:bg-jaq-slate/20 transition-colors"
                      >
                        <Minus size={14} className="text-jaq-navy" />
                      </button>
                      <span className="font-body font-bold text-jaq-navy w-6 text-center">{item.cantidad}</span>
                      <button
                        onClick={() => onIncrease(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-jaq-mist hover:bg-jaq-slate/20 transition-colors"
                      >
                        <Plus size={14} className="text-jaq-navy" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-body font-bold text-jaq-navy">
                      S/ {(item.precio * item.cantidad).toFixed(2)}
                    </span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-jaq-ember hover:text-jaq-ember/70 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-jaq-mist bg-jaq-mist/40">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-jaq-slate font-semibold">Total a pagar</span>
              <span className="font-display text-3xl font-extrabold text-jaq-navy">S/ {total.toFixed(2)}</span>
            </div>
            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-body font-bold py-3.5 rounded-full transition-colors duration-200 shadow-pop"
            >
              <MessageCircle size={20} />
              Finalizar pedido por WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartModal
