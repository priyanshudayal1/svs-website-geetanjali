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
import './Hero.css'

const stores = [
  {
    address: 'Narmada Road, Jabalpur',
    city: 'Jabalpur',
  },
  {
    address: 'Civic Centre, Jabalpur',
    city: 'Jabalpur',
  },
  {
    address: 'Rewa Road, Satna',
    city: 'Satna',
    distance: '183 KMs away',
  },
]

function StoreCard({ store }) {
  return (
    <article className="store-card">
      {store.distance ? (
        <div className="distance-badge">
          <FiNavigation aria-hidden="true" />
          <span>{store.distance}</span>
        </div>
      ) : null}

      <div className="store-card-top">
        <div className="store-title">
          <img src={logo} alt="" />
          <h3>SVS Food</h3>
        </div>
        <a href="/order">
          View Store
          <FiArrowRight aria-hidden="true" />
        </a>
      </div>

      <div className="store-meta">
        <p>
          <FiMapPin aria-hidden="true" />
          <span>{store.address}</span>
        </p>
        <p>
          <FiClock aria-hidden="true" />
          <span>
            <strong>Open from</strong> 11:00 AM to 11:00 PM
          </span>
        </p>
      </div>

      <button type="button">Order Online</button>
    </article>
  )
}

function Hero() {
  return (
    <main className="home-page">
      <section
        className="food-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <span className="veg-pill">100% Pure Vegetarian</span>
          <h1>
            Great Taste,
            <br />
            <span>Good Times!</span>
          </h1>
          <p>
            Freshly prepared pure veg food made with love and zero
            preservatives.
          </p>
          <a className="hero-cta" href="/order">
            Order Now
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="hero-dots" aria-hidden="true">
          <span className="is-active" />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="store-finder">
        <div className="finder-top">
          <div className="finder-heading">
            <span className="finder-pin">
              <FiMapPin aria-hidden="true" />
            </span>
            <div>
              <h2>Find SVS Food stores near you</h2>
              <div className="finder-controls">
                <button className="location-button" type="button">
                  <FiNavigation aria-hidden="true" />
                  Use my current location
                </button>
                <span>or</span>
                <button className="select-button" type="button">
                  Select City
                  <FiChevronDown aria-hidden="true" />
                </button>
                <button className="select-button" type="button">
                  Select Locality
                  <FiChevronDown aria-hidden="true" />
                </button>
              </div>
              <p className="current-location">
                <FiMapPin aria-hidden="true" />
                Satna, Madhya Pradesh
                <button type="button">Change Location</button>
              </p>
            </div>
          </div>

          <div className="shop-illustration" aria-hidden="true">
            <div className="awning" />
            <div className="shop-body">
              <span>SVS Food</span>
            </div>
          </div>
        </div>

        <div className="finder-results">
          <div className="filter-row">
            <div className="filters">
              <button type="button">
                Order Type
                <FiChevronDown aria-hidden="true" />
              </button>
              <button type="button">Veg Only</button>
              <button type="button">Open Now</button>
              <button type="button">Newly Opened</button>
            </div>
            <div className="sort-control">
              <span>Sort By:</span>
              <button type="button">
                Nearest
                <FiChevronDown aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="result-count">
            <FiSearch aria-hidden="true" />
            <strong>{stores.length} Results</strong> found
          </p>

          <div className="store-grid">
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
