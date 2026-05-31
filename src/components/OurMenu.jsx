import { FiArrowRight } from 'react-icons/fi'

const menuItems = [
  {
    title: 'Burgers',
    image: 'https://cdn.uengage.io/uploads/6442/image-7681-1777654872.jpeg',
  },
  {
    title: 'Sides',
    image: 'https://cdn.uengage.io/uploads/6442/image-3621-1778081487.jpg',
  },
  {
    title: 'Beverages',
    image: 'https://cdn.uengage.io/uploads/6442/image-3815-1778145434.jpg',
  },
  {
    title: 'Naan & Rolls',
    image: 'https://cdn.uengage.io/uploads/6442/image-2783-1778081496.jpeg',
    featured: true,
  },
  {
    title: 'Taste Maker Dips',
    image: 'https://cdn.uengage.io/uploads/6442/image-1596-1778145412.jpg',
  },
  {
    title: 'Desserts',
    image: 'https://cdn.uengage.io/uploads/6442/image-1383-1778145403.jpg',
  },
  {
    title: 'Party Combos',
    image: 'https://cdn.uengage.io/uploads/6442/image-4592-1778145306.jpg',
  },
]

function OurMenu() {
  return (
    <section className="bg-[#f7ded2] px-6 py-16 max-[720px]:px-4 max-[720px]:py-12">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-8 flex items-end justify-between gap-6 max-[720px]:items-start max-[720px]:flex-col">
          <div>
            <p className="m-0 mb-2 text-[13px] font-black uppercase text-[var(--color-primary)]">
              Explore Favorites
            </p>
            <h2 className="m-0 text-[clamp(32px,4vw,48px)] leading-none font-black text-[#3f2016]">
              Our Menu
            </h2>
          </div>
          <a
            className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-[var(--color-primary-border)] bg-white px-5 text-sm font-black text-[var(--color-primary)] no-underline shadow-[0_12px_24px_rgb(var(--color-primary-shadow)_/_12%)] transition hover:-translate-y-0.5 hover:bg-[var(--color-primary)] hover:text-white"
            href="/order"
          >
            View Full Menu
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-x-[52px] gap-y-11 max-[1180px]:gap-x-8 max-[520px]:gap-y-7">
          {menuItems.map((item) => (
            <a
              className="group flex min-h-[272px] w-[240px] flex-col overflow-hidden rounded-lg bg-white text-center text-[#2f3339] no-underline shadow-[0_5px_16px_rgb(79_42_24_/_16%)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgb(79_42_24_/_18%)] max-[520px]:w-full"
              href="/order"
              key={item.title}
            >
              <div className="grid h-[214px] place-items-center overflow-hidden bg-white px-5 pt-5">
                <img
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.08]"
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <h3
                className={`m-0 flex min-h-[58px] items-center justify-center px-4 text-base font-semibold uppercase ${
                  item.featured ? 'text-[var(--color-primary)]' : 'text-[#30343a]'
                }`}
              >
                {item.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurMenu
