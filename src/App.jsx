import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import './App.css'

const pages = {
  home: {
    title: 'SVS Food',
    eyebrow: 'Fresh food, fast service',
    text: 'Choose delivery or dine-in and order your favorites from SVS Food.',
  },
  about: {
    title: 'About Us',
    eyebrow: 'Made for everyday cravings',
    text: 'A warm, reliable food experience built around quick service and familiar taste.',
  },
  order: {
    title: 'Order Now',
    eyebrow: 'Your meal starts here',
    text: 'Browse the menu, pick your service mode, and place your order.',
  },
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
    <main className="page-shell">
      <section className="route-panel">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span>{page.text}</span>
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<Page page={pages.about} />} />
        <Route path="/order" element={<Page page={pages.order} />} />
        <Route path="/partner" element={<Page page={pages.partner} />} />
        <Route path="/careers" element={<Page page={pages.careers} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
