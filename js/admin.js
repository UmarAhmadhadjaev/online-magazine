import { BASE_URL } from "./utils/constantas.js";
import findElement from "./utils/findElement.js";

let products = [];

fetch(BASE_URL + "products/1", {
  method: "PUT",
  body: JSON.stringify({
    title: "test product",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

const templateProduct = findElement("#product-template");
const elCards = findElement(".cards");
const elForm = findElement("#add-product");
elForm.style.display = "block";

const editelForm = findElement("#edit-product");

// render Products
function renderProducts(array, parent = elCards) {
  parent.textContent = "";

  const fragment = document.createDocumentFragment();

  array.forEach((product) => {
    const template = templateProduct.content.cloneNode(true);

    const title = findElement(".card-title", template);
    const date = findElement(".date", template);
    const img = findElement(".card-img-top", template);
    const category = findElement(".category", template);
    const price = findElement(".price", template);
    const rating = findElement(".rating", template);
    const description = findElement(".description", template);

    const ratingFull = findElement(".rating-full", template);
    const ratingHalf = findElement(".rating-half", template);
    const ratingStars = findElement(".rating-stars", template);
    const deleteBtn = findElement(".btn-danger", template);
    const editBtn = findElement(".btn-info", template);

    deleteBtn.dataset.id = product.id;
    editBtn.dataset.id = product.id;

    if (Math.round(product.rating.rate) === 5) {
      for (let i = 0; i < 5; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;

        ratingStars.appendChild(img);
      }
    } else if (Math.round(product.rating.rate) === 4) {
      for (let i = 0; i < 4; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;

        ratingStars.appendChild(img);
      }
    } else if (Math.round(product.rating.rate) === 3) {
      for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;

        ratingStars.appendChild(img);
      }
    } else if (Math.round(product.rating.rate) === 2) {
      for (let i = 0; i < 2; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;

        ratingStars.appendChild(img);
      }
    } else if (Math.round(product.rating.rate) === 1) {
      const img = document.createElement("img");
      img.src = ratingFull.src;

      ratingStars.appendChild(img);
    } else {
    }

    title.textContent = product.name;
    date.textContent = product.createdAt;
    category.textContent = product.category;
    price.textContent = product.price + "$";
    rating.textContent = `${product.rating.rate}⭐️   ${product.rating.count}`;
    description.textContent = product.description;
    img.src = product.image;

    fragment.appendChild(template);
    // parent.appendChild(template)
  });

  parent.appendChild(fragment);
}
// render Products End


function getData() {
  try {
    async function takeData() {
      const res = await fetch(BASE_URL + "products");

      if (res.status === 404) {
        throw new Error("qanaqadir xatolik");
      }
      let data = await res.json();

      products = data;

      renderProducts(products);
    }

    takeData();
  } catch (err) {
    console.log(err);
  }
}

getData();
