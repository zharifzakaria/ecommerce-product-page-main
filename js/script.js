// cart button
const cart = document.getElementById("cart");
const cartTable = document.getElementById("cartTable");
const blocker = document.getElementById("blocker");
cart.addEventListener("click", () => {
  cartTable.classList.add("active");
  blocker.classList.add("active");
});
blocker.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  cartTable.classList.remove("active");
  blocker.classList.remove("active");
});

//gallery lightbox
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

const slidernav = document.createElement("div");
slidernav.classList.add("slidernav");

const slidernavPrev = document.createElement("div");
slidernavPrev.classList.add("slidernav__prev");
slidernav.appendChild(slidernavPrev);

let currentSlide = 0;
slidernavPrev.addEventListener("click", () => {
  currentSlide -= 1;
  if (currentSlide <= 0) currentSlide = 4;
  const currentLightboxImg = document
    .getElementById("lightbox")
    .querySelector("img");
  currentLightboxImg.src = `./images/image-product-${currentSlide}.jpg`;

  document
    .querySelectorAll(".gallery__thumb > ul > li")
    .forEach((el) => el.classList.remove("active"));
});

const slidernavNext = document.createElement("div");
slidernavNext.classList.add("slidernav__next");
slidernav.appendChild(slidernavNext);
slidernavNext.addEventListener("click", () => {
  currentSlide += 1;
  if (currentSlide >= 4) currentSlide = 1;
  const currentLightboxImg = document
    .getElementById("lightbox")
    .querySelector("img");
  currentLightboxImg.src = `./images/image-product-${currentSlide}.jpg`;
});

const lightboxClose = document.createElement("div");
lightboxClose.classList.add("close-btn");
lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

const galleryThumb = document.createElement("div");
galleryThumb.classList.add("gallery__thumb");
const galleryUL = document.createElement("ul");
const galleryLI1 = document.createElement("li");
galleryLI1.classList.add("active");
galleryLI1.setAttribute("data-slide", 1);
const galleryLiImage1 = document.createElement("img");
galleryLiImage1.src = "./images/image-product-1-thumbnail.jpg";
const galleryLI2 = document.createElement("li");
galleryLI2.setAttribute("data-slide", 2);
const galleryLiImage2 = document.createElement("img");
galleryLiImage2.src = "./images/image-product-2-thumbnail.jpg";
const galleryLI3 = document.createElement("li");
galleryLI3.setAttribute("data-slide", 3);
const galleryLiImage3 = document.createElement("img");
galleryLiImage3.src = "./images/image-product-3-thumbnail.jpg";
const galleryLI4 = document.createElement("li");
galleryLI4.setAttribute("data-slide", 4);
const galleryLiImage4 = document.createElement("img");
galleryLiImage4.src = "./images/image-product-4-thumbnail.jpg";

galleryLI1.appendChild(galleryLiImage1);
galleryLI2.appendChild(galleryLiImage2);
galleryLI3.appendChild(galleryLiImage3);
galleryLI4.appendChild(galleryLiImage4);
galleryUL.appendChild(galleryLI1);
galleryUL.appendChild(galleryLI2);
galleryUL.appendChild(galleryLI3);
galleryUL.appendChild(galleryLI4);
galleryThumb.appendChild(galleryUL);

const image = document.getElementById("mainImage");
image.addEventListener("click", (e) => {
  lightbox.classList.add("active");
  const lightboxImg = document.createElement("img");
  lightboxImg.src = e.path[0].src;
  while (lightbox.firstChild) {
    lightbox.removeChild(lightbox.firstChild);
  }
  lightbox.appendChild(lightboxClose);
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(galleryThumb);
  lightbox.appendChild(slidernav);
});

//gallery thumbnail
const thumbs = document.querySelectorAll(".gallery__thumb > ul > li");
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", (e) => {
    if (thumb.classList.contains("active")) return;
    image.src = e.path[0].src.replace("-thumbnail", "");
    image.dataset.slide = index;
    thumbs.forEach((x) => x.classList.remove("active"));
    thumb.classList.add("active");
  });
});

