import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutPage from './components/AboutPage'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import ContactPage from './components/ContactPage'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuPage from './components/MenuPage'
import ProductDetailPage from './components/ProductDetailPage'

const pages = {
  partner: {
    title: 'Partner With Us',
    eyebrow: 'Grow with SVS Food',
    text: 'Explore partnership opportunities across operations, supply, and locations.',
  },
  careers: {
    title: 'Careers',
    eyebrow: 'Join the team',
    text: 'Build a career with people who care about food, speed, and service.',
  },
}

function Page({ page }) {
  return (
    <main className="flex min-h-[calc(100vh-74px)] items-center px-6 py-16">
      <section className="mx-auto max-w-[760px] text-center">
        <p className="m-0 mb-3 text-[13px] font-black uppercase text-[var(--color-primary)]">
          {page.eyebrow}
        </p>
        <h1 className="m-0 text-[clamp(40px,7vw,76px)] leading-[0.96] text-[#3f2016]">
          {page.title}
        </h1>
        <span className="mx-auto mt-[22px] block max-w-[560px] text-lg leading-[1.6] text-[#6d564d]">
          {page.text}
        </span>
      </section>
    </main>
  )
}

function App() {
  const [cartItems, setCartItems] = useState([])

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  function addToCart(item, options = {}) {
    const cartItem = {
      slug: item.slug,
      name: item.name,
      image: item.image,
      price: options.price ?? item.price,
      basePrice: item.price,
      quantity: options.quantity || 1,
      size: options.size || 'Regular',
      addOns: options.addOns || [],
    }
    const itemKey = `${cartItem.slug}-${cartItem.size}-${cartItem.addOns.join('|')}-${cartItem.price}`

    setCartItems((current) => {
      const existingItem = current.find((entry) => entry.id === itemKey)

      if (existingItem) {
        return current.map((entry) =>
          entry.id === itemKey
            ? { ...entry, quantity: entry.quantity + cartItem.quantity }
            : entry,
        )
      }

      return [...current, { ...cartItem, id: itemKey }]
    })
  }

  function updateCartQuantity(id, quantity) {
    setCartItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  function removeFromCart(id) {
    setCartItems((current) => current.filter((item) => item.id !== id))
  }

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/order" element={<MenuPage addToCart={addToCart} cartItems={cartItems} />} />
        <Route
          path="/order/:itemSlug"
          element={<ProductDetailPage addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
            />
          }
        />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/partner" element={<Page page={pages.partner} />} />
        <Route path="/careers" element={<Page page={pages.careers} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
