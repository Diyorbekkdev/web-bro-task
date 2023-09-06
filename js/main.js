const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
let page = 1;

//loading
function showLoadingIndicator() {
  const productContainer = document.querySelector(".product-list");
  productContainer.innerHTML = `
                            <div class="spinner">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            </div> `;
}

//geting all products
async function getProducts(page, category = "all") {
  try {
    showLoadingIndicator();
    const url =
      category === "all"
        ? `products?limit=${LIMIT}&skip=${(page - 1) * LIMIT}`
        : `products/category/${category}?limit=${LIMIT}&skip=${
            (page - 1) * LIMIT
          }`;
    
    const { data } = await axiosInstance.get(url);
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  } finally {
    const productContainer = document.querySelector(".product-list");
    productContainer.innerHTML = "";
    
  }
}

//getting catergories
async function getCategories() {
  try {
    const response = await axiosInstance.get("products/categories");
    const categories = response.data;

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    categorySelect.addEventListener("change", (event) => {
      const selectedCategory = event.target.value;
      page = 1;
      displayProducts(page, selectedCategory);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
getCategories();

//create prodiuct card
function createProductCard(product) {
  return `
        <div class="card">
        <a href="ownpage" class="card__header" style="background: url(${
          product.thumbnail
        }) center center, no-repeat; background-size: cover;">
            
        </a>
        <div class="card__content">
            <h5 class="card__title">${product.title}</h5>
            <p class="card__text">
            ${product.description}
            </p>
        </div>
        <div class="card__detail__info">
            <div class="reting">${getRating(product.rating)}</div>
            <div class="price">Price: ${product.price} $</div>
        </div>
        <div class="card__actions">
        <button class="card__button" onclick="addToCart(${
          product.id
        })">Add to Cart</button>
        <button class="card__button" onclick="loadProductDetail(${
          product.id
        })">See Product</button>
        </div>
        </div>
        </div>
    `;
}

//single product deteil
function loadProductDetail(product) {
  const productDetailPageURL = "ownpage.html";

  localStorage.setItem(SINGLE_PRODUCT, JSON.stringify(product));

  window.location.href = productDetailPageURL;
}

//get single product
async function getProductById(productId) {
  try {
    const { data } = await axiosInstance.get(`products/${productId}`);

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

//add to cart
async function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem(CART)) || [];

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    const product = await getProductById(productId);

    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  localStorage.setItem(CART, JSON.stringify(cart));
  getCartLength();
}

//mappping
async function displayProducts(page, category) {
  const productContainer = document.querySelector(".product-list");
  productContainer.innerHTML = "";

  const products = await getProducts(page, category);

  products.forEach((product) => {
    const cardHTML = createProductCard(product);
    productContainer.innerHTML += cardHTML;
  });
}

//pagination
function initPagination() {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  prevButton.addEventListener("click", () => {
    if (page > 1) {
      page--;
      displayProducts(page);
    }
  });

  nextButton.addEventListener("click", () => {
    page++;
    displayProducts(page);
  });
}

displayProducts(page);
initPagination();
