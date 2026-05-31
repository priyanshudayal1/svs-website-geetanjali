import aboutRestaurant from "../assets/about-restaurant.png";
import foodHero from "../assets/food-hero.png";

const stats = [
  { value: "2018", label: "Established in Satna" },
  { value: "3", label: "Stores Operating" },
  { value: "800+", label: "Orders Daily" },
  { value: "100%", label: "Pure Veg" },
];

const aboutCopy = [
  <>
    Established in <strong>2018 in Satna, Madhya Pradesh</strong>, SVS Food is a
    100% Pure Vegetarian Quick Service Restaurant (QSR) brand committed to
    delivering fresh, hygienic, and high-quality food with speed and innovation.
    From the very beginning, our focus has been on combining traditional purity
    with modern technology to create an exceptional customer experience.
  </>,
  <>
    <strong>At SVS Food</strong>, quality begins at the source. We proudly
    prepare our signature burger buns in-house without any preservatives or
    harmful chemicals, ensuring every bite is fresh and safe. Every order is
    made fresh upon request, so we never serve ready-made products. Along with
    our wide range of pure vegetarian offerings, we also provide dedicated Jain
    food options to cater to diverse customer preferences without compromise.
  </>,
  <>
    Our <strong>fully high-tech stores</strong> are equipped with self-order
    kiosks and WhatsApp order tracking, while our own mobile app and website
    enable seamless ordering. We currently serve over{" "}
    <strong>800 orders daily</strong> and more than 1200 orders on weekends,
    reflecting the trust and growing love of our customers.
  </>,
  <>
    With our own delivery fleet, partnership with Zomato under a self-logistics
    model, and specially designed insulated delivery boxes, we ensure that food
    reaches customers hot and fresh, with an efficient preparation time of just{" "}
    <strong>3 minutes</strong>.
  </>,
  <>
    Currently operating <strong>3 stores</strong> with an annual revenue of
    approximately <strong>Rs 6 crore</strong> and monthly per-store sales of{" "}
    <strong>Rs 25-30 lakh</strong>, SVS Food proudly maintains a 94% customer
    repeat rate.
  </>,
];

function AboutPage() {
  return (
    <main className="bg-[#fff8f3] px-6 py-10 max-[720px]:px-4">
      <section className="mx-auto max-w-[1180px] overflow-hidden rounded-lg border border-[#f1ddd3] bg-white shadow-[0_18px_44px_rgb(79_42_24_/_10%)]">
        <div className="p-6 max-[720px]:p-4">
          <div className="relative grid min-h-[380px] place-items-center overflow-hidden rounded-lg bg-[#22120b] text-center text-white max-[720px]:min-h-[330px]">
            <img
              className="absolute inset-0 h-full w-full object-cover opacity-70"
              src={aboutRestaurant}
              alt="Warm SVS Food restaurant interior"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0_/_58%),rgb(0_0_0_/_18%),rgb(0_0_0_/_58%))]" />
            <div className="relative z-[1] max-w-[680px] px-6">
              <h1 className="m-0 text-[clamp(34px,5vw,54px)] leading-none font-black">
                About SVS Food
              </h1>
              <p className="mx-auto mt-5 mb-0 max-w-[620px] text-[clamp(18px,2.2vw,26px)] leading-[1.45] font-semibold text-white/95">
                A 100% pure veg quick service restaurant chain serving fresh,
                hygienic burgers, rolls, pizzas, Jain options, and more.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 py-16 max-[820px]:grid-cols-2 max-[820px]:gap-y-8 max-[520px]:grid-cols-1 max-[520px]:py-10">
            {stats.map((stat, index) => (
              <div
                className={`px-6 text-center ${
                  index > 0
                    ? "border-l border-[#eadbd4] max-[820px]:border-l-0"
                    : ""
                } ${
                  index % 2 === 1
                    ? "max-[820px]:border-l max-[520px]:border-l-0"
                    : ""
                }`}
                key={stat.label}
              >
                <strong className="block text-[clamp(34px,4vw,46px)] leading-none font-black text-[var(--color-primary)]">
                  {stat.value}
                </strong>
                <span className="mt-3 block text-lg leading-snug font-semibold text-[#1f2329]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[0.9fr_1.1fr] items-center gap-14 px-4 pb-16 max-[900px]:grid-cols-1 max-[720px]:gap-8 max-[720px]:px-0 max-[720px]:pb-10">
            <div>
              <h2 className="m-0 mb-5 text-[clamp(28px,3vw,38px)] leading-tight font-black text-[#111318]">
                Our Mission
              </h2>
              <p className="m-0 max-w-[430px] text-base leading-[1.75] text-[#343840]">
                To serve high quality hygienic and delicious food at affordable
                prices with a great customer experience.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg bg-[#1b110d]">
              <img
                className="block aspect-[1.7] h-full w-full object-cover"
                src={foodHero}
                alt="SVS Food burger and fries"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
