const productsa = [
  {
    name: 'Sony Playstation 5',
    url: 'https://i.ibb.co/zHmZnWx/playstation-5.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'https://i.ibb.co/rFFMDH7/samsung-galaxy.png',
    category: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'https://i.ibb.co/mhm1hLq/cannon-eos-camera.png',
    category: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'https://i.ibb.co/LS9TDLN/sony-a7-camera.png',
    category: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'https://i.ibb.co/QHgFnHk/lg-tv.png',
    category: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'https://i.ibb.co/L0L9SdG/nintendo-switch.png',
    category: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'https://i.ibb.co/C8rBVdT/xbox-series-x.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'https://i.ibb.co/Pj1nm4B/samsung-tv.png',
    category: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'https://i.ibb.co/5F58zmH/google-pixel.png',
    category: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'https://i.ibb.co/5Wy3RZ9/sony-zv1f-camera.png',
    category: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'https://i.ibb.co/FxM6rXq/toshiba-tv.png',
    category: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'https://i.ibb.co/5vc7J6s/iphone-14.png',
    category: 'smartphones',
    price: 999.99,
  },
];

 

  let products = [];

  const apiUrl = 'https://fakestoreapi.com/products';

  function fetchData(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Store the fetched data in the global variable
            products = data;
            //console.log('Data fetched and stored in global variable:', products);
            if (callback) {
                callback(products);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}



 
// // Example to check globalData after a delay
// setTimeout(() => {
//     console.log('Data available after some time:', products);
// }, 2000);
 

// Get DOM elements
const productsWrapper = document.getElementById('products-wrapper');
const checkboxes = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const sortSelect = document.getElementById('sortSelect');

// Initialize cart item count
let cartItemCount = 0;

// Initialize products
const productElements = [];
const categoryElements = [];

fetchData(apiUrl, (data) => {
  data.forEach((product) => {
    const productElement = createProductElement(product);
    productElements.push(productElement);
    productsWrapper.appendChild(productElement);
  });


  
  const addedCategories = new Set();

  data.forEach((product) => {
  if (!addedCategories.has(product.category)) {
    const categoryElement = createCategoryElement(product.category);
    categoryElements.push(categoryElement);
    filtersContainer.appendChild(categoryElement);
    addedCategories.add(product.category);
  }
    });

  

      sortSelect.addEventListener('change', sortProducts);

  function sortProducts(event) {
  const sortOrder = event.target.value;

  const sortedProducts = [...data].sort((a, b) => {
  if (sortOrder === 'lowToHigh') {
    return a.price - b.price;
  } else if (sortOrder === 'highToLow') {
    return b.price - a.price;
  }
  });

  products = sortedProducts

  }
  
});






// Loop over the products and create the product elements


// Add filter event listeners
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Create product element
function createProductElement(product) {
  const productElement = document.createElement('div');

  productElement.className = 'item space-y-2';

  productElement.innerHTML = `<div
  class="bg-slate-50 flex justify-center relative overflow-hidden group cursor-pointer border rounded-md p-4  min-h-60 max-h-60"
>
  <img
    src="${product.image}"
    alt="${product.title}"
    class=" object-contain"
  />
  <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
    >Add To Cart</button
  >
</div>
<p class="text-xl">${product.title.substring(0,16) + "..."}</p>
<strong>$${product.price.toLocaleString()}</strong>
<div class="mt-5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg></div>`;

  productElement
    .querySelector('.status')
    .addEventListener('click', updateCart);

  return productElement;
}

// Toggle add/remove from cart
function updateCart(e) {
  const statusEl = e.target;

  if (statusEl.classList.contains('added')) {
    // Remove from cart
    statusEl.classList.remove('added');
    statusEl.innerText = 'Add To Cart';
    statusEl.classList.remove('bg-red-600');
    statusEl.classList.add('bg-gray-800');

    cartItemCount--;
  } else {
    // Add to cart
    statusEl.classList.add('added');
    statusEl.innerText = 'Remove From Cart';
    statusEl.classList.remove('bg-gray-800');
    statusEl.classList.add('bg-red-600');

    cartItemCount++;
  }

  // Update cart item count
  cartCount.innerText = cartItemCount.toString();
}

// Filter products by search or checkbox
function filterProducts() {
  // Get search term
  const searchTerm = searchInput.value.trim().toLowerCase();
  // Get checked categories
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const checkedCategories = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id);


  // Loop over products and check for matches
  productElements.forEach((productElement, index) => {
    const product = products[index];

    // Check to see if product matches the search or checked items
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm);
    const isInCheckedCategory =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.category);

    // Show or hide product based on matches
    if (matchesSearchTerm && isInCheckedCategory) {
      productElement.classList.remove('hidden');
    } else {
      productElement.classList.add('hidden');
    }
  });
}

function createCategoryElement(category) {
  const categoryElementStructure = document.createElement('div');

  categoryElementStructure.className = 'item space-y-2';

  categoryElementStructure.innerHTML = `
  <div class="">
  <input type="checkbox" class="check" id="${category}" />
  ${category}
  </div>
`;

  return categoryElementStructure;
}

function createSortElement(category) {
  const sortElementStructure = document.createElement('<select id="sortSelect">');

  sortElementStructure.className = 'item space-y-2';

  sortElementStructure.innerHTML = `
  <option value="lowToHigh">Low to High</option>
    <option value="highToLow">High to Low</option>
`;

  return sortElementStructure;
}

