import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Catalog from './components/Catalog'
import CartModal from './components/CartModal'
import Offers from './components/Offers'
import Brands from "./components/Brands";
import Advisor from './components/Advisor'

function App() {
  const [activeTab, setActiveTab] = useState('inicio')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (producto) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const increaseQuantity = (id) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item)))
  }

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0)
  const addedIds = cart.map((item) => item.id)

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {activeTab === 'inicio' ? (
        <Home onGoToCatalog={() => setActiveTab('catalogo')} />
      ) : activeTab === 'catalogo' ? (
        <Catalog onAddToCart={addToCart} addedIds={addedIds} />
      ) : activeTab === 'ofertas' ? (
        <Offers onAddToCart={addToCart} addedIds={addedIds} />
      ) : (
        <Advisor onAddToCart={addToCart} addedIds={addedIds} />
      )}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
      />

      <footer className="border-t border-jaq-mist bg-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-sm text-jaq-slate">
            © {new Date().getFullYear()} JAQUINO STORE — Electrodomésticos para tu hogar en Huarmey.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
