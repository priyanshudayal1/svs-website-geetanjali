import { useMemo, useState } from 'react'
import { FiPlus, FiSearch, FiShoppingBag, FiSliders, FiStar, FiX } from 'react-icons/fi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import comboBannerFood from '../assets/combo-banner-food.png'
import { useMenuFeed } from '../hooks/useMenuFeed'

const ratingOptions = [4.5, 4, 3]
const spicyOptions = ['Mild', 'Medium', 'Hot']

function titleMatches(item, query) {
  const value = query.trim().toLowerCase()

  if (!value) {
    return true
  }

  return `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(value)
}

function MenuCard({ item, count, onAdd }) {
  const navigate = useNavigate()

  function openItem() {
    navigate(`/order/${item.slug}`)
  }

  return (
    <article
      className="group flex min-h-[286px] cursor-pointer flex-col overflow-hidden rounded-lg border border-[#eee4df] bg-white shadow-[0_8px_22px_rgb(42_31_26_/_8%)] transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgb(42_31_26_/_12%)]"
      role="button"
      tabIndex={0}
      onClick={openItem}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openItem()
        }
      }}
    >
      <div className="relative grid h-[156px] place-items-center bg-[#fffaf7] px-4 pt-4">
        {item.rating ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-black text-[#42342e]">
            <FiStar className="fill-[#ffbd2e] text-[#ffbd2e]" aria-hidden="true" />
            {item.rating.toFixed(1)}
          </span>
        ) : null}
        <img
          className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.06]"
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3 pb-4">
        <div className="min-h-[74px]">
          <h3 className="m-0 text-[15px] leading-tight font-black text-[#20242b]">
            {item.name}
          </h3>
          <p className="mt-1.5 mb-0 line-clamp-2 text-xs leading-[1.35] text-[#686d75]">
            {item.description || item.category}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <strong className="text-base leading-none text-[#111318]">₹{item.price}</strong>
          <button
            className="inline-flex min-h-9 min-w-[78px] cursor-pointer items-center justify-center gap-1.5 rounded-md border-0 bg-[var(--color-primary)] px-3 text-xs font-black text-white shadow-[0_9px_18px_rgb(var(--color-primary-shadow)_/_22%)] transition hover:-translate-y-px hover:bg-[#df5522]"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onAdd()
            }}
          >
            {count ? count : 'Add'}
            <FiPlus aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}

function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#3f454e]">
      <input
        className="h-4 w-4 accent-[var(--color-primary)]"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  )
}

function MenuPage({ addToCart, cartItems }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { allItems, categories, error, isLoading } = useMenuFeed()
  const selectedCategory = searchParams.get('category') || 'all'
  const [query, setQuery] = useState('')
  const [vegOnly, setVegOnly] = useState(false)
  const [maxPrice, setMaxPrice] = useState(500)
  const [rating, setRating] = useState(0)
  const [spicy, setSpicy] = useState([])

  const categoryTabs = useMemo(() => [{ name: 'All', slug: 'all' }, ...categories], [categories])
  const menuMaxPrice = useMemo(
    () => Math.max(500, ...allItems.map((item) => item.price || 0)),
    [allItems],
  )

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const categoryMatch =
        selectedCategory === 'all' || item.categorySlug === selectedCategory
      const priceMatch = item.price <= maxPrice
      const vegMatch = !vegOnly || item.veg !== false
      const ratingMatch = !rating || item.rating >= rating
      const spicyMatch = spicy.length === 0 || spicy.includes(item.spicy)

      return (
        categoryMatch &&
        priceMatch &&
        vegMatch &&
        ratingMatch &&
        spicyMatch &&
        titleMatches(item, query)
      )
    })
  }, [allItems, maxPrice, query, rating, selectedCategory, spicy, vegOnly])

  const cartTotal = cartItems.reduce((total, item) => total + item.quantity, 0)

  function selectCategory(slug) {
    setSearchParams(slug === 'all' ? {} : { category: slug })
  }

  function clearFilters() {
    setQuery('')
    setVegOnly(false)
    setMaxPrice(500)
    setRating(0)
    setSpicy([])
  }

  function toggleSpicy(level) {
    setSpicy((current) =>
      current.includes(level)
        ? current.filter((item) => item !== level)
        : [...current, level],
    )
  }

  function getItemCount(item) {
    return cartItems
      .filter((cartItem) => cartItem.slug === item.slug)
      .reduce((total, cartItem) => total + cartItem.quantity, 0)
  }

  return (
    <main className="bg-[#f1f0f4] px-6 py-10 max-[720px]:px-4 max-[720px]:py-7">
      <section className="mx-auto max-w-[1240px]">
        <div className="mb-7 flex items-start justify-between gap-5 max-[820px]:flex-col">
          <div>
            <p className="m-0 mb-2 text-[13px] font-black uppercase text-[var(--color-primary)]">
              Order Now
            </p>
            <h1 className="m-0 text-[clamp(34px,4vw,48px)] leading-none font-black text-[#171b21]">
              Our Menu
            </h1>
            <p className="mt-2 mb-0 text-sm font-semibold text-[#5d626b]">
              Choose from a wide range of delicious pure veg food
            </p>
          </div>

          <div className="flex w-full max-w-[420px] items-center gap-3 rounded-full border border-[#e4ddd8] bg-white px-4 shadow-sm max-[820px]:max-w-none">
            <FiSearch className="shrink-0 text-[#868b94]" aria-hidden="true" />
            <input
              className="min-h-12 w-full border-0 bg-transparent text-sm font-semibold text-[#242932] outline-none placeholder:text-[#9b9fa6]"
              placeholder="Search for food..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? (
              <button
                className="inline-flex cursor-pointer border-0 bg-transparent p-0 text-[#868b94]"
                aria-label="Clear search"
                type="button"
                onClick={() => setQuery('')}
              >
                <FiX aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="mb-6 flex gap-3 overflow-x-auto pb-1">
          {categoryTabs.map((category) => {
            const active = selectedCategory === category.slug

            return (
              <button
                className={`min-h-11 shrink-0 cursor-pointer rounded-full border px-7 text-xs font-black transition ${
                  active
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_12px_24px_rgb(var(--color-primary-shadow)_/_18%)]'
                    : 'border-[#e5ddd7] bg-white text-[#323741] hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary)]'
                }`}
                key={category.slug}
                type="button"
                onClick={() => selectCategory(category.slug)}
              >
                {category.name}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-[280px_1fr] items-start gap-6 max-[960px]:grid-cols-1">
          <aside className="rounded-lg border border-[#eee4df] bg-white p-5 shadow-[0_8px_22px_rgb(42_31_26_/_7%)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="m-0 inline-flex items-center gap-2 text-sm font-black text-[#20242b]">
                <FiSliders aria-hidden="true" />
                Filters
              </h2>
              <button
                className="cursor-pointer border-0 bg-transparent p-0 text-xs font-black text-[var(--color-primary)]"
                type="button"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-3">
                <FilterCheckbox
                  label="Veg Only"
                  checked={vegOnly}
                  onChange={() => setVegOnly((value) => !value)}
                />
              </div>

              <div className="grid gap-3 border-t border-[#f0e8e2] pt-5">
                <div className="flex items-center justify-between text-xs font-black text-[#20242b]">
                  <span>Price Range</span>
                  <span>₹{maxPrice}</span>
                </div>
                <input
                  className="w-full accent-[var(--color-primary)]"
                  type="range"
                  min="20"
                  max={menuMaxPrice}
                  step="10"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                />
                <div className="flex justify-between text-[11px] font-bold text-[#7d828a]">
                  <span>₹20</span>
                  <span>₹220+</span>
                </div>
              </div>

              <div className="grid gap-3 border-t border-[#f0e8e2] pt-5">
                <h3 className="m-0 text-xs font-black text-[#20242b]">Rating</h3>
                {ratingOptions.map((option) => (
                  <FilterCheckbox
                    key={option}
                    label={`${option} & above`}
                    checked={rating === option}
                    onChange={() => setRating((value) => (value === option ? 0 : option))}
                  />
                ))}
              </div>

              <div className="grid gap-3 border-t border-[#f0e8e2] pt-5">
                <h3 className="m-0 text-xs font-black text-[#20242b]">Spicy</h3>
                {spicyOptions.map((option) => (
                  <FilterCheckbox
                    key={option}
                    label={option}
                    checked={spicy.includes(option)}
                    onChange={() => toggleSpicy(option)}
                  />
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="m-0 text-sm font-black text-[#424750]">
                {isLoading ? 'Refreshing live menu...' : `${filteredItems.length} items found`}
              </p>
              <div className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#eaded6] bg-white px-4 text-sm font-black text-[#20242b] shadow-sm">
                <FiShoppingBag className="text-[var(--color-primary)]" aria-hidden="true" />
                {cartTotal} added
              </div>
            </div>
            {error ? (
              <p className="mb-4 rounded-lg border border-[#f0d5c8] bg-[#fff6f0] px-4 py-3 text-xs font-bold text-[#8d3b20]">
                Live menu could not be loaded, so the saved menu is shown.
              </p>
            ) : null}

            {filteredItems.length ? (
              <div className="grid grid-cols-3 gap-5 max-[1180px]:grid-cols-2 max-[620px]:grid-cols-1">
                {filteredItems.map((item) => (
                  <MenuCard
                    count={getItemCount(item)}
                    item={item}
                    key={`${item.categorySlug}-${item.name}`}
                    onAdd={() => addToCart(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="grid min-h-[260px] place-items-center rounded-lg border border-dashed border-[#dfcfc6] bg-white p-8 text-center">
                <div>
                  <h2 className="m-0 text-2xl font-black text-[#20242b]">No items found</h2>
                  <p className="mx-auto mt-2 mb-5 max-w-[360px] text-sm leading-[1.6] text-[#666b73]">
                    Try a different category, search term, or filter.
                  </p>
                  <button
                    className="min-h-11 cursor-pointer rounded-full border-0 bg-[var(--color-primary)] px-6 text-sm font-black text-white"
                    type="button"
                    onClick={clearFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[18px] bg-[#0e0402] text-white shadow-[0_12px_24px_rgb(42_31_26_/_16%)]">
          <div className="relative grid min-h-[122px] grid-cols-[1fr_380px_auto] items-center gap-5 px-16 py-5 max-[1040px]:grid-cols-[1fr_300px_auto] max-[1040px]:px-10 max-[780px]:grid-cols-[1fr_auto] max-[780px]:px-7 max-[560px]:grid-cols-1 max-[560px]:gap-3 max-[560px]:px-5 max-[560px]:py-6 max-[560px]:text-center">
            <p className="relative z-[1] m-0 text-[26px] leading-tight font-black tracking-[-0.01em] text-white drop-shadow-[0_2px_2px_rgb(0_0_0_/_50%)] max-[1040px]:text-[22px] max-[720px]:text-lg max-[560px]:mx-auto">
              Add a drink & fries to make it a perfect combo!
            </p>
            <div
              className="pointer-events-none relative h-[92px] bg-[#0e0402] max-[780px]:absolute max-[780px]:right-[160px] max-[780px]:bottom-0 max-[780px]:w-[250px] max-[560px]:relative max-[560px]:right-auto max-[560px]:bottom-auto max-[560px]:mx-auto max-[560px]:h-[74px] max-[560px]:w-[260px]"
              aria-hidden="true"
            >
              <img
                className="absolute left-1/2 bottom-[-28px] h-[142px] w-[430px] max-w-none -translate-x-1/2 object-contain brightness-110 contrast-110 saturate-125 max-[1040px]:h-[120px] max-[1040px]:w-[360px] max-[560px]:bottom-[-20px] max-[560px]:h-[104px] max-[560px]:w-[310px]"
                src={comboBannerFood}
                alt=""
              />
            </div>
            <button
              className="relative z-[1] h-[66px] min-w-[246px] cursor-pointer rounded-[13px] border-0 bg-[#ff4b16] px-8 text-[24px] font-black text-white shadow-[0_4px_10px_rgb(0_0_0_/_18%)] transition hover:bg-[#e95b23] max-[1040px]:h-14 max-[1040px]:min-w-[200px] max-[1040px]:text-xl max-[720px]:h-12 max-[720px]:min-w-[170px] max-[720px]:text-base max-[560px]:mx-auto"
              type="button"
              onClick={() => selectCategory('party-combos')}
            >
              Make it a Combo
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MenuPage
