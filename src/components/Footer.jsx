import { FaApple, FaGooglePlay, FaYoutube } from 'react-icons/fa'
import { FiFacebook, FiInstagram, FiPlay, FiTwitter } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import logo from '../assets/white-logo.png'

const footerGroups = [
  {
    title: 'Company',
    links: ['About Us', 'Our Outlets', 'Careers', 'Franchise', 'Blog'],
  },
  {
    title: 'Customer Service',
    links: [
      'Contact Us',
      'FAQs',
      'Order Online',
      'Track Order',
      'Refund & Cancellation',
    ],
  },
  {
    title: 'Policies',
    links: [
      'Privacy Policy',
      'Terms & Conditions',
      'Shipping Policy',
      'Return Policy',
      'Cookie Policy',
    ],
  },
]

const socialLinks = [
  { label: 'Facebook', icon: FiFacebook },
  { label: 'Instagram', icon: FiInstagram },
  { label: 'YouTube', icon: FaYoutube },
  { label: 'X', icon: FiTwitter },
]

function footerPath(label) {
  return `/${label.toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-')}`
}

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#f1f0f4] to-[#fff8f3] px-6 pt-12 pb-14 max-[720px]:px-4 max-[720px]:pt-8 max-[720px]:pb-10">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-lg border border-[var(--color-primary-border)] bg-[var(--color-primary)] text-white shadow-[0_20px_42px_rgb(var(--color-primary-shadow)_/_24%)]">
        <div className="grid grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(130px,0.8fr))_minmax(180px,1fr)] gap-11 px-14 pt-[34px] pb-[30px] max-[1080px]:grid-cols-[1.4fr_1fr_1fr] max-[720px]:grid-cols-1 max-[720px]:gap-7 max-[720px]:p-7 max-[720px]:px-[22px]">
          <div>
            <img
              className="mb-4 block h-[62px] p-2 object-contain"
              src={logo}
              alt="SVS Food"
            />
            <p className="m-0 mb-2 text-sm leading-normal text-white/85">
              Delicious food, delivered fast to your doorstep.
            </p>
            <p className="m-0 mb-2 text-sm leading-normal text-white/85">
              100% Pure Veg.
            </p>
            <div className="mt-[22px] flex gap-3">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white no-underline transition hover:border-white hover:bg-white hover:text-[var(--color-primary)]"
                  href="/"
                  aria-label={label}
                  key={label}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <nav className="flex flex-col gap-3" key={group.title}>
              <h2 className="m-0 mb-1.5 text-base leading-tight font-bold uppercase text-white">
                {group.title}
              </h2>
              {group.links.map((link) => (
                <Link
                  className="text-sm text-white/85 no-underline transition hover:text-white"
                  key={link}
                  to={footerPath(link)}
                >
                  {link}
                </Link>
              ))}
            </nav>
          ))}

          <div className="flex flex-col gap-3 max-[1080px]:col-span-2 max-[720px]:col-auto">
            <h2 className="m-0 mb-1.5 text-base leading-tight font-bold uppercase text-white">
              Download Our App
            </h2>
            <a
              className="inline-flex min-h-12 items-center gap-2.5 rounded-[7px] border border-white/55 bg-white/10 px-[13px] py-1.5 text-white no-underline transition hover:-translate-y-px hover:border-white hover:bg-white hover:text-[var(--color-primary)]"
              href="/"
            >
              <FaGooglePlay
                className="h-6 w-6"
                aria-hidden="true"
              />
              <span className="grid text-[10px] leading-tight uppercase">
                Get it on
                <strong className="text-[19px] leading-tight normal-case">
                  Google Play
                </strong>
              </span>
            </a>
            <a
              className="inline-flex min-h-12 items-center gap-2.5 rounded-[7px] border border-white/55 bg-white/10 px-[13px] py-1.5 text-white no-underline transition hover:-translate-y-px hover:border-white hover:bg-white hover:text-[var(--color-primary)]"
              href="/"
            >
              <FaApple
                className="h-6 w-6"
                aria-hidden="true"
              />
              <span className="grid text-[10px] leading-tight uppercase">
                Download on the
                <strong className="text-[19px] leading-tight normal-case">
                  App Store
                </strong>
              </span>
            </a>
          </div>
        </div>

        <div className="flex min-h-[52px] items-center justify-between border-t border-white/20 px-14 text-white/85 max-[720px]:items-start max-[720px]:gap-4 max-[720px]:px-[22px] max-[720px]:py-[18px]">
          <p className="m-0 text-[13px] font-bold">
            &copy; 2024 SVS Food. All rights reserved.
          </p>
          <FiPlay
            className="h-5 w-5 -rotate-45 text-white"
            aria-hidden="true"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
