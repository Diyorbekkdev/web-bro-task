const cartLengthContent = document.querySelector(".cart");
let shopCartProductsRow = document.querySelector(".card__row");
let cartProductsJson = localStorage.getItem(CART);
let cartProducts = JSON.parse(cartProductsJson) || [];

function getCartLength() {
  cartLengthContent.innerHTML = cartProducts.length;
}
getCartLength();

//create card
function createProductCard(product) {
  return `
          <div class="card">
          <div class="card__header" style="background: url(${
            product.thumbnail
          }) center center, no-repeat; background-size: cover;">
              
          </div>
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
          <div class="card__actions shop-btns">
          <button class="decrement-button" onclick="decrementQuantity(${
            product.id
          })">-</button>
          <button class="quantity-value">${product.quantity}</button>
          <button class="increment-button" onclick="incrementQuantity(${
            product.id
          })">+</button>
          </div>
          </div>
          </div>
      `;
}

//quantity increment
function incrementQuantity(productId) {
  const product = cartProducts.find((item) => item.id === productId);
  if (product) {
    product.quantity++;
    saveCartToLocalStorage();
    displayProducts();
  }
}

//quantity decrement
function decrementQuantity(productId) {
  const product = cartProducts.find((item) => item.id === productId);
  if (product && product.quantity > 1) {
    product.quantity--;
    saveCartToLocalStorage();
    displayProducts();
  } else {
    removeFromCart(productId);
    saveCartToLocalStorage();
    displayProducts();
  }
}
//removing
function removeFromCart(productId) {
  const productIndex = cartProducts.findIndex((item) => item.id === productId);
  if (productIndex !== -1) {
    cartProducts.splice(productIndex, 1);
    saveCartToLocalStorage();
    displayProducts();
  }
}

//setting to local storage
function saveCartToLocalStorage() {
  localStorage.setItem(CART, JSON.stringify(cartProducts));
  getCartLength();
}

//mapping
function displayProducts() {
  shopCartProductsRow.innerHTML = "";

  const products = cartProducts;

  products.forEach((product) => {
    const cardHTML = createProductCard(product);
    shopCartProductsRow.innerHTML += cardHTML;
  });
}
displayProducts();
