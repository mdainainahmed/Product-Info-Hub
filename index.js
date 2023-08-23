let productData;

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    productData = data; 
  });

let products;

setTimeout(() => {
  products = [...productData.products];

  const productCard = document.getElementById("productCard");

  const createProductCards = () => {
    products.forEach((product) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("product-card");

      const cardHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Discount: ${product.discountPercentage}%</p>
        <p>Rating: ${product.rating}</p>
        <p>Stock: ${product.stock}</p>
        <p>Brand: ${product.brand}</p>
        <p>Category: ${product.category}</p>
        <img src="${product.thumbnail}" alt="${product.title}" />
      `;

      cardDiv.innerHTML = cardHTML;
      productCard.appendChild(cardDiv);
    });
  };

  createProductCards();
}, 1000);

// Sorting
const brandFilter = document.getElementById('brandFilter');
const categoryFilter = document.getElementById('categoryFilter');
const productList = document.getElementById('productCard');

function renderProductList(productsArray) {
  productList.innerHTML = '';

  productsArray.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-card');
    productDiv.innerHTML = `
    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
    <p>Discount: ${product.discountPercentage}%</p>
    <p>Rating: ${product.rating}</p>
    <p>Stock: ${product.stock}</p>
    <p>Brand: ${product.brand}</p>
    <p>Category: ${product.category}</p>
    <img src="${product.thumbnail}" alt="${product.title}" />
    `;
    productList.appendChild(productDiv);
  });
}

function applyFilters() {
  const selectedBrand = brandFilter.value;
  const selectedCategory = categoryFilter.value;

  let filteredProducts = products;

  if (selectedBrand !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
  }

  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  }

  renderProductList(filteredProducts);
}

brandFilter.addEventListener('change', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

// Initial rendering
renderProductList(products);