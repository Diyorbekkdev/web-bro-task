let selectedProductId = localStorage.getItem(SINGLE_PRODUCT);
const productImage = document.getElementById("productImage");
const thumbnails = document.querySelectorAll(".thumbnail");



async function getSelectedProduct(productId) {
  try {
    const { data } = await axiosInstance.get(`products/${productId}`);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

//creating single product card
function createProductCard(product) {
  return `
            <div class="product__img_container">
            <div class="product-detail__image">
                <img id="productImage" src="${
                  product.thumbnail
                }" alt="Product Image">
            </div>
            <div class="product-detail__thumbnails">
                <img class="thumbnail" src="${
                  product.images[0]
                }" alt="Thumbnail 1">
                <img class="thumbnail" src="${
                  product.images[1]
                }" alt="Thumbnail 2">
                <img class="thumbnail" src="${
                  product.images[2]
                }" alt="Thumbnail 3">
                <img class="thumbnail" src="${
                  product.images[3]
                }" alt="Thumbnail 4">
            </div>
        </div>
        <div class="product__informations">
            <h1>${product.title}</h1>
            <div class="product_detail">
                <span>${product.category}</span>
                <span>${product.brand}</span>
            </div>
            <p class="desc">${product.description}</p>
            <div class="product_rank">
                <span>${getRating(product.rating)}</span> 
                <span class="price">Price: ${product.price}$ </span> 
            </div>
        </div>
      `;
}

//mapping
async function displayProducts() {
  const productContainer = document.querySelector(".single__product__row");
  productContainer.innerHTML = "";
  if (selectedProductId) {
    const product = await getSelectedProduct(selectedProductId);
    const cardHTML = createProductCard(product);
    productContainer.innerHTML = cardHTML;
  } else {
    console.error("No product selected.");
  }
}

displayProducts();
