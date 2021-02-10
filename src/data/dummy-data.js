import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'pulse',
    'u1',
    'ketchup',
    'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/24171453/ING-ketchup-main.jpg',
    'A red t-shirt, perfect for days with non-red weather.',
    29.99,
  ),
  new Product(
    'Atta & Other floure',
    'u1',
    'Amul Butter',
    'https://www.bigbasket.com/media/uploads/p/l/40045943_1-amul-butter-pasteurized.jpg',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    99.99,
  ),
  new Product(
    'Rice & Other Floure',
    'u2',
    'Shampoo',
    'https://cdn2.stylecraze.com/wp-content/uploads/2018/11/10-Best-Drugstore-Shampoos-To-Buy-In-2018.jpg',
    'Can also be used for tea!',
    8.99,
  ),
  new Product(
    'Dry Fruits & Other Nuts',
    'u3',
    'Aashirvaad Atta',
    'https://www.hi5mart.com/image/cache/catalog/Grocery%20Staples/Flour/Aashirvaad%205kg-750x750.jpg',
    "What the content is? Why would that matter? It's a limited edition!",
    15.99,
  ),
  new Product(
    'Garam Masala',
    'u3',
    'Garam Masala',
    'https://www.hi5mart.com/image/cache/catalog/spices/Mdh%20Masala%20-%20Garam,%20100%20gm%20Carton-750x750.png',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    2299.99,
  ),
  new Product(
    'Coca Cola',
    'u1',
    'Coca Cola',
    'https://www.theimpulsivebuy.com/wordpress/wp-content/uploads/2019/10/Coca-Cola-Cinnamon.jpeg',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    5.49,
  ),
];

export default PRODUCTS;
