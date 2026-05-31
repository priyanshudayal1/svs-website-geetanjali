import {
  FiArrowRight,
  FiChevronDown,
  FiClock,
  FiMapPin,
  FiNavigation,
  FiSearch,
  FiShoppingBag,
  FiTruck,
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
    onlineOrdersDelivery: '1',
    onlineOrdersSelfPickup: '1',
    dineInOrders: '1',
    pureVegetarian: '1',
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
    onlineOrdersDelivery: '1',
    onlineOrdersSelfPickup: '1',
    dineInOrders: '1',
    pureVegetarian: '1',
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
    onlineOrdersDelivery: '1',
    onlineOrdersSelfPickup: '1',
    dineInOrders: '1',
    pureVegetarian: '1',
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
  'inline-flex min-h-9 items-center gap-2 rounded-md border border-[#e9e2df] bg-white px-3 text-xs font-extrabold text-[#363a40] shadow-sm transition hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-55'
const selectButton = `${controlButton} min-w-[190px] justify-between max-[820px]:min-w-[min(100%,260px)]`

const orderTypeOptions = [
  { value: 'all', label: 'All orders' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'dineIn', label: 'Dine-in' },
]

const sortOptions = [
  { value: 'nearest', label: 'Nearest' },
  { value: 'name', label: 'Name' },
  { value: 'open', label: 'Open first' },
]

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

function getDistanceValue(store) {
  const distance = Number(store.distance)

  return Number.isFinite(distance) ? distance : Number.POSITIVE_INFINITY
}

function minutesFromStoreTime(hour, mins) {
  return Number(hour || 0) * 60 + Number(mins || 0)
}

function isStoreOpenNow(store) {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const startMinutes = minutesFromStoreTime(
    store.onlineOrdersStartHours ?? '11',
    store.onlineOrdersStartMins ?? '0',
  )
  const endMinutes = minutesFromStoreTime(
    store.onlineOrdersEndHours ?? '23',
    store.onlineOrdersEndMins ?? '0',
  )

  if (startMinutes === endMinutes) {
    return true
  }

  if (startMinutes < endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes
  }

  return currentMinutes >= startMinutes || currentMinutes <= endMinutes
}

function supportsOrderType(store, orderType) {
  if (orderType === 'delivery') {
    return store.onlineOrdersDelivery === '1'
  }

  if (orderType === 'pickup') {
    return (
      store.onlineOrdersSelfPickup === '1' ||
      store.onlineOrdersSelfPickUpOn === '1'
    )
  }

  if (orderType === 'dineIn') {
    return store.dineInOrders === '1'
  }

  return true
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
  const openNow = isStoreOpenNow(store)

  return (
    <article
      className={`relative grid min-h-[108px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-lg border border-[#ebe4df] bg-white px-4 py-4 shadow-[0_8px_18px_rgb(42_31_26_/_6%)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgb(42_31_26_/_10%)] max-[1280px]:grid-cols-1 max-[1280px]:items-stretch ${
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
          <div className="mt-2 flex flex-wrap gap-2">
            {store.onlineOrdersDelivery === '1' ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fff4ed] px-2 py-1 text-[10px] font-black text-[var(--color-primary)]">
                <FiTruck aria-hidden="true" />
                Delivery
              </span>
            ) : null}
            {store.onlineOrdersSelfPickup === '1' ||
            store.onlineOrdersSelfPickUpOn === '1' ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#eef8df] px-2 py-1 text-[10px] font-black text-[#436b12]">
                <FiShoppingBag aria-hidden="true" />
                Pickup
              </span>
            ) : null}
            <span
              className={`inline-flex rounded-full px-2 py-1 text-[10px] font-black ${
                openNow
                  ? 'bg-[#e8f8ee] text-[#137a35]'
                  : 'bg-[#f2f2f2] text-[#686d75]'
              }`}
            >
              {openNow ? 'Open now' : 'Closed now'}
            </span>
          </div>
          <div className="mt-2 grid gap-0.5">
            <p className="m-0 flex min-w-0 items-start gap-1.5 text-[11px] leading-snug font-semibold text-[#4b4f57]">
              <FiMapPin className="mt-0.5 shrink-0" aria-hidden="true" />
              <span className="min-w-0 [overflow-wrap:anywhere]">
                {store.address || `${store.locality}, ${store.city}`}
              </span>
            </p>
            <p className="m-0 flex min-w-0 items-start gap-1.5 text-[11px] leading-snug font-semibold text-[#4b4f57]">
              <FiClock className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-[#30343a]">Open from</strong>{' '}
                {formatStoreHours(store)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <button
        className="min-h-10 w-full max-w-[164px] cursor-pointer justify-self-end rounded-md border border-[var(--color-primary-border)] bg-white px-5 text-xs font-extrabold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white max-[1280px]:max-w-none"
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
  const [localities, setLocalities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedLocality, setSelectedLocality] = useState('')
  const [orderType, setOrderType] = useState('all')
  const [vegOnly, setVegOnly] = useState(false)
  const [openNowOnly, setOpenNowOnly] = useState(false)
  const [sortBy, setSortBy] = useState('nearest')
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

  const loadStoresForLocality = useCallback(
    async (locality, signal) => {
      if (!locality?.latitude || !locality?.longitude) {
        throw new Error('Selected locality could not be located')
      }

      await loadStoresForCoordinates({
        lat: locality.latitude,
        lng: locality.longitude,
        signal,
      })
    },
    [loadStoresForCoordinates],
  )

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

        setLocalities(localities)
        await loadStoresForLocality(matchedLocality, controller.signal)
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
  }, [loadStoresForLocality, selectedCity])

  useEffect(() => {
    if (!selectedLocality) {
      return undefined
    }

    const locality = localities.find((item) => item.localityId === selectedLocality)

    if (!locality) {
      return undefined
    }

    const controller = new AbortController()

    async function loadSelectedLocality() {
      setLocationStatus('loading')
      setLocationError('')

      try {
        await loadStoresForLocality(locality, controller.signal)
        setLocationStatus('ready')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStores([])
          setSelectedLocation(locality.localityName || selectedCity)
          setLocationStatus('error')
          setLocationError('No outlet details found for this locality')
        }
      }
    }

    loadSelectedLocality()

    return () => controller.abort()
  }, [loadStoresForLocality, localities, selectedCity, selectedLocality])

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
          setSelectedLocality('')
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

  const filteredStores = useMemo(() => {
    return stores
      .filter((store) => supportsOrderType(store, orderType))
      .filter((store) => !vegOnly || store.pureVegetarian !== '0')
      .filter((store) => !openNowOnly || isStoreOpenNow(store))
      .sort((first, second) => {
        if (sortBy === 'name') {
          return (first.locality || first.name || '').localeCompare(
            second.locality || second.name || '',
          )
        }

        if (sortBy === 'open') {
          return Number(isStoreOpenNow(second)) - Number(isStoreOpenNow(first))
        }

        return getDistanceValue(first) - getDistanceValue(second)
      })
  }, [openNowOnly, orderType, sortBy, stores, vegOnly])

  const visibleStores = useMemo(() => filteredStores.slice(0, 12), [filteredStores])

  return (
    <main className="min-h-[calc(100vh-74px)] bg-[var(--color-page-bg)] pb-12">
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
            <div className="min-w-0">
              <h2 className="m-0 mb-4 text-2xl font-black text-[#20242b]">
                Find SVS Food stores near you
              </h2>
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#f0e4dc] bg-[#fffaf7] p-3">
                <button
                  className={`${controlButton} border-[var(--color-primary-border)] text-[var(--color-primary)]`}
                  onClick={useCurrentLocation}
                  disabled={locationStatus === 'loading'}
                  type="button"
                >
                  <FiNavigation aria-hidden="true" />
                  {locationStatus === 'loading'
                    ? 'Finding stores...'
                    : 'Use my current location'}
                </button>
                <span className="text-xs font-black uppercase text-[#544740]">
                  or
                </span>
                <label className={`${selectButton} relative cursor-pointer`}>
                  <span className="sr-only">Select City</span>
                  <select
                    className="w-full cursor-pointer appearance-none border-0 bg-transparent pr-7 text-xs font-extrabold text-[#363a40] outline-none"
                    onChange={(event) => {
                      setSelectedCity(event.target.value)
                      setSelectedLocality('')
                      setSelectedLocation('')
                    }}
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
                <label className={`${selectButton} relative cursor-pointer`}>
                  <span className="sr-only">Select Locality</span>
                  <select
                    className="w-full cursor-pointer appearance-none border-0 bg-transparent pr-7 text-xs font-extrabold text-[#363a40] outline-none disabled:cursor-not-allowed"
                    disabled={!selectedCity || localities.length === 0}
                    onChange={(event) => setSelectedLocality(event.target.value)}
                    value={selectedLocality}
                  >
                    <option value="">All localities</option>
                    {localities.map((locality) => (
                      <option key={locality.localityId} value={locality.localityId}>
                        {locality.localityName}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown aria-hidden="true" />
                </label>
              </div>
              <p className="mt-3 mb-0 flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#3b3e45]">
                <FiMapPin className="text-[var(--color-primary)]" aria-hidden="true" />
                {selectedLocation || selectedCity || 'Select a city to find nearby outlets'}
                <button
                  className="cursor-pointer border-0 bg-transparent p-0 pl-1.5 font-black text-[var(--color-primary)]"
                  onClick={() => {
                    setSelectedCity('')
                    setSelectedLocation('')
                    setSelectedLocality('')
                    setLocalities([])
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

        <div className="border-t border-[#eee5e0] bg-[#f6f2ef] px-6 pt-4 pb-4 max-[540px]:p-4">
          <div className="flex items-center justify-between gap-4 max-[920px]:flex-col max-[920px]:items-stretch">
            <div className="flex flex-wrap gap-3">
              <label className={`${controlButton} relative cursor-pointer`}>
                <span>Order Type</span>
                <select
                  className="cursor-pointer appearance-none border-0 bg-transparent pr-7 text-xs font-extrabold text-[#363a40] outline-none"
                  onChange={(event) => setOrderType(event.target.value)}
                  value={orderType}
                >
                  {orderTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  className="pointer-events-none absolute right-3"
                  aria-hidden="true"
                />
              </label>
              <button
                className={`${controlButton} ${
                  vegOnly
                    ? 'border-[#80b339] bg-[#eef8df] text-[#426b12]'
                    : ''
                }`}
                onClick={() => setVegOnly((value) => !value)}
                type="button"
                aria-pressed={vegOnly}
              >
                Veg Only
              </button>
              <button
                className={`${controlButton} ${
                  openNowOnly
                    ? 'border-[#80b339] bg-[#eef8df] text-[#426b12]'
                    : ''
                }`}
                onClick={() => setOpenNowOnly((value) => !value)}
                type="button"
                aria-pressed={openNowOnly}
              >
                Open Now
              </button>
              <button
                className={controlButton}
                onClick={() => {
                  setOrderType('all')
                  setVegOnly(false)
                  setOpenNowOnly(false)
                  setSortBy('nearest')
                }}
                type="button"
              >
                Clear Filters
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-black text-[#343840]">
                Sort By:
              </span>
              <label className={`${controlButton} relative min-w-[150px] cursor-pointer justify-between`}>
                <select
                  className="w-full cursor-pointer appearance-none border-0 bg-transparent pr-7 text-xs font-extrabold text-[#363a40] outline-none"
                  onChange={(event) => setSortBy(event.target.value)}
                  value={sortBy}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  className="pointer-events-none absolute right-3"
                  aria-hidden="true"
                />
              </label>
            </div>
          </div>

          <p className="mt-3 mb-3 flex items-center gap-2 text-sm text-[#52565d]">
            <FiSearch aria-hidden="true" />
            <strong>{filteredStores.length} Results</strong>{' '}
            found
            {filteredStores.length > visibleStores.length ? (
              <span>showing first {visibleStores.length}</span>
            ) : null}
            {storesStatus === 'loading' ? <span>loading live store data...</span> : null}
            {locationStatus === 'loading' ? <span>finding nearest stores...</span> : null}
            {storesStatus === 'error' || locationStatus === 'error' ? (
              <span>{locationError || 'showing saved store data'}</span>
            ) : null}
          </p>

          {visibleStores.length ? (
            <div className="grid grid-cols-3 gap-6 max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
              {visibleStores.map((store) => (
                <StoreCard key={store.id || store.slug || store.address || store.city} store={store} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-[180px] place-items-center rounded-lg border border-dashed border-[#dccfc7] bg-white p-6 text-center">
              <div>
                <h3 className="m-0 text-xl font-black text-[#20242b]">
                  No stores match these filters
                </h3>
                <p className="mx-auto mt-2 mb-4 max-w-[360px] text-sm leading-[1.5] text-[#666b73]">
                  Try a different city, locality, order type, or clear the active filters.
                </p>
                <button
                  className="min-h-10 cursor-pointer rounded-md border-0 bg-[var(--color-primary)] px-5 text-xs font-black text-white"
                  onClick={() => {
                    setOrderType('all')
                    setVegOnly(false)
                    setOpenNowOnly(false)
                  }}
                  type="button"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <OurMenu />
      <HomePromoAbout />
    </main>
  )
}

export default Hero
