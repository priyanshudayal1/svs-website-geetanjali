import { useState } from 'react'
import { FiMenu, FiUser, FiX } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Order Now', to: '/order' },
  { label: 'Contact Us', to: '/contact-us' },
  { label: 'Partner With Us', to: '/partner' },
  { label: 'Careers', to: '/careers' },
]

const navLinkBase =
  'relative whitespace-nowrap text-xs font-black uppercase text-[#5a2b1b] no-underline transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-50 after:rounded-full after:bg-[var(--color-primary)] after:opacity-0 after:transition hover:text-[var(--color-primary)] hover:after:scale-x-100 hover:after:opacity-100 max-[860px]:py-3 max-[860px]:after:bottom-1.5 max-[860px]:after:w-11'
const navLinkActive =
  'text-[var(--color-primary)] after:scale-x-100 after:opacity-100'

function Header() {
  const [serviceMode, setServiceMode] = useState('delivery')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 grid min-h-[74px] grid-cols-[auto_auto_1fr_auto] items-center gap-7 bg-white px-[52px] shadow-[0_1px_10px_rgb(0_0_0_/_10%)] max-[1100px]:grid-cols-[auto_1fr_auto_auto] max-[1100px]:gap-5 max-[1100px]:px-6 max-[860px]:min-h-[70px] max-[860px]:grid-cols-[auto_1fr_auto] max-[520px]:gap-3 max-[520px]:px-4">
      <NavLink className="block no-underline" to="/" onClick={() => setMenuOpen(false)}>
        <img
          className="block h-12 w-auto object-contain max-[520px]:h-[42px]"
          src={logo}
          alt="SVS Food"
        />
      </NavLink>

      <div
        className="flex items-center gap-3 whitespace-nowrap text-xs font-black uppercase text-[#5a2b1b] max-[860px]:hidden"
        aria-label="Service mode"
      >
        <span
          className={
            serviceMode === 'delivery'
              ? 'text-[var(--color-primary)] opacity-100'
              : 'opacity-70'
          }
        >
          Delivery
        </span>
        <button
          aria-label="Toggle service mode"
          className="relative h-[22px] w-[42px] cursor-pointer rounded-full border-0 bg-[var(--color-primary)] p-[3px]"
          type="button"
          onClick={() =>
            setServiceMode((mode) =>
              mode === 'delivery' ? 'takeaway' : 'delivery',
            )
          }
        >
          <span
            className={`block h-4 w-4 rounded-full bg-white transition-transform ${
              serviceMode === 'takeaway' ? 'translate-x-5' : ''
            }`}
          />
        </button>
        <span
          className={
            serviceMode === 'takeaway'
              ? 'text-[var(--color-primary)] opacity-100'
              : 'opacity-70'
          }
        >
          Dine-In / Takeaway
        </span>
      </div>

      <button
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        className="hidden cursor-pointer items-center justify-self-end border-0 bg-transparent text-[26px] font-black uppercase text-[var(--color-primary)] max-[860px]:inline-flex"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <nav
        className={`items-center justify-end gap-[38px] max-[1100px]:gap-5 max-[860px]:col-span-full max-[860px]:mx-[-24px] max-[860px]:hidden max-[860px]:flex-col max-[860px]:items-stretch max-[860px]:gap-0 max-[860px]:border-t max-[860px]:border-[#f1ddd3] max-[860px]:bg-white max-[860px]:px-6 max-[860px]:pt-2 max-[860px]:pb-[18px] max-[860px]:shadow-[0_12px_24px_rgb(0_0_0_/_10%)] max-[520px]:mx-[-16px] max-[520px]:px-4 ${
          menuOpen ? 'flex' : 'flex max-[860px]:hidden'
        } ${menuOpen ? 'max-[860px]:flex' : ''}`}
      >
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ''}`
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

      <button
        className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap border-0 bg-transparent text-xs font-black uppercase text-[var(--color-primary)] max-[860px]:justify-self-end"
        type="button"
      >
        <FiUser className="h-[22px] w-[22px]" aria-hidden="true" />
        <span className="max-[520px]:hidden">Login</span>
      </button>
    </header>
  )
}

export default Header
