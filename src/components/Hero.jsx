import {
  FiArrowRight,
  FiChevronDown,
  FiClock,
  FiMapPin,
  FiNavigation,
  FiSearch,
} from 'react-icons/fi'
import { useState } from 'react'
import heroImage from '../assets/food-hero.png'
import vegBeverageDessert from '../assets/hero-carousel/veg-beverage-dessert.png'
import vegFriesBurger from '../assets/hero-carousel/veg-fries-burger.png'
import vegNaanRoll from '../assets/hero-carousel/veg-naan-roll.png'
import vegPartyCombo from '../assets/hero-carousel/veg-party-combo.png'
import logo from '../assets/logo.png'
import OurMenu from './OurMenu'

const stores = [
  {
    address: 'Narmada Road, Jabalpur',
  },
  {
    address: 'Civic Centre, Jabalpur',
  },
  {
    address: 'Rewa Road, Satna',
    distance: '183 KMs away',
  },
]

const controlButton =
  'inline-flex min-h-8 items-center gap-2 rounded-md border border-[#e9e2df] bg-white px-3 text-xs font-extrabold text-[#363a40] shadow-sm'
const selectButton = `${controlButton} min-w-[190px] justify-between max-[820px]:min-w-[min(100%,260px)]`

const heroSlides = [
  {
    image: heroImage,
    label: 'Pure veg burgers with fries',
  },
  {
    image: vegFriesBurger,
    label: 'Pure veg fries, dip, and burger',
  },
  {
    image: vegNaanRoll,
    label: 'Pure veg grilled naan roll',
  },
  {
    image: vegBeverageDessert,
    label: 'Pure veg beverages and desserts',
  },
  {
    image: vegPartyCombo,
    label: 'Pure veg party combo',
  },
]

