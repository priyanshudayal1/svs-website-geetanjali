const CDN_BASE = 'https://cdn.uengage.io/uploads/6442/'

export function menuImage(fileName) {
  return `${CDN_BASE}${fileName}`
}

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const menuCategories = [
  {
    name: 'Burgers',
    slug: 'burgers',
    image: menuImage('image-7681-1777654872.jpeg'),
    items: [
      {
        name: 'Supreme Burger',
        description: 'Cheesy burger with tom mayo sauce',
        price: 90,
        rating: 4.3,
        image: menuImage('image-9735-1780231005.jpeg'),
        spicy: 'Mild',
      },
      {
        name: 'Vadapav Burger',
        description: 'Mumbai special vadapav with a burger twist',
        price: 70,
        rating: 4.3,
        image: menuImage('image-6987-1780231023.jpg'),
        spicy: 'Medium',
      },
      {
        name: 'Paneer Herbinaro Burger',
        description: 'Paneer patty with jalapenos, onion, tomato and herbs',
        price: 160,
        rating: 4,
        image: menuImage('image-1523-1780230923.jpeg'),
        spicy: 'Hot',
      },
      {
        name: 'Fusion Paneer Burger',
        description: 'Spicy tangy fusion with crispy paneer potato patty',
        price: 140,
        rating: 5,
        image: menuImage('image-8699-1780230943.jpeg'),
        spicy: 'Medium',
      },
      {
        name: 'Chilli Avocado Burger',
        description: 'Creamy avocado spread with a fiery kick',
        price: 140,
        rating: 5,
        image: menuImage('image-1422-1780230946.jpeg'),
        spicy: 'Hot',
      },
      {
        name: 'Jain Maharaja Burger',
        description: 'Prepared without onion and garlic',
        price: 160,
        rating: 4.2,
        image: menuImage('image-7456-1780230920.jpg'),
        jain: true,
        spicy: 'Mild',
      },
    ],
  },
  {
    name: 'Naan & Rolls',
    slug: 'naan-rolls',
    image: menuImage('image-2783-1778081496.jpeg'),
    items: [
      {
        name: 'Paneer Wraproll',
        description: 'Filled with paneer masala and veggies',
        price: 100,
        rating: 4,
        image: menuImage('image-4933-1780230999.jpg'),
        spicy: 'Medium',
      },
      {
        name: 'Crispy Wraproll',
        description: 'Filled with aloo masala and veggies',
        price: 80,
        rating: 4.3,
        image: menuImage('image-5638-1780231019.jpg'),
        spicy: 'Mild',
      },
      {
        name: 'Cheese Chatpata Naan',
        description: 'Crunchy naan with cheesy masala and Mexican sauce',
        price: 80,
        rating: 4.5,
        image: menuImage('image-8685-1780231016.jpeg'),
        spicy: 'Medium',
      },
      {
        name: 'Chatpata Naan',
        description: 'Crunchy naan with special masala and Mexican sauce',
        price: 60,
        rating: 4.4,
        image: menuImage('image-5233-1780231026.jpeg'),
        spicy: 'Medium',
      },
      {
        name: 'Jain Wraproll',
        description: 'A chatpata Jain roll packed with flavor',
        price: 120,
        rating: 4.1,
        image: menuImage('image-1923-1780230978.jpg'),
        jain: true,
        spicy: 'Mild',
      },
    ],
  },
  {
    name: 'Sides',
    slug: 'sides',
    image: menuImage('image-3621-1778081487.jpg'),
    items: [
      {
        name: 'Peri Peri Fries',
        description: 'Crispy fries assorted with spicy herbs',
        price: 100,
        rating: 4.4,
        image: menuImage('image-8167-1780231002.jpg'),
        spicy: 'Hot',
      },
      {
        name: 'Salted Fries',
        description: 'Crispy fries with savoury Himalayan salt',
        price: 90,
        rating: 4.3,
        image: menuImage('image-8821-1780231009.jpg'),
        spicy: 'Mild',
      },
      {
        name: 'Dressing Fries',
        description: 'Crispy fries with cheesy, creamy toppings',
        price: 140,
        rating: 4,
        image: menuImage('image-5748-1780230930.jpg'),
        spicy: 'Medium',
      },
      {
        name: 'Veggie Sticks 6pc',
        description: 'Crispy veggie sticks',
        price: 120,
        rating: 4,
        image: menuImage('image-5122-1780230967.png'),
        spicy: 'Mild',
      },
      {
        name: 'Spring Rolls 5pc',
        description: 'Crunchy rolls with veg filling',
        price: 120,
        rating: 5,
        image: menuImage('image-5142-1780230964.jpg'),
        spicy: 'Medium',
      },
      {
        name: 'Cheesy Rounders 8pc',
        description: 'Loaded with cheese and corn goodness',
        price: 120,
        rating: 5,
        image: menuImage('image-5863-1780230953.jpg'),
        spicy: 'Mild',
      },
    ],
  },
  {
    name: 'Beverages',
    slug: 'beverages',
    image: menuImage('image-3815-1778145434.jpg'),
    items: [
      {
        name: 'Spicy Lemonade',
        description: 'Tangy lemon drink with a spicy kick',
        price: 140,
        rating: 4,
        image: menuImage('image-2255-1780230927.jpg'),
        spicy: 'Medium',
      },
      {
        name: 'Virgin Mojito',
        description: 'Fresh mint, zesty lime and a sparkling twist',
        price: 140,
        rating: 4.5,
        image: menuImage('image-9222-1780230933.jpg'),
        spicy: 'Mild',
      },
    ],
  },
  {
    name: 'Taste Maker Dips',
    slug: 'taste-maker-dips',
    image: menuImage('image-1596-1778145412.jpg'),
    items: [
      {
        name: 'Chilli Garlic Dip',
        description: 'Spicy and full of garlic flavor',
        price: 20,
        rating: 4.5,
        image: menuImage('image-1859-1780231039.png'),
        spicy: 'Hot',
      },
      {
        name: 'Liquid Cheese',
        description: 'Cheesy, creamy and irresistibly smooth',
        price: 20,
        rating: 4,
        image: menuImage('image-5167-1780231043.jpg'),
        spicy: 'Mild',
      },
      {
        name: 'Mayo Dip',
        description: 'Velvety mayo with a classic tang',
        price: 20,
        rating: 4.3,
        image: menuImage('image-4344-1780231046.jpg'),
        spicy: 'Mild',
      },
      {
        name: 'Burger Sauce',
        description: 'Sweet, tangy and irresistibly creamy',
        price: 20,
        rating: 4.5,
        image: menuImage('image-6423-1780231049.jpg'),
        spicy: 'Mild',
      },
    ],
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    image: menuImage('image-1383-1778145403.jpg'),
    items: [
      {
        name: 'Strawberry Malai Cake',
        description: 'Cake with malai and fruit jam',
        price: 59,
        rating: 4.5,
        image: menuImage('image-2962-1780231036.jpg'),
        spicy: 'Mild',
      },
      {
        name: 'Mango Malai Cake',
        description: 'Cake with malai and mango pulp',
        price: 59,
        rating: 4.2,
        image: menuImage('image-4337-1780231033.jpg'),
        spicy: 'Mild',
      },
      {
        name: 'Blueberry Malai Cake',
        description: 'Cake with malai and blueberry pulp',
        price: 59,
        rating: 4.1,
        image: menuImage('image-1815-1780231030.png'),
        spicy: 'Mild',
      },
    ],
  },
  {
    name: 'Party Combos',
    slug: 'party-combos',
    image: menuImage('image-4592-1778145306.jpg'),
    items: [
      {
        name: 'Burger + Fries + Beverage + Malai Cake',
        description: 'Complete party combo with dessert',
        price: 199,
        rating: 4.4,
        image: menuImage('image-3797-1780230907.jpg'),
        spicy: 'Medium',
      },
      {
        name: 'Wraproll + Beverage',
        description: 'Wraproll with a refreshing drink',
        price: 179,
        rating: 4,
        image: menuImage('image-9147-1780230914.jpg'),
        spicy: 'Medium',
      },
      {
        name: 'Naan + Beverage',
        description: 'Naan with a refreshing drink',
        price: 169,
        rating: 4,
        image: menuImage('image-7329-1780230917.jpg'),
        spicy: 'Mild',
      },
    ],
  },
]

export const allMenuItems = menuCategories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    category: category.name,
    categorySlug: category.slug,
    slug: `${category.slug}-${slugify(item.name)}`,
  })),
)
