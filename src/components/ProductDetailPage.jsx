import { useMemo, useState } from 'react'
import {
  FiCheckCircle,
  FiChevronRight,
  FiDroplet,
  FiMinus,
  FiPlus,
  FiShield,
  FiStar,
  FiThumbsUp,
} from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { allMenuItems } from '../data/menuData'

const addOns = [
  { name: 'Extra Cheese', price: 20 },
  { name: 'Jalapenos', price: 15 },
  { name: 'Extra Sauce', price: 15 },
]

const qualities = [
  { label: '100% Veg', icon: FiCheckCircle },
  { label: 'Freshly Made', icon: FiThumbsUp },
  { label: 'Best Quality', icon: FiShield },
  { label: 'Hygienic', icon: FiDroplet },
]

function VegMark() {
  return (
    <span
      className="inline-grid h-[18px] w-[18px] place-items-center rounded-[2px] border-2 border-[#19a64a]"
      aria-label="Vegetarian"
      title="Vegetarian"
    >
      <span className="h-2 w-2 rounded-full bg-[#19a64a]" />
    </span>
  )
}

function SuggestedCard({ item }) {
  return (
    <Link
      className="group min-h-[238px] rounded-lg border border-[#ebe6e2] bg-white p-3 text-[#171b21] no-underline shadow-[0_10px_22px_rgb(40_28_22_/_7%)] transition hover:-translate-y-1 hover:shadow-[0_18px_30px_rgb(40_28_22_/_11%)]"
      to={`/order/${item.slug}`}
    >
      <div className="relative grid h-[138px] place-items-center">
        <img
          className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.06]"
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
        <span className="absolute top-0 right-0 inline-flex items-center gap-1 text-[11px] font-black">
          <FiStar className="fill-[#ffbd2e] text-[#ffbd2e]" aria-hidden="true" />
          {(item.rating || 4.3).toFixed(1)}
        </span>
      </div>
      <h3 className="m-0 mt-2 line-clamp-2 min-h-9 text-[13px] leading-tight font-black">
        {item.name}
      </h3>
      <strong className="mt-1 block text-sm">₹{item.price}</strong>
    </Link>
  )
}

