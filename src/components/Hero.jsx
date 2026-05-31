import {
  FiArrowRight,
  FiChevronDown,
  FiClock,
  FiMapPin,
  FiNavigation,
  FiSearch,
} from 'react-icons/fi'
import { useCallback, useEffect, useMemo, useState } from 'react'
import heroImage from '../assets/food-hero.png'
import vegBeverageDessert from '../assets/hero-carousel/veg-beverage-dessert.png'
import vegFriesBurger from '../assets/hero-carousel/veg-fries-burger.png'
import vegNaanRoll from '../assets/hero-carousel/veg-naan-roll.png'
import vegPartyCombo from '../assets/hero-carousel/veg-party-combo.png'
import logo from '../assets/logo.png'
import HomePromoAbout from './HomePromoAbout'
import OurMenu from './OurMenu'

const fallbackStores = [
  {
    locality: 'Narmada Road',
    city: 'Jabalpur',
    name: 'SVS Food',
    distance: '0.82',
    address: 'Ojas Imperia, Kalyanika Parisar, Bandaria Tiraha, Rampur, Jabalpur (M.P.) 482008',
    id: '6808',
    onlineOrdersStartHours: '11',
    onlineOrdersStartMins: '0',
    onlineOrdersEndHours: '23',
    onlineOrdersEndMins: '0',
  },
  {
    locality: 'Civic Centre',
    city: 'Jabalpur',
    name: 'SVS Food',
    distance: '2.19',
    address: 'Shop No. S-22,22A Samdareeya Mall, Civic Centre, Jabalpur,',
    id: '12498',
    onlineOrdersStartHours: '11',
    onlineOrdersStartMins: '0',
    onlineOrdersEndHours: '23',
    onlineOrdersEndMins: '0',
  },
  {
    locality: 'Satna',
    city: 'Satna',
    name: 'SVS Food',
    address: 'SVS Food, Satna',
    id: 'satna-fallback',
    onlineOrdersStartHours: '11',
    onlineOrdersStartMins: '0',
    onlineOrdersEndHours: '23',
    onlineOrdersEndMins: '0',
  },
]

const storesEndpoint = 'https://svsfood.com/client/getStoresName'
const localityEndpoint = 'https://svsfood.com/maps_mongodb/getLocalityByName'
const geocodeEndpoint = 'https://svsfood.com/maps_mongodb/getGeocodeAddress'
const nearestStoreEndpoint = 'https://svsfood.com/client/locateNearestStore'
const businessId = '6442'
const geocodeHashKey =
  '7d110d504384caed9fd0bee8f00f6107802786f2e14c7ee71e3763dc793d89f6'

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

function formatStoreHours(store) {
  const startHour = store.onlineOrdersStartHours ?? '11'
  const startMins = String(store.onlineOrdersStartMins ?? '0').padStart(2, '0')
  const endHour = store.onlineOrdersEndHours ?? '23'
  const endMins = String(store.onlineOrdersEndMins ?? '0').padStart(2, '0')

  return `${startHour}:${startMins} to ${endHour}:${endMins}`
}

function formatDistance(distance) {
  return distance ? `${Number(distance).toFixed(2)} KMs away` : ''
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return response.json()
}

async function getStoresForCoordinates({ lat, lng, signal }) {
  const params = new URLSearchParams({
    lat,
    lng,
    hashKey: geocodeHashKey,
    businessId,
  })
  const storeParams = new URLSearchParams({ businessId, lat, lng })

  const [locationResult, storeResult] = await Promise.all([
    fetchJson(`${geocodeEndpoint}?${params}`, { signal }),
    fetchJson(`${nearestStoreEndpoint}?${storeParams}`, { signal }),
  ])

  return {
    location: locationResult,
    stores:
      storeResult?.status === 1 && Array.isArray(storeResult.data)
        ? storeResult.data
        : [],
  }
}

