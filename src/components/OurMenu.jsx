import { menuCategories } from '../data/menuData'

function OurMenu() {
  return (
    <section className="bg-[#fafafa] py-16 px-4">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[#e86a33] rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] m-0">
            Our Menu
          </h2>
          <div className="h-[2px] w-10 bg-[#e86a33] rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {menuCategories.map((item) => {
            // Simplify some names to match the UI precisely
            const displayName = item.name === 'Taste Maker Dips' ? 'Dips' : item.name;
            
            return (
              <a
                className="group flex flex-col items-center justify-between w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-[20px] bg-white p-3 shadow-[0_4px_16px_rgb(0_0_0_/_6%)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgb(0_0_0_/_10%)] no-underline"
                href={`/order?category=${item.slug}`}
                key={item.slug}
              >
                <div className="flex-1 w-full flex items-center justify-center overflow-hidden mb-2">
                  <img
                    className="max-h-[85%] max-w-[85%] object-contain transition duration-300 group-hover:scale-110 drop-shadow-sm"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#2d2d2d] leading-none mb-1">
                  {displayName}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default OurMenu
