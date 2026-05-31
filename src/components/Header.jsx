import { useState } from 'react'
import { FiMenu, FiUser, FiX } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import './Header.css'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Order Now', to: '/order' },
  { label: 'Partner With Us', to: '/partner' },
  { label: 'Careers', to: '/careers' },
]

function Header() {
  const [serviceMode, setServiceMode] = useState('delivery')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="SVS Food" />
      </NavLink>

      <div className="service-switch" aria-label="Service mode">
        <span className={serviceMode === 'delivery' ? 'is-active' : ''}>
          Delivery
        </span>
        <button
          aria-label="Toggle service mode"
          className="switch-button"
          type="button"
          onClick={() =>
            setServiceMode((mode) =>
              mode === 'delivery' ? 'takeaway' : 'delivery',
            )
          }
        >
          <span className={serviceMode === 'takeaway' ? 'is-right' : ''} />
        </button>
        <span className={serviceMode === 'takeaway' ? 'is-active' : ''}>
          Dine-In / Takeaway
        </span>
      </div>

      <button
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'}>
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link is-current' : 'nav-link'
            }
            end={item.to === '/'}
            key={item.to}
            to={item.to}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button className="login-button" type="button">
        <FiUser aria-hidden="true" />
        <span>Login</span>
      </button>
    </header>
  )
}

export default Header
