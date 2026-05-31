import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const DELIVERY_FEE = 40
const PACKAGING_FEE = 20
const DISCOUNT = 40

function CartPage({ cartItems, updateCartQuantity, removeFromCart }) {
  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const hasItems = cartItems.length > 0
  const deliveryFee = hasItems ? DELIVERY_FEE : 0
  const packagingFee = hasItems ? PACKAGING_FEE : 0
  const discount = hasItems ? Math.min(DISCOUNT, itemTotal + deliveryFee + packagingFee) : 0
  const totalAmount = Math.max(0, itemTotal + deliveryFee + packagingFee - discount)

  return (
    <main className="bg-[var(--color-page-bg)] px-6 py-10 text-[#15181d] max-[720px]:px-4">
      <section className="mx-auto max-w-[1120px]">
        <h1 className="m-0 mb-8 text-[clamp(34px,4vw,48px)] leading-none font-black">
          Your Cart
        </h1>

        {hasItems ? (
          <div className="grid grid-cols-[minmax(0,1fr)_360px] items-start gap-6 max-[940px]:grid-cols-1">
            <section className="grid gap-0 overflow-hidden rounded-lg border border-[#dedede] bg-white">
              {cartItems.map((item) => (
                <article
                  className="grid min-h-[164px] grid-cols-[150px_1fr_auto] items-center gap-5 border-b border-[#dedede] px-6 py-5 last:border-b-0 max-[640px]:grid-cols-[100px_1fr] max-[640px]:gap-4 max-[640px]:px-4"
                  key={item.id}
                >
                  <img
                    className="h-[118px] w-[138px] object-contain max-[640px]:h-[92px] max-[640px]:w-[96px]"
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="min-w-0">
                    <h2 className="m-0 text-lg leading-tight font-black max-[640px]:text-base">
                      {item.name}
                    </h2>
                    <strong className="mt-4 block text-lg font-black max-[640px]:mt-2">
                      &#8377;{item.price}
                    </strong>
                    {(item.size && item.size !== 'Regular') || item.addOns.length ? (
                      <p className="mt-2 mb-0 text-xs font-semibold text-[#747980]">
                        {[item.size !== 'Regular' ? item.size : null, ...item.addOns]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    ) : null}
                  </div>

                  <div className="grid justify-items-end gap-8 max-[640px]:col-span-2 max-[640px]:grid-cols-[auto_1fr] max-[640px]:items-center max-[640px]:gap-4">
                    <button
                      className="cursor-pointer border-0 bg-transparent p-0 text-[24px] text-[#ff3f20] max-[640px]:justify-self-start"
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FiTrash2 aria-hidden="true" />
                    </button>

                    <div className="grid h-12 w-[144px] grid-cols-3 overflow-hidden rounded-lg border border-[#dedede] bg-white">
                      <button
                        className="grid cursor-pointer place-items-center border-0 bg-white text-lg text-[#101318]"
                        type="button"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      >
                        <FiMinus aria-hidden="true" />
                      </button>
                      <span className="grid place-items-center text-lg font-bold">
                        {item.quantity}
                      </span>
                      <button
                        className="grid cursor-pointer place-items-center border-0 bg-white text-lg text-[#101318]"
                        type="button"
                        aria-label={`Increase ${item.name}`}
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      >
                        <FiPlus aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-lg border border-[#dedede] bg-white p-8 shadow-[0_10px_28px_rgb(17_19_24_/_4%)] max-[640px]:p-5">
              <h2 className="m-0 mb-8 text-xl font-black">Bill Summary</h2>

              <div className="grid gap-5 text-base font-semibold">
                <div className="flex items-center justify-between gap-5">
                  <span>Item Total</span>
                  <span>&#8377;{itemTotal}</span>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <span>Delivery Fee</span>
                  <span>&#8377;{deliveryFee}</span>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <span>Packaging Fee</span>
                  <span>&#8377;{packagingFee}</span>
                </div>
                <div className="flex items-center justify-between gap-5 text-[#1f8f49]">
                  <span>Discount (SVS20)</span>
                  <span>-&#8377;{discount}</span>
                </div>
              </div>

              <div className="mt-9 flex items-center justify-between gap-5 border-t border-[#e0e0e0] pt-8 text-xl font-black">
                <span>Total Amount</span>
                <span>&#8377;{totalAmount}</span>
              </div>

              <Link
                className="mt-10 inline-flex h-16 w-full items-center justify-center rounded-[8px] bg-[#ff3f16] px-6 text-lg font-black text-white no-underline shadow-[0_14px_26px_rgb(255_63_22_/_24%)] transition hover:bg-[#e93613]"
                to="/checkout"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        ) : (
          <div className="grid min-h-[360px] place-items-center rounded-lg border border-dashed border-[#dedede] bg-[#fffaf7] p-8 text-center">
            <div>
              <FiShoppingBag className="mx-auto mb-4 text-5xl text-[var(--color-primary)]" />
              <h2 className="m-0 text-2xl font-black">Your cart is empty</h2>
              <p className="mx-auto mt-3 mb-7 max-w-[360px] text-sm leading-[1.6] font-semibold text-[#696f77]">
                Add your favourite SVS Food items and they will appear here.
              </p>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[#ff3f16] px-7 text-sm font-black text-white no-underline"
                to="/order"
              >
                Add Items
              </Link>
            </div>
          </div>
        )}

        {hasItems ? (
          <div className="mt-8 flex justify-center">
            <Link
              className="inline-flex min-h-14 items-center gap-3 rounded-[8px] border border-[#dedede] bg-white px-8 text-lg font-black text-[#15181d] no-underline transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              to="/order"
            >
              <FiPlus aria-hidden="true" />
              Add more items
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default CartPage