function StoreCard({ store }) {
  return (
    <article
      className={`relative flex min-h-[86px] items-center justify-between gap-4 rounded-lg bg-white px-4 py-3 shadow-sm max-[720px]:flex-col max-[720px]:items-stretch ${
        store.distance ? 'pt-10' : ''
      }`}
    >
      {store.distance ? (
        <div className="absolute -top-px -left-px inline-flex items-center gap-1.5 rounded-br-2xl border border-dashed border-[#94ba55] bg-[#e9f7cc] px-3 py-1.5 text-xs text-[#0d1a12]">
          <FiNavigation aria-hidden="true" />
          <span>{store.distance}</span>
        </div>
      ) : null}

      <div className="flex min-w-0 items-start gap-3">
        <div className="shrink-0">
          <img
            className="h-9 w-9 rounded object-contain"
            src={logo}
            alt=""
          />
        </div>
        <div className="min-w-0">
          <h3 className="m-0 text-lg font-black leading-tight text-[#20242b]">
            SVS Food
          </h3>
          <div className="mt-1 grid gap-0.5">
            <p className="m-0 flex items-center gap-1.5 text-[11px] font-semibold text-[#4b4f57]">
              <FiMapPin className="shrink-0" aria-hidden="true" />
              <span className="truncate">{store.address}</span>
            </p>
            <p className="m-0 flex items-center gap-1.5 text-[11px] font-semibold text-[#4b4f57]">
              <FiClock className="shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-[#30343a]">Open from</strong> 11:00 AM
                to 11:00 PM
              </span>
            </p>
          </div>
        </div>
      </div>

      <button
        className="min-h-9 shrink-0 cursor-pointer rounded-md border border-[var(--color-primary-border)] bg-white px-5 text-xs font-extrabold text-[var(--color-primary)]"
        type="button"
      >
        Order Online
      </button>
    </article>
  )
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <main className="min-h-[calc(100vh-74px)] bg-[#f1f0f4] pb-12">
      <section
        className="relative min-h-[350px] overflow-hidden rounded-b-[36px] bg-[#120905] before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(90deg,rgb(0_0_0_/_88%)_0%,rgb(0_0_0_/_62%)_33%,rgb(0_0_0_/_8%)_70%)] max-[540px]:min-h-[430px] max-[540px]:rounded-b-[24px]"
      >
        <div className="absolute inset-0" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <img
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
              key={slide.label}
              src={slide.image}
              alt=""
            />
          ))}
        </div>

        <div className="relative z-[2] max-w-[470px] px-0 pt-10 pb-[76px] pl-[56px] text-white max-[820px]:px-6 max-[820px]:pt-9 max-[820px]:pb-[88px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#a5cf3073] px-4 py-1.5 text-xs font-black uppercase text-[#b8dc38] before:h-2 before:w-2 before:rounded-full before:bg-[#b8dc38] before:content-['']">
            100% Pure Vegetarian
          </span>
          <h1 className="mt-5 mb-4 text-[clamp(42px,4.6vw,58px)] leading-[0.98] font-black max-[540px]:text-[40px]">
            Great Taste,
            <br />
            <span className="whitespace-nowrap text-[var(--color-primary)]">
              Good Times!
            </span>
          </h1>
          <p className="mb-6 max-w-[320px] text-sm leading-[1.55] text-white/85">
            Freshly prepared pure veg food made with love and zero
            preservatives.
          </p>
          <a
            className="inline-flex min-w-[150px] items-center justify-center gap-5 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-extrabold text-white no-underline"
            href="/order"
          >
            Order Now
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>
        <div
          className="absolute bottom-9 left-1/2 z-[4] flex -translate-x-1/2 gap-[7px]"
          aria-label="Hero carousel"
        >
          {heroSlides.map((slide, index) => (
            <button
              aria-label={`Show ${slide.label}`}
              className={`h-[7px] cursor-pointer rounded-full border-0 p-0 transition-all ${
                index === activeSlide ? 'w-6 bg-white' : 'w-[7px] bg-white/60'
              }`}
              key={slide.label}
              onClick={() => setActiveSlide(index)}
              type="button"
            />
          ))}
        </div>
      </section>

      <section className="relative z-[3] mx-auto mt-[-44px] w-[calc(100%-112px)] max-w-[1250px] overflow-hidden rounded-t-[20px] bg-white shadow-[0_16px_38px_rgb(53_43_36_/_12%)] max-[820px]:w-[calc(100%-32px)]">
        <div className="flex items-center justify-between gap-8 px-8 pt-6 pb-5 max-[1100px]:items-start max-[820px]:flex-col max-[820px]:items-stretch max-[540px]:p-5">
          <div className="flex items-start gap-5 max-[820px]:flex-col max-[820px]:items-stretch">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[28px] text-[var(--color-primary)]">
              <FiMapPin aria-hidden="true" />
            </span>
            <div>
              <h2 className="m-0 mb-4 text-2xl font-black text-[#20242b]">
                Find SVS Food stores near you
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className={`${controlButton} border-[var(--color-primary-border)] text-[var(--color-primary)]`}
                  type="button"
                >
                  <FiNavigation aria-hidden="true" />
                  Use my current location
                </button>
                <span className="text-xs font-black uppercase text-[#544740]">
                  or
                </span>
                <button className={selectButton} type="button">
                  Select City
                  <FiChevronDown aria-hidden="true" />
                </button>
                <button className={selectButton} type="button">
                  Select Locality
                  <FiChevronDown aria-hidden="true" />
                </button>
              </div>
              <p className="mt-3 mb-0 flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#3b3e45]">
                <FiMapPin className="text-[var(--color-primary)]" aria-hidden="true" />
                Satna, Madhya Pradesh
                <button
                  className="cursor-pointer border-0 bg-transparent p-0 pl-1.5 font-black text-[var(--color-primary)]"
                  type="button"
                >
                  Change Location
                </button>
              </p>
            </div>
          </div>

          <div
            className="grid min-w-[180px] place-items-center self-stretch max-[820px]:hidden"
            aria-hidden="true"
          >
            <div className="mb-[-3px] h-8 w-28 rounded-t-[10px] rounded-b bg-[linear-gradient(90deg,var(--color-primary)_0_18%,#fff3e7_18%_34%,var(--color-primary)_34%_52%,#fff3e7_52%_68%,var(--color-primary)_68%_100%)]" />
            <div className="flex h-[76px] w-[92px] items-center justify-center rounded border-8 border-[var(--color-primary-border)] bg-[#fff3e7] text-[11px] font-black uppercase text-[var(--color-primary)]">
              <span>SVS Food</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#eee5e0] bg-[#f4f1ef] px-6 pt-4 pb-3 max-[540px]:p-4">
          <div className="flex items-center justify-between gap-4 max-[820px]:flex-col max-[820px]:items-stretch">
            <div className="flex flex-wrap gap-3">
              <button className={controlButton} type="button">
                Order Type
                <FiChevronDown aria-hidden="true" />
              </button>
              <button className={controlButton} type="button">
                Veg Only
              </button>
              <button className={controlButton} type="button">
                Open Now
              </button>
              <button className={controlButton} type="button">
                Newly Opened
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-black text-[#343840]">
                Sort By:
              </span>
              <button
                className={`${controlButton} min-w-[138px] justify-between`}
                type="button"
              >
                Nearest
                <FiChevronDown aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="mt-3 mb-3 flex items-center gap-2 text-sm text-[#52565d]">
            <FiSearch aria-hidden="true" />
            <strong>{stores.length} Results</strong> found
          </p>

          <div className="grid grid-cols-3 gap-6 max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
            {stores.map((store) => (
              <StoreCard key={store.address} store={store} />
            ))}
          </div>
        </div>
      </section>
      <OurMenu />
    </main>
  )
}

export default Hero
