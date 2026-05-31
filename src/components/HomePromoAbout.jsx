import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiClock, FiDownload, FiGift, FiHeart, FiShield, FiShoppingBag, FiSmartphone } from 'react-icons/fi'

const offers = [
  {
    code: 'CREAMY',
    title: 'Creamy Bite',
    text: 'Add more comfort to your burger, roll, or snack order.',
  },
  {
    code: 'SAVOURY',
    title: 'Savoury Treat',
    text: 'A little extra joy with your fresh pure veg favourites.',
  },
  {
    code: 'SNACKY',
    title: 'Snack Time',
    text: 'Perfect for quick bites, fries, sides, and evening cravings.',
  },
  {
    code: 'CHEEZY',
    title: 'Cheezy Bonus',
    text: 'Make your meal feel fuller without slowing down the order.',
  },
]

const aboutHighlights = [
  { value: '800+', label: 'daily orders' },
  { value: '3 min', label: 'quick prep' },
  { value: '100%', label: 'pure veg' },
]

const appPerks = [
  { icon: FiClock, label: 'Fast ordering' },
  { icon: FiShoppingBag, label: 'Live offers' },
  { icon: FiShield, label: 'Fresh tracking' },
]

const aboutImage = 'https://cdn.uengage.io/uploads/6442/image-773347-1771857436.png'
const playStoreBadge = 'https://svsfood.com/assets/wla_new/img/play-store.png'
const appStoreBadge = 'https://svsfood.com/assets/wla_new/img/ios-app.png'

function SectionHeading({ children }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-4 text-center">
      <span className="h-px w-[118px] max-w-[22vw] bg-[#d7c5bc]" />
      <h2 className="m-0 text-[17px] leading-tight font-black tracking-[0.06em] text-[#141820] uppercase">
        {children}
      </h2>
      <span className="h-px w-[118px] max-w-[22vw] bg-[#d7c5bc]" />
    </div>
  )
}

function OfferCard({ offer }) {
  return (
    <motion.article
      className="relative min-h-[172px] overflow-hidden rounded-lg border border-[#f0ded5] bg-white px-5 py-5 shadow-[0_14px_32px_rgb(52_37_29_/_9%)]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#fff0e9]" />
      <div className="absolute right-5 bottom-5 grid h-14 w-14 rotate-6 place-items-center rounded-lg bg-[#101820] text-[12px] font-black text-white uppercase shadow-[0_10px_18px_rgb(16_24_32_/_18%)]">
        Free
      </div>

      <div className="relative z-[1] flex h-full flex-col items-start">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#fff0e9] text-[#f16a34]">
          <FiGift aria-hidden="true" />
        </span>
        <h3 className="mt-4 mb-2 text-[24px] leading-none font-black tracking-wide text-[#f16a34] uppercase">
          {offer.title}
        </h3>
        <p className="m-0 max-w-[230px] text-[13px] leading-[1.55] font-semibold text-[#555b63]">
          {offer.text}
        </p>
        <span className="mt-5 inline-flex min-h-8 items-center rounded-full border border-dashed border-[#f16a34] bg-white px-4 text-[11px] font-black text-[#24272c]">
          Use Code&nbsp;
          <strong className="text-[#f16a34]">{offer.code}</strong>
        </span>
      </div>
    </motion.article>
  )
}

function OffersCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % offers.length)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [prefersReducedMotion])

  const visibleOffers = useMemo(
    () => Array.from({ length: 3 }, (_, offset) => offers[(activeIndex + offset) % offers.length]),
    [activeIndex],
  )

  return (
    <div>
      <div className="overflow-hidden px-1 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-3 gap-9 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1"
            key={activeIndex}
            initial={{ x: 56 }}
            animate={{ x: 0 }}
            exit={{ x: -56 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {visibleOffers.map((offer) => (
              <OfferCard offer={offer} key={`${activeIndex}-${offer.code}`} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" aria-label="Offer carousel">
        {offers.map((offer, index) => {
          const active = activeIndex === index

          return (
            <button
              className={`h-2.5 cursor-pointer rounded-full border p-0 transition-all ${
                active
                  ? 'w-7 border-[#f16a34] bg-white'
                  : 'w-2.5 border-transparent bg-[#c9c9c9]'
              }`}
              type="button"
              aria-label={`Show offer ${offer.code}`}
              aria-current={active}
              key={offer.code}
              onClick={() => setActiveIndex(index)}
            />
          )
        })}
      </div>
    </div>
  )
}

function HomePromoAbout() {
  return (
    <>
      <section className="bg-[#fffaf7] px-4 pt-10 pb-8">
        <div className="mx-auto max-w-[1080px]">
          <SectionHeading>Exclusive Offers For You</SectionHeading>

          <OffersCarousel />
        </div>
      </section>

      <section className="bg-[#f6ede6] px-4 py-12">
        <div className="mx-auto grid max-w-[1080px] grid-cols-[0.9fr_1.1fr] items-center gap-10 max-[820px]:grid-cols-1">
          <div className="relative overflow-hidden rounded-lg bg-[#15191f] shadow-[0_20px_44px_rgb(57_32_20_/_16%)]">
            <img
              className="block aspect-[1.08] max-h-[420px] w-full object-cover object-center opacity-95 max-[820px]:aspect-[1.7]"
              src={aboutImage}
              alt="SVS Food founder Paras Jain"
              loading="lazy"
            />
            <div className="absolute right-4 bottom-4 left-4 grid grid-cols-3 overflow-hidden rounded-lg border border-white/20 bg-white/92 backdrop-blur">
              {aboutHighlights.map((item) => (
                <div className="px-3 py-4 text-center" key={item.label}>
                  <strong className="block text-xl leading-none font-black text-[#f16a34]">
                    {item.value}
                  </strong>
                  <span className="mt-1 block text-[11px] leading-tight font-black text-[#20242b] uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-black uppercase text-[#5f7d1f] shadow-sm">
              <FiHeart aria-hidden="true" />
              Fresh since 2018
            </span>
            <h2 className="m-0 mb-5 max-w-[520px] text-[clamp(30px,3.8vw,46px)] leading-[1.02] font-black text-[#181c22]">
              Pure veg food with speed, hygiene, and a little Satna soul.
            </h2>
            <div className="grid gap-5 text-[15px] leading-[1.75] font-medium text-[#343941]">
              <p className="m-0">
                Established in 2018 in Satna, Madhya Pradesh, SVS Food is a 100% Pure
                Vegetarian Quick Service Restaurant (QSR) brand committed to delivering
                fresh, hygienic, and high-quality food with speed and innovation. From
                the very beginning, our focus has been on combining traditional purity
                with modern technology to create an exceptional customer experience.
              </p>
              <p className="m-0">
                Our fully high-tech stores are equipped with self-order kiosks and
                WhatsApp order tracking, while our own mobile app and website enable
                seamless ordering. We currently serve over 800 orders daily and more
                than 1200 orders on weekends, reflecting the trust and growing love of
                our customers.
              </p>
            </div>
            <a
              className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#181c22] px-6 text-sm font-black text-white no-underline"
              href="/about"
            >
              Know More
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10">
        <div className="mx-auto grid max-w-[1080px] grid-cols-[1fr_auto] items-center gap-8 rounded-lg border border-[#f0ded5] bg-[#101820] px-8 py-7 text-white shadow-[0_16px_40px_rgb(16_24_32_/_14%)] max-[760px]:grid-cols-1 max-[560px]:px-5">
          <div className="flex items-start gap-4 max-[560px]:flex-col">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f16a34] text-xl">
              <FiSmartphone aria-hidden="true" />
            </span>
            <div>
              <p className="m-0 mb-2 flex items-center gap-2 text-[12px] font-black uppercase text-[#b8dc38]">
                <FiDownload aria-hidden="true" />
                Download The App
              </p>
              <h2 className="m-0 text-[clamp(24px,3vw,34px)] leading-tight font-black">
                Order faster, track easier, and catch SVS offers first.
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {appPerks.map(({ icon: Icon, label }) => (
                  <span
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-2 text-xs font-bold text-white/90"
                    key={label}
                  >
                    <Icon aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-4 max-[760px]:justify-start">
            <a
              className="block transition-transform hover:-translate-y-0.5"
              href="https://play.google.com/store/apps/details?id=com.app.uengage.svsfood"
              target="_blank"
              rel="noreferrer"
              aria-label="Download SVS Food on Google Play"
            >
              <img
                className="h-12 w-auto object-contain max-[420px]:h-11"
                src={playStoreBadge}
                alt="Get it on Google Play"
                loading="lazy"
              />
            </a>
            <a
              className="block transition-transform hover:-translate-y-0.5"
              href="https://apps.apple.com/app/id1577576347"
              target="_blank"
              rel="noreferrer"
              aria-label="Download SVS Food on the App Store"
            >
              <img
                className="h-12 w-auto object-contain max-[420px]:h-11"
                src={appStoreBadge}
                alt="Download on the App Store"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePromoAbout
