import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

const contactDetails = [
  {
    icon: FiPhone,
    title: 'Customer Care',
    lines: ['+91 98765 43210'],
  },
  {
    icon: FiMail,
    title: 'Email',
    lines: ['hello@svsfood.com'],
  },
  {
    icon: FiMapPin,
    title: 'Head Office',
    lines: ['SVS Food Pvt. Ltd.', '123, Food Street, Taste Delhi - 110094'],
  },
]

const socialLinks = [
  {
    label: 'Facebook',
    icon: FaFacebookF,
    className: 'bg-[#4267b2]',
  },
  {
    label: 'Instagram',
    icon: FaInstagram,
    className:
      'bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_12%,#fd5949_42%,#d6249f_65%,#285aeb_100%)]',
  },
  {
    label: 'YouTube',
    icon: FaYoutube,
    className: 'bg-[#ff0000]',
  },
  {
    label: 'Twitter',
    icon: FaTwitter,
    className: 'bg-[#1da1f2]',
  },
]

const inputClass =
  'h-12 w-full rounded-md border border-[#dde2e8] bg-white px-4 text-sm text-[#26313d] outline-none transition placeholder:text-[#858f9b] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-orange-100'

function ContactPage() {
  return (
    <main className="bg-[var(--color-page-bg)] px-6 py-12 text-[#111318] max-[720px]:px-4">
      <section className="mx-auto max-w-[1120px]">
        <div className="mb-8">
          <h1 className="m-0 text-[clamp(34px,4.2vw,54px)] leading-none font-black tracking-normal">
            Contact Us
          </h1>
          <p className="mt-4 mb-0 text-xl font-medium text-[#3f4650] max-[560px]:text-base">
            We're here to help you!
          </p>
        </div>

        <div className="grid grid-cols-[1.05fr_1fr] items-start gap-8 max-[860px]:grid-cols-1">
          <div>
            <div className="rounded-lg border border-[#dde2e8] bg-white p-6 shadow-[0_14px_36px_rgb(17_19_24_/_5%)] max-[560px]:p-5">
              <div className="grid gap-9">
                {contactDetails.map(({ icon: Icon, title, lines }) => (
                  <article className="grid grid-cols-[34px_1fr] gap-5" key={title}>
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center text-[25px] text-[#1f2329]">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="m-0 text-base leading-tight font-black text-[#161a20]">
                        {title}
                      </h2>
                      <div className="mt-3 grid gap-1">
                        {lines.map((line) => (
                          <p
                            className="m-0 text-sm leading-[1.55] font-medium text-[#343b45]"
                            key={line}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="m-0 text-lg font-black text-[#15191f]">Follow Us</h2>
              <div className="mt-5 flex flex-wrap gap-6">
                {socialLinks.map(({ className, icon: Icon, label }) => (
                  <a
                    aria-label={label}
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-full text-3xl text-white no-underline shadow-[0_10px_24px_rgb(17_19_24_/_16%)] transition hover:-translate-y-0.5 ${className}`}
                    href="/"
                    key={label}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="rounded-lg border border-[#dde2e8] bg-white p-6 shadow-[0_14px_36px_rgb(17_19_24_/_5%)] max-[560px]:p-5">
            <h2 className="m-0 mb-6 text-base leading-tight font-black text-[#15191f]">
              Send us a message
            </h2>
            <div className="grid gap-5">
              <label className="sr-only" htmlFor="contact-name">
                Your Name
              </label>
              <input
                className={inputClass}
                id="contact-name"
                name="name"
                placeholder="Your Name"
                type="text"
              />

              <label className="sr-only" htmlFor="contact-email">
                Email Address
              </label>
              <input
                className={inputClass}
                id="contact-email"
                name="email"
                placeholder="Email Address"
                type="email"
              />

              <label className="sr-only" htmlFor="contact-phone">
                Phone Number
              </label>
              <input
                className={inputClass}
                id="contact-phone"
                name="phone"
                placeholder="Phone Number"
                type="tel"
              />

              <label className="sr-only" htmlFor="contact-message">
                Message
              </label>
              <textarea
                className={`${inputClass} min-h-[230px] resize-y py-4`}
                id="contact-message"
                name="message"
                placeholder="Message"
              />

              <button
                className="mt-4 h-16 cursor-pointer rounded-full border-0 bg-[var(--color-primary)] px-8 text-base font-black text-white shadow-[0_14px_26px_rgb(var(--color-primary-shadow)_/_28%)] transition hover:-translate-y-0.5 hover:bg-[#e95b23] focus:outline-none focus:ring-4 focus:ring-orange-200"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
