let products = JSON.parse(localStorage.getItem("products"))
if (!products) {
  products = [
    {
      id: 1,
      image: "https://i.postimg.cc/WbQbGKNs/b1418d4e-7bce-4a6d-930e-6a0f8ae0b56d.webp",
      name: "Hyaluronic Acid Serum",
      desc: "",
      price: "R175",
      quantity: 5,
    },
    {
      id: 2,
      image: "https://i.postimg.cc/cCrJCRdH/357e9ff4-e753-44d2-a9f3-1b0ad3009c98.webp",
      name: "Rose Water Serum",
      desc: "",
      price: "R220",
      quantity: 5,
    },
    {
      id: 3,
      image: "https://i.postimg.cc/BQJgYNJD/753ced81-5c99-468b-acff-b0cb2ac35c33.webp",
      name: "Honey Melon Reviving Mask",
      desc: "",
      price: "R150",
      quantity: 5,
    },
    {
      id: 4,
      image: "https://i.postimg.cc/fTHrY1Yk/c32fa48b-fd9b-45b6-961e-df0f3a90dd39.webp",
      name: "Brightening Blueberry Mask",
      desc: "",
      price: "R150",
      quantity: 5,
    },
    {
      id: 5,
      image: "https://i.postimg.cc/pTJHvk48/e7ef380e-04ca-49a9-b163-bf3f52edaa99.jpg",
      name: "Oil Cleanser",
      desc: "",
      price: "R150",
      quantity: 5,
    },
    {
      id: 6,
      image: "https://i.postimg.cc/Nf622wTv/a224844e-2a77-4e03-9bd9-843d0b873b7f.jpg",
      name: "Salicylic Acid Cleanser",
      desc: "",
      price: "R125",
      quantity: 5,
    }

  ]
  localStorage.setItem("products", JSON.stringify(products))
};

function displayProduts() {
  const ourProducts = document.getElementById("products");
  products.forEach((product) => {
    const productElement = document.createElement("div")
    productElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}" id="product-imgs">
           <h3>${product.name}</h3>
            <p>${product.price}</p>
             <button onclick="addToCart(${product.id})" class="addbtn">Add to cart</button>
    `;
    ourProducts.appendChild(productElement)
  })
}

let cart = JSON.parse(localStorage.getItem("Products")) || [];

// Add to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  if (product && product.quantity > 0) {
    cart.push(product);
    product.quantity--;
    updateCart();
  }
}

// remove from cart
function removeFromCart(index) {
  let removedProduct = cart.splice(index, 1)[0];
  removedProduct.quantity++;
  updateCart();
}

// Update cart
function updateCart() {
  const cartContainer = document.getElementById("cart-body");
  localStorage.setItem("Products", JSON.stringify(cart));
  cartContainer.innerHTML = "";
  cart.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
        <span>${product.name}</span>
        <span>${product.price}</span>
        <p>Total R ${product.price}</p>
        <button onclick="removeFromCart(${index})" class="rembutton">❌</button>
      `;
    cartContainer.appendChild(cartItem);
  });
  calculateTotal();
}

// Function to calculate
function calculateTotal() {
  let totalElement = document.getElementById("total");
  let total = cart.reduce((acc, product) => {
    return acc + parseInt(product.price.replace("R", ""));
  }, 0);
  totalElement.textContent = `R${total}`;
}

// Admin page
let admin = JSON.parse(localStorage.getItem("products"));
if (!admin) {
  admin = []
  }

function addToAdmin() {
  let Value = {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
  }

  admin.push(Value);
  localStorage.setItem("products", JSON.stringify(products));

    let table = document.querySelector(".display");
    table.innerHTML = "";
    admin.forEach((product, index) => {
      table.innerHTML +=
        ` 
    <tbody>
    <tr>
      <td>${product.id}</td>
      <td>${product.image}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td><button onclick="removeFromCart(${index})" class="rembutton">❌</button></td>
    </tr>
    <tr>
    </tbody>
    `;
    });
}

function loadItems() {
  let loadProducts = localStorage.getItem("Products");
  if (loadProducts) {
    cart = JSON.parse(loadProducts);
    updateCart();
  }
}

window.addEventListener("load", function () {
  loadItems();
});

displayProduts();
updateCart();
