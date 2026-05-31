const offers = [
  { code: 'SAVOURY' },
  { code: 'SNACKY' },
  { code: 'CHEEZY' },
]

const aboutImage = 'https://cdn.uengage.io/uploads/6442/image-773347-1771857436.png'
const playStoreBadge = 'https://svsfood.com/assets/wla_new/img/play-store.png'
const appStoreBadge = 'https://svsfood.com/assets/wla_new/img/ios-app.png'

function SectionHeading({ children }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-4 text-center">
      <span className="h-px w-[118px] max-w-[24vw] bg-[#313131]" />
      <h2 className="m-0 text-[17px] leading-tight font-black tracking-[0.06em] text-[#0f1720] uppercase">
        {children}
      </h2>
      <span className="h-px w-[118px] max-w-[24vw] bg-[#313131]" />
    </div>
  )
}

function OfferCard({ code }) {
  return (
    <article className="relative min-h-[104px] overflow-hidden rounded-xl bg-white px-5 py-4 shadow-[0_4px_16px_rgb(24_24_27_/_14%)]">
      <div className="relative z-[1]">
        <h3 className="m-0 text-[26px] leading-none font-black tracking-wide text-[#f16a34] uppercase">
          Freebie
        </h3>
        <span className="mt-7 inline-flex min-h-7 items-center rounded-full border border-dashed border-[#1d1d1d] px-4 text-[11px] font-medium text-[#24272c]">
          Use Code&nbsp;
          <strong className="text-[#f16a34]">{code}</strong>
        </span>
      </div>

      <div className="absolute right-0 bottom-0 h-[58px] w-[72px] rounded-tl-[22px] bg-[#f3b98f]" />
      <div className="absolute right-9 bottom-3 grid h-[58px] w-[58px] rotate-12 place-items-center rounded-[18px] bg-[#ff7346] text-[14px] font-black text-white uppercase shadow-[0_4px_8px_rgb(222_85_43_/_24%)]">
        Free
      </div>
    </article>
  )
}

function HomePromoAbout() {
  return (
    <>
      <section className="bg-white px-4 pt-8 pb-6">
        <div className="mx-auto max-w-[980px]">
          <SectionHeading>Exclusive Offers For You</SectionHeading>

          <div className="grid grid-cols-3 gap-9 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
            {offers.map((offer) => (
              <OfferCard code={offer.code} key={offer.code} />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#c9c9c9]" />
            <span className="h-2.5 w-7 rounded-full border border-[#f16a34] bg-white" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#c9c9c9]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#c9c9c9]" />
          </div>
        </div>
      </section>

      <section className="bg-[#f8ded2] px-4 py-8">
        <div className="mx-auto grid max-w-[980px] grid-cols-[0.82fr_1.18fr] items-center gap-7 max-[820px]:grid-cols-1">
          <div className="overflow-hidden rounded-lg bg-[#f16a34]">
            <img
              className="h-full max-h-[320px] w-full object-cover object-center"
              src={aboutImage}
              alt="SVS Food founder Paras Jain"
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="m-0 mb-5 text-xl font-black text-[#2b3036]">About Us!</h2>
            <div className="grid gap-5 text-[13px] leading-[1.75] font-medium text-[#2c2f35]">
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
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-4 pb-6">
        <div className="mx-auto max-w-[760px]">
          <SectionHeading>Download The App</SectionHeading>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a
              className="block"
              href="https://play.google.com/store/apps/details?id=com.app.uengage.svsfood"
              target="_blank"
              rel="noreferrer"
              aria-label="Download SVS Food on Google Play"
            >
              <img
                className="h-12 w-auto object-contain"
                src={playStoreBadge}
                alt="Get it on Google Play"
                loading="lazy"
              />
            </a>
            <a
              className="block"
              href="https://apps.apple.com/app/id1577576347"
              target="_blank"
              rel="noreferrer"
              aria-label="Download SVS Food on the App Store"
            >
              <img
                className="h-12 w-auto object-contain"
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