function StoreCard({ store }) {
  const distance = formatDistance(store.distance)

  return (
    <article
      className={`relative flex min-h-[86px] items-center justify-between gap-4 rounded-lg bg-white px-4 py-3 shadow-sm max-[720px]:flex-col max-[720px]:items-stretch ${
        distance ? 'pt-10' : ''
      }`}
    >
      {distance ? (
        <div className="absolute -top-px -left-px inline-flex items-center gap-1.5 rounded-br-2xl border border-dashed border-[#94ba55] bg-[#e9f7cc] px-3 py-1.5 text-xs text-[#0d1a12]">
          <FiNavigation aria-hidden="true" />
          <span>{distance}</span>
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
            {store.name || 'SVS Food'}
          </h3>
          <div className="mt-1 grid gap-0.5">
            <p className="m-0 flex items-center gap-1.5 text-[11px] font-semibold text-[#4b4f57]">
              <FiMapPin className="shrink-0" aria-hidden="true" />
              <span className="truncate">{store.address || `${store.locality}, ${store.city}`}</span>
            </p>
            <p className="m-0 flex items-center gap-1.5 text-[11px] font-semibold text-[#4b4f57]">
              <FiClock className="shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-[#30343a]">Open from</strong>{' '}
                {formatStoreHours(store)}
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
  const [stores, setStores] = useState(fallbackStores)
  const [cities, setCities] = useState(['Jabalpur', 'Satna'])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [storesStatus, setStoresStatus] = useState('loading')
  const [locationStatus, setLocationStatus] = useState('idle')
  const [locationError, setLocationError] = useState('')

  const loadStoresForCoordinates = useCallback(async ({ lat, lng, signal }) => {
    const { location, stores: nextStores } = await getStoresForCoordinates({
      lat,
      lng,
      signal,
    })

    if (location?.status === 1) {
      setSelectedLocation(
        location.locality ||
          location.formatted_Address ||
          location.city ||
          '',
      )
    }

    setStores(nextStores)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadStores() {
      try {
        const response = await fetch(storesEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
          },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Store request failed with ${response.status}`)
        }

        const data = await response.json()
        const nextCities = Array.from(
          new Set(
            (data.stores || [])
              .map((store) => store.city?.trim())
              .filter((city) => city && city !== '???'),
          ),
        ).sort()

        if (nextCities.length > 0) {
          setCities(nextCities)
        }

        setStoresStatus('ready')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStoresStatus('error')
        }
      }
    }

    loadStores()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!selectedCity) {
      return undefined
    }

    const controller = new AbortController()

    async function loadSelectedCity() {
      setLocationStatus('loading')
      setLocationError('')

      try {
        const localityParams = new URLSearchParams({ localityName: selectedCity })
        const localityResult = await fetchJson(`${localityEndpoint}?${localityParams}`, {
          signal: controller.signal,
        })
        const localities =
          localityResult.search_results || localityResult.data || localityResult.locality || []
        const matchedLocality =
          localities.find((locality) => locality.cityName === selectedCity) || localities[0]

        if (!matchedLocality?.latitude || !matchedLocality?.longitude) {
          throw new Error('Selected city could not be located')
        }

        await loadStoresForCoordinates({
          lat: matchedLocality.latitude,
          lng: matchedLocality.longitude,
          signal: controller.signal,
        })
        setLocationStatus('ready')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStores([])
          setSelectedLocation(selectedCity)
          setLocationStatus('error')
          setLocationError('No outlet details found for this location')
        }
      }
    }

    loadSelectedCity()

    return () => controller.abort()
  }, [loadStoresForCoordinates, selectedCity])

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus('error')
      setLocationError('Current location is not supported in this browser')
      return
    }

    setLocationStatus('loading')
    setLocationError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await loadStoresForCoordinates({
            lat: String(position.coords.latitude),
            lng: String(position.coords.longitude),
          })
          setSelectedCity('')
          setLocationStatus('ready')
        } catch {
          setLocationStatus('error')
          setLocationError('Could not find stores near your current location')
        }
      },
      () => {
        setLocationStatus('error')
        setLocationError('Location permission was not allowed')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    )
  }

  const visibleStores = useMemo(() => stores.slice(0, 12), [stores])

  return (
    <main className="min-h-[calc(100vh-74px)] bg-[#f1f0f4] pb-12">
      <section
        className="relative min-h-[350px] overflow-hidden rounded-b-[64px] bg-[#120905] before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(90deg,rgb(0_0_0_/_88%)_0%,rgb(0_0_0_/_62%)_33%,rgb(0_0_0_/_8%)_70%)] max-[540px]:min-h-[430px] max-[540px]:rounded-b-[36px]"
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
                  onClick={useCurrentLocation}
                  type="button"
                >
                  <FiNavigation aria-hidden="true" />
                  Use my current location
                </button>
                <span className="text-xs font-black uppercase text-[#544740]">
                  or
                </span>
                <label className={`${selectButton} relative cursor-pointer`}>
                  <span className="sr-only">Select City</span>
                  <select
                    className="w-full cursor-pointer appearance-none border-0 bg-transparent pr-7 text-xs font-extrabold text-[#363a40] outline-none"
                    onChange={(event) => setSelectedCity(event.target.value)}
                    value={selectedCity}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown
                    className="pointer-events-none absolute right-3"
                    aria-hidden="true"
                  />
                </label>
                <button className={selectButton} disabled type="button">
                  Select Locality
                  <FiChevronDown aria-hidden="true" />
                </button>
              </div>
              <p className="mt-3 mb-0 flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#3b3e45]">
                <FiMapPin className="text-[var(--color-primary)]" aria-hidden="true" />
                {selectedLocation || selectedCity || 'Select a city to find nearby outlets'}
                <button
                  className="cursor-pointer border-0 bg-transparent p-0 pl-1.5 font-black text-[var(--color-primary)]"
                  onClick={() => {
                    setSelectedCity('')
                    setSelectedLocation('')
                    setStores(fallbackStores)
                    setLocationStatus('idle')
                    setLocationError('')
                  }}
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
            <strong>{stores.length} Results</strong>{' '}
            found
            {stores.length > visibleStores.length ? (
              <span>showing first {visibleStores.length}</span>
            ) : null}
            {storesStatus === 'loading' ? <span>loading live store data...</span> : null}
            {locationStatus === 'loading' ? <span>finding nearest stores...</span> : null}
            {storesStatus === 'error' || locationStatus === 'error' ? (
              <span>{locationError || 'showing saved store data'}</span>
            ) : null}
          </p>

          <div className="grid grid-cols-3 gap-6 max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
            {visibleStores.map((store) => (
              <StoreCard key={store.id || store.slug || store.address || store.city} store={store} />
            ))}
          </div>
        </div>
      </section>
      <OurMenu />
      <HomePromoAbout />
    </main>
  )
}

export default Hero
