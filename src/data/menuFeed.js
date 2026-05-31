import { menuCategories as fallbackMenuCategories, menuImage, slugify } from './menuData'

export const BUSINESS_ID = '6808'
export const BUSINESS_SLUG = 'svs-food-narmada-road-jabalpur'
export const SET_COOKIES_ENDPOINT = 'https://svsfood.com/client/setCookies'
export const FEED_ENDPOINT = `https://menu-feed.uengage.in/feed/v2/feed_${BUSINESS_ID}.json`

const spiceByName = [
  { words: ['chilli', 'spicy', 'peri peri', 'chatpata', 'mexican'], value: 'Hot' },
  { words: ['tandoori', 'schezwan', 'masala', 'vadapav'], value: 'Medium' },
]

export const fallbackAllMenuItems = flattenCategories(fallbackMenuCategories)

export function flattenCategories(categories) {
  return categories.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.name,
      categorySlug: category.slug,
      slug: item.slug || `${category.slug}-${slugify(item.name)}`,
    })),
  )
}

function toNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function titleCase(value) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function inferSpice(item) {
  const value = `${item.itemName || ''} ${item.description || ''}`.toLowerCase()
  return spiceByName.find((entry) => entry.words.some((word) => value.includes(word)))?.value || 'Mild'
}

function normalizeMenuItem(item, category) {
  const name = item.itemName || 'Menu item'
  const itemSlug = item.itemSlug || slugify(name)

  return {
    id: item.id || item.feed_Id || `${category.slug}-${itemSlug}`,
    name,
    description: item.description || category.name,
    price: toNumber(item.sp || item.mrp),
    rating: toNumber(item.avgRating, 4.3),
    image: item.image ? menuImage(item.image) : category.image,
    spicy: inferSpice(item),
    category: category.name,
    categorySlug: category.slug,
    slug: `${category.slug}-${itemSlug}`,
    outOfStock: item.out_of_stock === '1',
    veg: item.vegNonvegBoth !== 'non-veg',
    raw: item,
  }
}

function normalizeSection(section) {
  const name = titleCase(section.sectionName || 'Menu')
  const category = {
    name,
    slug: slugify(section.sectionName || name),
    image: section.image ? menuImage(section.image) : menuImage('image-7681-1777654872.jpeg'),
    items: [],
  }

  category.items = (section.items || [])
    .flatMap((item) => {
      if (Array.isArray(item.variants) && item.variants.length) {
        return item.variants
      }

      return item.type === '0' || toNumber(item.sp || item.mrp) > 0 ? [item] : []
    })
    .filter((item) => item.status !== '0')
    .map((item) => normalizeMenuItem(item, category))

  return category
}

export function normalizeFeed(feed) {
  const sections = feed?.rows?.menu

  if (!Array.isArray(sections)) {
    return fallbackMenuCategories
  }

  const categories = sections.map(normalizeSection).filter((category) => category.items.length)
  return categories.length ? categories : fallbackMenuCategories
}

export async function setMenuCookies() {
  const body = new URLSearchParams({
    view_business: BUSINESS_ID,
    slug: BUSINESS_SLUG,
    view_locality: 'Narmada Road',
    view_outlet: 'Jabalpur',
  })

  const response = await fetch(SET_COOKIES_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body,
  })

  if (!response.ok) {
    throw new Error(`Cookie request failed with ${response.status}`)
  }

  return response.json()
}

export async function fetchMenuFeed() {
  const response = await fetch(`${FEED_ENDPOINT}?nocache=${Date.now()}`, {
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
    },
  })

  if (!response.ok) {
    throw new Error(`Menu feed request failed with ${response.status}`)
  }

  return response.json()
}