//mobile gallery slideshow
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
prevBtn.addEventListener("touchstart", () => {
  let current = image.dataset.slide;
  current--;
  if (current < 0) current = 3;
  image.src = thumbs[current]
    .querySelector("img")
    .src.replace("-thumbnail", "");
  image.dataset.slide = current;
});
nextBtn.addEventListener("touchstart", () => {
  let current = image.dataset.slide;
  current++;
  if (current >= 4) current = 0;
  image.src = thumbs[current]
    .querySelector("img")
    .src.replace("-thumbnail", "");
  image.dataset.slide = current;
});

// product counter
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const counterDisplay = document.getElementById("counterDisplay");

let currentCounter = 0;

minus.addEventListener("click", () => {
  if (currentCounter <= 0) return;
  currentCounter--;
  counterDisplay.innerHTML = currentCounter;
});

plus.addEventListener("click", () => {
  if (currentCounter >= 99) return;
  currentCounter++;
  counterDisplay.innerHTML = currentCounter;
});

//handle add cart
const cartTableRow = document.getElementById("cartTable").querySelector(".row");
let price = 125.0;
let total = 0;

function handleAddCart() {
  total = currentCounter;
  filledCart();
  if (total == 0) emptyCart();

  const cartAmount = document.getElementById("cartAmount");
  cartAmount.innerHTML = total;
  if (total !== 0) {
    cartAmount.style.backgroundColor = "hsl(26, 100%, 55%)";
  } else cartAmount.style.backgroundColor = "hsl(220, 14%, 75%)";
}

function emptyCart() {
  total = 0;
  currentCounter = 0;

  cartTableRow.innerHTML = "";
  const p = document.createElement("p");
  p.classList.add("empty-cart");
  p.innerHTML = "Your cart is empty.";
  cartTableRow.appendChild(p);
  cartTableRow.style.justifyContent = "center";

  cartAmount.innerHTML = total;
  counterDisplay.innerHTML = total;
  cartAmount.style.backgroundColor = "hsl(220, 14%, 75%)";

  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.style.display = "none";
  document.getElementById("checkoutBtn").querySelector("button").innerHTML =
    "Checkout";
}

emptyCart();

function filledCart() {
  checkoutBtn.style.display = "block";
  const thumb = document.createElement("div");
  thumb.classList.add("thumb");
  const thumbImg = document.createElement("img");
  thumbImg.src = document.getElementById("mainImage").src;
  thumb.appendChild(thumbImg);

  const product = document.createElement("div");
  product.classList.add("product");

  const productName = document.createElement("div");
  productName.classList.add("product__name");
  productName.innerHTML = "Fall Limited Edition Sneakers";
  product.appendChild(productName);

  const productPrice = document.createElement("div");
  productPrice.classList.add("product__price");
  productPrice.innerHTML =
    price +
    " x " +
    total +
    "<strong>" +
    formatter.format(price * total) +
    "</strong>";
  product.appendChild(productPrice);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.setAttribute("onclick", "emptyCart()");
  const deleteBtnIcon = document.createElement("img");
  deleteBtnIcon.src = "./images/icon-delete.svg";
  deleteBtn.appendChild(deleteBtnIcon);

  while (cartTableRow.firstChild) {
    cartTableRow.removeChild(cartTableRow.firstChild);
  }
  cartTableRow.appendChild(thumb);
  cartTableRow.appendChild(product);
  cartTableRow.appendChild(deleteBtn);
}

// currency formatter
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function handleCheckOut() {
  const checkoutBtn = document
    .getElementById("checkoutBtn")
    .querySelector("button");
  checkoutBtn.innerHTML = "Paid! Thank Youzzz!!! 🚀";

  setTimeout(() => {
    emptyCart();
  }, 2000);
}
