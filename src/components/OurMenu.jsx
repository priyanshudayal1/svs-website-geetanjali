import { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { menuCategories } from '../data/menuData'
import { useMenuFeed } from '../hooks/useMenuFeed'

const categoryOrder = [
  'burgers',
  'beverages',
  'sides',
  'naan-rolls',
  'taste-maker-dips',
  'desserts',
  'party-combos',
]

const menuCards = categoryOrder
  .map((slug) => menuCategories.find((category) => category.slug === slug))
  .filter(Boolean)

function OurMenu() {
  const { categories } = useMenuFeed()
  const carouselRef = useRef(null)

  function scrollMenu(direction) {
    carouselRef.current?.scrollBy({
      left: direction * 520,
      behavior: 'smooth',
    })
  }

  return (
    <section className="bg-[var(--color-page-bg)] px-4 pt-5 pb-6">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 rounded-full bg-[#f16a34]" />
          <h2 className="m-0 text-[18px] font-semibold leading-none text-[#1a1a1a] sm:text-xl">
            Our Menu
          </h2>
          <div className="h-px w-10 rounded-full bg-[#f16a34]" />
        </div>

        <div className="relative">
          <button
            className="absolute top-1/2 left-0 z-[1] hidden h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[#ece7e4] bg-white text-[#172333] shadow-[0_8px_20px_rgb(24_24_27_/_12%)] transition hover:border-[#f16a34] hover:text-[#f16a34] min-[760px]:grid"
            type="button"
            aria-label="Previous menu categories"
            onClick={() => scrollMenu(-1)}
          >
            <FiChevronLeft aria-hidden="true" />
          </button>

          <div
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[760px]:px-14"
            ref={carouselRef}
          >
            {menuCards.map((item) => {
              const liveCategory = categories.find((category) => category.slug === item.slug)
              const displayName = item.name === 'Taste Maker Dips' ? 'Dips' : item.name

              return (
                <Link
                  className="group flex h-[166px] w-[170px] shrink-0 snap-start flex-col items-center rounded-[26px] bg-[#f3f3f3] px-4 pt-4 pb-3 text-[#152235] no-underline shadow-[inset_0_1px_0_rgb(255_255_255_/_70%),0_2px_8px_rgb(20_20_24_/_6%)] transition duration-200 hover:-translate-y-1 hover:bg-[#eeeeee] hover:shadow-[0_12px_24px_rgb(20_20_24_/_10%)] sm:h-[170px] sm:w-[184px]"
                  to={`/order?category=${liveCategory?.slug || item.slug}`}
                  key={item.slug}
                >
                  <div className="flex h-[108px] w-[130px] shrink-0 items-center justify-center overflow-hidden bg-[#f3f3f3] sm:w-[136px]">
                    <img
                      className="max-h-[104px] max-w-[124px] object-contain mix-blend-multiply transition duration-200 group-hover:scale-[1.04] sm:max-w-[130px]"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <span className="mt-3 max-w-full text-center text-[15px] leading-tight font-bold tracking-normal sm:text-[16px]">
                    {displayName}
                  </span>
                </Link>
              )
            })}
          </div>

          <button
            className="absolute top-1/2 right-0 z-[1] hidden h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[#ece7e4] bg-white text-[#172333] shadow-[0_8px_20px_rgb(24_24_27_/_12%)] transition hover:border-[#f16a34] hover:text-[#f16a34] min-[760px]:grid"
            type="button"
            aria-label="Next menu categories"
            onClick={() => scrollMenu(1)}
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default OurMenu
