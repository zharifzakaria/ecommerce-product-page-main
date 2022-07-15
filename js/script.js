
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
const image = document.getElementById("mainImage");
image.addEventListener("click", (e) => {
  lightbox.classList.add("active");
  const lightboxImg = document.createElement("img");
  lightboxImg.src = e.path[0].src;
  while (lightbox.firstChild) {
    lightbox.removeChild(lightbox.firstChild);
  }
  lightbox.appendChild(lightboxImg);
});
lightbox.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove("active");
});

//gallery thumbnail
const thumbs = document.querySelectorAll('.gallery__thumb > ul > li');
thumbs.forEach( (thumb, index) => {
  thumb.addEventListener('click', e => {
    if (thumb.classList.contains('active')) return;
    image.src = e.path[0].src.replace("-thumbnail","");
    image.dataset.slide = index;
    thumbs.forEach(x => x.classList.remove('active'));
    thumb.classList.add('active');
  })
})

//mobile gallery slideshow
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('touchstart', () => {
  let current = image.dataset.slide;
  current--;
  if (current < 0) return;
  image.src = thumbs[current].querySelector('img').src.replace("-thumbnail","");
  image.dataset.slide = current;
});
nextBtn.addEventListener('touchstart', () => {
  let current = image.dataset.slide;
    current++; 
    if (current >= 4) return;
    image.src = thumbs[current].querySelector('img').src.replace("-thumbnail","");
    image.dataset.slide = current;
});