function ProductDetailPage() {
  const { itemSlug } = useParams()
  const item = allMenuItems.find((menuItem) => menuItem.slug === itemSlug)
  const [selectedAddOns, setSelectedAddOns] = useState([])
  const [selectedSize, setSelectedSize] = useState('Regular')
  const [quantity, setQuantity] = useState(1)

  const sizes = useMemo(() => {
    if (!item) {
      return []
    }

    return [
      { name: 'Regular', price: item.price },
      { name: 'Medium', price: item.price + 30 },
      { name: 'Large', price: item.price + 50 },
    ]
  }, [item])

  const suggestedItems = useMemo(() => {
    if (!item) {
      return []
    }

    const sameCategory = allMenuItems.filter(
      (menuItem) => menuItem.categorySlug === item.categorySlug && menuItem.slug !== item.slug,
    )
    const extras = allMenuItems.filter(
      (menuItem) => menuItem.categorySlug !== item.categorySlug && menuItem.slug !== item.slug,
    )

    return [...sameCategory, ...extras].slice(0, 4)
  }, [item])

  if (!item) {
    return (
      <main className="grid min-h-[calc(100vh-74px)] place-items-center bg-[#f8f5f2] px-6 py-16 text-center">
        <section className="max-w-[520px]">
          <h1 className="m-0 text-4xl font-black text-[#171b21]">Item not found</h1>
          <p className="mt-3 mb-7 text-sm leading-[1.6] text-[#62666d]">
            The item you opened is no longer available on the menu.
          </p>
          <Link
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--color-primary)] px-6 text-sm font-black text-white no-underline"
            to="/order"
          >
            Back to Menu
          </Link>
        </section>
      </main>
    )
  }

  const selectedSizePrice = sizes.find((size) => size.name === selectedSize)?.price || item.price
  const addOnTotal = addOns
    .filter((addOn) => selectedAddOns.includes(addOn.name))
    .reduce((total, addOn) => total + addOn.price, 0)
  const totalPrice = (selectedSizePrice + addOnTotal) * quantity

  function toggleAddOn(name) {
    setSelectedAddOns((current) =>
      current.includes(name)
        ? current.filter((selectedName) => selectedName !== name)
        : [...current, name],
    )
  }

  return (
    <main className="bg-[#fbfaf8] px-6 py-8 max-[720px]:px-4">
      <section className="mx-auto max-w-[1180px]">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-[12px] font-bold text-[#8a8f96]">
          <Link className="text-[#8a8f96] no-underline hover:text-[var(--color-primary)]" to="/">
            Home
          </Link>
          <FiChevronRight aria-hidden="true" />
          <Link
            className="text-[#8a8f96] no-underline hover:text-[var(--color-primary)]"
            to={`/order?category=${item.categorySlug}`}
          >
            {item.category}
          </Link>
          <FiChevronRight aria-hidden="true" />
          <span className="text-[#222831]">{item.name}</span>
        </nav>

        <div className="grid grid-cols-[1.1fr_0.9fr] gap-10 max-[900px]:grid-cols-1">
          <section>
            <div className="grid min-h-[480px] overflow-hidden rounded-xl border border-[#ebe5df] bg-white shadow-[0_16px_34px_rgb(40_28_22_/_8%)]">
              <div className="grid min-h-[365px] place-items-center bg-[#fff7f1] p-6">
                <img
                  className="max-h-[340px] w-full object-contain drop-shadow-[0_28px_34px_rgb(89_48_25_/_24%)]"
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div className="grid grid-cols-4 divide-x divide-[#eee8e2] max-[560px]:grid-cols-2 max-[560px]:divide-x-0 max-[560px]:divide-y">
                {qualities.map(({ label, icon: Icon }) => (
                  <div className="grid place-items-center gap-2 px-3 py-4 text-center" key={label}>
                    <Icon className="text-xl text-[#2ca953]" aria-hidden="true" />
                    <span className="text-[11px] font-black text-[#3c4149]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="pt-1">
            <div className="flex items-center gap-3">
              <h1 className="m-0 text-[clamp(28px,4vw,42px)] leading-tight font-black text-[#171b21]">
                {item.name}
              </h1>
              <VegMark />
            </div>

            <div className="mt-2 flex items-center gap-1 text-[12px] font-black text-[#444b55]">
              <FiStar className="fill-[#ffbd2e] text-[#ffbd2e]" aria-hidden="true" />
              {(item.rating || 4.6).toFixed(1)}
              <span className="font-semibold text-[#747a83]">(120 reviews)</span>
            </div>

            <strong className="mt-4 block text-[26px] leading-none text-[#111318]">
              ₹{item.price}
            </strong>
            <p className="mt-5 mb-6 max-w-[480px] text-sm leading-[1.7] font-medium text-[#545a63]">
              {item.description}
            </p>

            <div className="rounded-xl border border-[#ebe5df] bg-white p-5 shadow-[0_14px_30px_rgb(40_28_22_/_7%)]">
              <h2 className="m-0 mb-4 text-sm font-black text-[#171b21]">Choose Add-ons</h2>
              <div className="grid gap-3">
                {addOns.map((addOn) => (
                  <label
                    className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-[#4d535c]"
                    key={addOn.name}
                  >
                    <span className="inline-flex items-center gap-3">
                      <input
                        className="h-4 w-4 accent-[var(--color-primary)]"
                        type="checkbox"
                        checked={selectedAddOns.includes(addOn.name)}
                        onChange={() => toggleAddOn(addOn.name)}
                      />
                      {addOn.name}
                    </span>
                    <span className="font-black text-[#2c3138]">+₹{addOn.price}</span>
                  </label>
                ))}
              </div>

              <h2 className="m-0 mt-6 mb-4 border-t border-[#f0e9e3] pt-5 text-sm font-black text-[#171b21]">
                Choose Size
              </h2>
              <div className="grid grid-cols-3 gap-3 max-[520px]:grid-cols-1">
                {sizes.map((size) => {
                  const active = size.name === selectedSize

                  return (
                    <label
                      className={`min-h-[72px] cursor-pointer rounded-lg border p-3 transition ${
                        active
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                          : 'border-[#ebe5df] bg-white text-[#303740] hover:border-[var(--color-primary-border)]'
                      }`}
                      key={size.name}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name="size"
                        checked={active}
                        onChange={() => setSelectedSize(size.name)}
                      />
                      <span className="flex items-center gap-2 text-[13px] font-black">
                        <span
                          className={`grid h-4 w-4 place-items-center rounded-full border ${
                            active ? 'border-[var(--color-primary)]' : 'border-[#b8bdc4]'
                          }`}
                        >
                          {active ? (
                            <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                          ) : null}
                        </span>
                        {size.name}
                      </span>
                      <span className="mt-1 block pl-6 text-xs font-black text-[#353b44]">
                        ₹{size.price}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-[132px_1fr] gap-4 max-[520px]:grid-cols-1">
              <div className="grid h-14 grid-cols-3 overflow-hidden rounded-xl border border-[#ebe5df] bg-white shadow-sm">
                <button
                  className="grid cursor-pointer place-items-center border-0 bg-white text-[#2f3540]"
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                >
                  <FiMinus aria-hidden="true" />
                </button>
                <span className="grid place-items-center text-sm font-black text-[#171b21]">
                  {quantity}
                </span>
                <button
                  className="grid cursor-pointer place-items-center border-0 bg-white text-[#2f3540]"
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((value) => value + 1)}
                >
                  <FiPlus aria-hidden="true" />
                </button>
              </div>
              <button
                className="h-14 cursor-pointer rounded-full border-0 bg-[var(--color-primary)] px-7 text-sm font-black text-white shadow-[0_14px_28px_rgb(var(--color-primary-shadow)_/_25%)] transition hover:bg-[#df5522]"
                type="button"
              >
                Add to Cart - ₹{totalPrice}
              </button>
            </div>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="m-0 mb-5 text-xl font-black text-[#171b21]">You may also like</h2>
          <div className="grid grid-cols-4 gap-4 max-[920px]:grid-cols-2 max-[520px]:grid-cols-1">
            {suggestedItems.map((suggestedItem) => (
              <SuggestedCard item={suggestedItem} key={suggestedItem.slug} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default ProductDetailPage
