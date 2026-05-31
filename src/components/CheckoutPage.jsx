import { FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const DELIVERY_FEE = 40
const PACKAGING_FEE = 20
const DISCOUNT = 40

function CheckoutPage({ cartItems }) {
  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const hasItems = cartItems.length > 0
  const deliveryFee = hasItems ? DELIVERY_FEE : 0
  const packagingFee = hasItems ? PACKAGING_FEE : 0
  const discount = hasItems
    ? Math.min(DISCOUNT, itemTotal + deliveryFee + packagingFee)
    : 0
  const totalAmount = Math.max(
    0,
    itemTotal + deliveryFee + packagingFee - discount,
  )

  if (!hasItems) {
    return (
      <main className="bg-[var(--color-page-bg)] px-6 py-10 text-[#15181d] max-[720px]:px-4">
        <section className="mx-auto max-w-[1120px]">
          <h1 className="m-0 mb-8 text-[clamp(34px,4vw,48px)] leading-none font-black">
            Checkout
          </h1>
          <div className="grid min-h-[360px] place-items-center rounded-lg border border-dashed border-[#dedede] bg-[#fffaf7] p-8 text-center">
            <div>
              <FiShoppingBag className="mx-auto mb-4 text-5xl text-[var(--color-primary)]" />
              <h2 className="m-0 text-2xl font-black">Your cart is empty</h2>
              <p className="mx-auto mt-3 mb-7 max-w-[360px] text-sm leading-[1.6] font-semibold text-[#696f77]">
                Add your favourite SVS Food items before checking out.
              </p>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[#ff3f16] px-7 text-sm font-black text-white no-underline"
                to="/order"
              >
                Add Items
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-[var(--color-page-bg)] px-6 py-10 text-[#15181d] max-[720px]:px-4">
      <section className="mx-auto max-w-[1120px]">
        <h1 className="m-0 mb-8 text-[clamp(34px,4vw,48px)] leading-none font-black">
          Checkout
        </h1>

        <div className="grid grid-cols-[minmax(0,1fr)_360px] items-start gap-6 max-[940px]:grid-cols-1">
          <div className="grid gap-6">
            <section className="rounded-lg border border-[#dedede] bg-white p-8 shadow-[0_10px_28px_rgb(17_19_24_/_4%)] max-[640px]:p-5">
              <h2 className="m-0 mb-8 text-xl font-black">Delivery Address</h2>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="m-0 mb-4 text-base font-black">Home</h3>
                  <p className="m-0 mb-3 text-base font-semibold leading-[1.45]">
                    123, Green Park, New Delhi - 110016
                  </p>
                  <p className="m-0 text-base font-semibold">+91 98765 43210</p>
                </div>
                <button
                  className="cursor-pointer border-0 bg-transparent p-0 text-sm font-black text-[#ff3f16]"
                  type="button"
                >
                  Change
                </button>
              </div>
            </section>

            <section className="rounded-lg border border-[#dedede] bg-white p-8 shadow-[0_10px_28px_rgb(17_19_24_/_4%)] max-[640px]:p-5">
              <h2 className="m-0 mb-8 text-xl font-black">Payment Method</h2>
              <div className="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
                {['UPI', 'Credit / Debit Card', 'Cash on Delivery'].map(
                  (method, index) => (
                    <label
                      className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border bg-white px-4 text-sm font-semibold ${
                        index === 0
                          ? 'border-[#ff3f16] text-[#15181d]'
                          : 'border-[#dedede]'
                      }`}
                      key={method}
                    >
                      <input
                        className="h-4 w-4 accent-[#ff3f16]"
                        type="radio"
                        name="paymentMethod"
                        defaultChecked={index === 0}
                      />
                      <span>{method}</span>
                    </label>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-lg border border-[#dedede] bg-white p-8 shadow-[0_10px_28px_rgb(17_19_24_/_4%)] max-[640px]:p-5">
              <h2 className="m-0 mb-8 text-xl font-black">Add Promo Code</h2>
              <div className="grid grid-cols-[minmax(0,1fr)_140px] gap-5 max-[560px]:grid-cols-1">
                <input
                  className="h-16 rounded-lg border border-[#dedede] bg-white px-5 text-base font-semibold outline-none transition placeholder:text-[#6f747b] focus:border-[#ff3f16]"
                  type="text"
                  placeholder="Enter code"
                />
                <button
                  className="h-16 cursor-pointer rounded-[8px] border-0 bg-[#333] px-6 text-lg font-black text-white shadow-[0_12px_22px_rgb(0_0_0_/_18%)] transition hover:bg-[#1f1f1f]"
                  type="button"
                >
                  Apply
                </button>
              </div>
            </section>
          </div>

          <aside className="rounded-lg border border-[#dedede] bg-white p-8 shadow-[0_10px_28px_rgb(17_19_24_/_4%)] max-[640px]:p-5">
            <h2 className="m-0 mb-8 text-xl font-black">Order Summary</h2>

            <div className="grid gap-5 border-b border-[#e0e0e0] pb-8 text-base font-semibold">
              {cartItems.map((item) => (
                <div className="flex items-start justify-between gap-5" key={item.id}>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-black">&#8377;{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-5 border-b border-[#e0e0e0] py-8 text-base font-semibold">
              <div className="flex items-center justify-between gap-5">
                <span>Item Total</span>
                <span className="font-black">&#8377;{itemTotal}</span>
              </div>
              <div className="flex items-center justify-between gap-5">
                <span>Delivery Fee</span>
                <span className="font-black">&#8377;{deliveryFee}</span>
              </div>
              <div className="flex items-center justify-between gap-5">
                <span>Packaging Fee</span>
                <span className="font-black">&#8377;{packagingFee}</span>
              </div>
              <div className="flex items-center justify-between gap-5">
                <span>Discount</span>
                <span className="font-black">-&#8377;{discount}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 pt-8 text-xl font-black">
              <span>Total Amount</span>
              <span>&#8377;{totalAmount}</span>
            </div>

            <button
              className="mt-10 h-16 w-full cursor-pointer rounded-[8px] border-0 bg-[#ff3f16] px-6 text-lg font-black text-white shadow-[0_14px_26px_rgb(255_63_22_/_24%)] transition hover:bg-[#e93613]"
              type="button"
            >
              Place Order
            </button>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default CheckoutPage
