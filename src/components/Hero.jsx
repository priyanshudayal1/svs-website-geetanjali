import {
  FiArrowRight,
  FiChevronDown,
  FiClock,
  FiMapPin,
  FiNavigation,
  FiSearch,
} from 'react-icons/fi'
import heroImage from '../assets/food-hero.png'
import logo from '../assets/logo.png'

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
  'inline-flex min-h-[39px] items-center gap-2 rounded-md border border-[#e9e2df] bg-white px-[15px] text-sm font-extrabold text-[#363a40]'
const selectButton = `${controlButton} min-w-[210px] justify-between max-[820px]:min-w-[min(100%,260px)]`

function StoreCard({ store }) {
  return (
    <article
      className={`relative min-h-[188px] rounded-[14px] border border-[#e3dfdd] bg-white p-[22px] max-[540px]:p-[18px] ${
        store.distance ? 'pt-[50px]' : ''
      }`}
    >
      {store.distance ? (
        <div className="absolute -top-px -left-px inline-flex items-center gap-1.5 rounded-br-[18px] border border-dashed border-[#94ba55] bg-[#e9f7cc] px-[15px] py-2 text-[13px] text-[#0d1a12]">
          <FiNavigation aria-hidden="true" />
          <span>{store.distance}</span>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4 max-[540px]:items-start">
        <div className="flex items-center gap-2.5">
          <img
            className="h-[42px] w-[42px] rounded-md object-contain"
            src={logo}
            alt=""
          />
          <h3 className="m-0 text-2xl text-[#20242b] max-[540px]:text-[22px]">
            SVS Food
          </h3>
        </div>
        <a
          className="inline-flex items-center gap-2 whitespace-nowrap text-[15px] text-[#f45a22] underline underline-offset-8"
          href="/order"
        >
          View Store
          <FiArrowRight aria-hidden="true" />
        </a>
      </div>

      <div className="my-[18px] grid gap-2.5">
        <p className="m-0 flex items-center gap-2 text-[15px] text-[#111927]">
          <FiMapPin className="shrink-0 text-[#4b4f57]" aria-hidden="true" />
          <span>{store.address}</span>
        </p>
        <p className="m-0 flex items-center gap-2 text-[15px] text-[#111927]">
          <FiClock className="shrink-0 text-[#4b4f57]" aria-hidden="true" />
          <span>
            <strong>Open from</strong> 11:00 AM to 11:00 PM
          </span>
        </p>
      </div>

      <button
        className="min-h-12 w-full cursor-pointer rounded-lg border-0 bg-[#f76331] text-[17px] font-bold text-white"
        type="button"
      >
        Order Online
      </button>
    </article>
  )
}

function Hero() {
  return (
    <main className="min-h-[calc(100vh-74px)] bg-[#f1f0f4] pb-14">
      <section
        className="relative min-h-[390px] overflow-hidden bg-[#120905] bg-cover bg-center before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgb(0_0_0_/_82%)_0%,rgb(0_0_0_/_56%)_36%,rgb(0_0_0_/_8%)_68%)] after:absolute after:bottom-[-54px] after:left-[-4%] after:h-24 after:w-[108%] after:rounded-t-[50%] after:bg-[#f1f0f4] max-[540px]:min-h-[430px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="relative z-[1] max-w-[520px] px-0 pt-[54px] pb-[86px] pl-[72px] text-white max-[820px]:px-6 max-[820px]:pt-[42px] max-[820px]:pb-[88px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#a5cf3073] px-[18px] py-2 text-[13px] font-black uppercase text-[#b8dc38] before:h-[9px] before:w-[9px] before:rounded-full before:bg-[#b8dc38] before:content-['']">
            100% Pure Vegetarian
          </span>
          <h1 className="my-[22px] mb-[18px] text-[clamp(46px,6vw,74px)] leading-[0.98] max-[540px]:text-[43px]">
            Great Taste,
            <br />
            <span className="text-[#ff5a1f]">Good Times!</span>
          </h1>
          <p className="mb-7 max-w-[420px] text-[17px] leading-[1.55] text-white/80">
            Freshly prepared pure veg food made with love and zero
            preservatives.
          </p>
          <a
            className="inline-flex min-w-[174px] items-center gap-5 rounded-full bg-[#f45a22] px-[26px] py-[15px] text-base font-extrabold text-white no-underline"
            href="/order"
          >
            Order Now
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>
        <div
          className="absolute bottom-[58px] left-1/2 z-[2] flex -translate-x-1/2 gap-[7px]"
          aria-hidden="true"
        >
          <span className="h-[7px] w-6 rounded-full bg-white" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/60" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/60" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/60" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/60" />
        </div>
      </section>

      <section className="relative z-[3] mx-auto mt-[-50px] w-[calc(100%-96px)] max-w-[1290px] overflow-hidden rounded-t-[22px] bg-white shadow-[0_16px_38px_rgb(53_43_36_/_12%)] max-[820px]:w-[calc(100%-32px)]">
        <div className="flex items-center justify-between gap-8 px-[34px] pt-7 pb-6 max-[1100px]:items-start max-[820px]:flex-col max-[820px]:items-stretch max-[540px]:p-6 max-[540px]:px-[18px]">
          <div className="flex items-start gap-[22px] max-[820px]:flex-col max-[820px]:items-stretch">
            <span className="inline-flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[#fff0e9] text-[28px] text-[#f45a22]">
              <FiMapPin aria-hidden="true" />
            </span>
            <div>
              <h2 className="m-0 mb-[18px] text-[26px] text-[#20242b]">
                Find SVS Food stores near you
              </h2>
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  className={`${controlButton} border-[#ffb498] text-[#f45a22]`}
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
              <p className="mt-4 mb-0 flex flex-wrap items-center gap-2 text-[13px] font-extrabold text-[#3b3e45]">
                <FiMapPin className="text-[#f45a22]" aria-hidden="true" />
                Satna, Madhya Pradesh
                <button
                  className="cursor-pointer border-0 bg-transparent p-0 pl-1.5 font-black text-[#f45a22]"
                  type="button"
                >
                  Change Location
                </button>
              </p>
            </div>
          </div>

          <div
            className="grid min-w-[190px] place-items-center self-stretch max-[820px]:hidden"
            aria-hidden="true"
          >
            <div className="mb-[-3px] h-8 w-28 rounded-t-[10px] rounded-b bg-[linear-gradient(90deg,#ff7a38_0_18%,#fff3e7_18%_34%,#ff7a38_34%_52%,#fff3e7_52%_68%,#ff7a38_68%_100%)]" />
            <div className="flex h-[76px] w-[92px] items-center justify-center rounded border-8 border-[#ffb280] bg-[#fff3e7] text-[11px] font-black uppercase text-[#f45a22]">
              <span>SVS Food</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#eee5e0] bg-[#f4f1ef] px-6 pt-[18px] pb-7 max-[540px]:p-4">
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

          <p className="mt-[17px] mb-3.5 flex items-center gap-2 text-[#52565d]">
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
    </main>
  )
}

export default Hero
