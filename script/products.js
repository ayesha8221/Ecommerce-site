
const products =  JSON.parse(localStorage.getItem("products"))
if (!products) {
   const products = [
    {
      id: 1,
      image: "https://i.postimg.cc/WbQbGKNs/b1418d4e-7bce-4a6d-930e-6a0f8ae0b56d.webp",
      name: "Hyaluronic Acid Serum",
      category: "Serums",
      price: "R175",
      quantity: 5,
    },
    {
      id: 2,
      image: "https://i.postimg.cc/cCrJCRdH/357e9ff4-e753-44d2-a9f3-1b0ad3009c98.webp",
      name: "Rose Water Serum",
      category: "Serums",
      price: "R220",
      quantity: 5,
    },
    {
      id: 3,
      image: "https://i.postimg.cc/BQJgYNJD/753ced81-5c99-468b-acff-b0cb2ac35c33.webp",
      name: "Honey Melon Reviving Mask",
      category: "Masks",
      price: "R150",
      quantity: 5,
    },
    {
      id: 4,
      image: "https://i.postimg.cc/fTHrY1Yk/c32fa48b-fd9b-45b6-961e-df0f3a90dd39.webp",
      name: "Brightening Blueberry Mask",
      category: "Masks",
      price: "R150",
      quantity: 5,
    },
    {
      id: 5,
      image: "https://i.postimg.cc/pTJHvk48/e7ef380e-04ca-49a9-b163-bf3f52edaa99.jpg",
      name: "Oil Cleanser",
      category: "Facial Cleansers",
      price: "R150",
      quantity: 5,
    },
    {
      id: 6,
      image: "https://i.postimg.cc/Nf622wTv/a224844e-2a77-4e03-9bd9-843d0b873b7f.jpg",
      name: "Salicylic Acid Cleanser",
      category: "Facial Cleansers",
      price: "R125",
      quantity: 5,
    },

  ];
  localStorage.setItem("products", JSON.stringify(products))
}

function displayProduts(category = "") {
  const ourProducts = document.getElementById("products");
  ourProducts.innerHTML = ""
  if (!Array.isArray(products)) {
    console.error("Products data is not an array.");
    return;
  }
  products.forEach((product) => {
    if (category === "" || product.category === category) {
      const productElement = document.createElement("div");
      productElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}" id="product-imgs">
           <h3>${product.name}</h3>
            <p>${product.price}</p>
             <button onclick="addToCart(${product.id})" class="addbtn">Add to cart</button>
    `;
    ourProducts.appendChild(productElement)
    }
  });
}

displayProduts();

// filter products serums, masks, cleansers
function filter() {
  let selectCategory = document.getElementById('categories');
  let selectedCategory = selectCategory.value;
  displayProduts(selectedCategory);
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
        <button onclick="removeFromCart(${index})" class="rembutton"><img class="delete" src="https://i.postimg.cc/4NFKkLG0/3102186.png" alt="delete"></button>
        <br>
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

function createTableRow(product) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${product.id}</td>
    <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td><button onclick="editProductDetails(${product.id})">Edit</button></td>
      <td><button onclick="deleteFromAdmin(${product.id})">Delete</button></td>    
  `;
  return row;
}

// Function to populate the admin table with product data
function populateAdminTable() {
  const products = JSON.parse(localStorage.getItem("products"));
  if (!Array.isArray(products)) {
    console.error("Products data not found in localStorage or is not an array.");
    return;
  }

  const displayTableBody = document.querySelector(".display");
  displayTableBody.innerHTML = "";

  products.forEach((product) => {
    const row = createTableRow(product);
    displayTableBody.appendChild(row);
  });
}


// add to admin table
function addToAdmin() {
  // Assuming you have input fields for the product details (id, name, price, image) in your HTML
  const newProduct = {
    id: parseInt(document.getElementById("id").value),
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
  };

  // Add the new product to the admin array
  admin.push(newProduct);

  // Save the updated admin array to localStorage
  localStorage.setItem("products", JSON.stringify(admin));

  // Repopulate the admin table to show the new product
  populateAdminTable();
}

// delete from admin table
function deleteFromAdmin(productId) {
  // Find the index of the product with the given productId in the admin array
  const index = admin.findIndex((product) => product.id === productId);

  // If the product is found (index is not -1), remove it from the admin array
  if (index !== -1) {
    admin.splice(index, 1);

    // Save the updated admin array to localStorage
    localStorage.setItem("products", JSON.stringify(admin));

    // Repopulate the admin table to reflect the updated data
    populateAdminTable();
  }
}

// sort function to sort from lowest to highest and back again
let isAscending = true;

// Sort function to sort products by price in the specified order
function sortAdminByPrice(ascending) {
  if (ascending) {
    admin.sort((a, b) => parseFloat(a.price.replace("R", "")) - parseFloat(b.price.replace("R", "")));
  } else {
    admin.sort((a, b) => parseFloat(b.price.replace("R", "")) - parseFloat(a.price.replace("R", "")));
  }

  // Save the sorted admin array to localStorage
  localStorage.setItem("products", JSON.stringify(admin));

  // Repopulate the admin table to reflect the sorted data
  populateAdminTable();
}

// Function to toggle the sort order when the "Sort" button is clicked
function toggleSort() {
  isAscending = !isAscending;
  const buttonText = isAscending ? "Sort by Price (Low to High)" : "Sort by Price (High to Low)";
  document.querySelector("button").textContent = buttonText;

  // Sort the products based on the current sort order
  sortAdminByPrice(isAscending);
}

// Function to edit product details
function editProductDetails(productId) {
  const productToEdit = admin.find((product) => product.id === productId);

  if (productToEdit) {
    // Pre-fill the input fields in the modal with existing product name and price
    document.getElementById("editProductName").value = productToEdit.name;
    document.getElementById("editProductPrice").value = productToEdit.price;

    // Set the data-product-id attribute to store the product ID
    document.getElementById("editModal").setAttribute("data-product-id", productId);

    // Show the Bootstrap modal
    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();
  }
}

// Function to save the edited product details
function saveProductDetails() {
  const productId = parseInt(document.getElementById("editModal").getAttribute("data-product-id"));
  const newName = document.getElementById("editProductName").value;
  const newImage = document.getElementById("editProductImage").value;
  const newPrice = document.getElementById("editProductPrice").value;

  const productToEdit = admin.find((product) => product.id === productId);

  if (productToEdit) {
    // Update the product details in the admin array
    productToEdit.image = newImage || productToEdit.image;
    productToEdit.name = newName || productToEdit.name;
    productToEdit.price = newPrice || productToEdit.price;

    // Save the updated admin array to localStorage
    localStorage.setItem("products", JSON.stringify(admin));

    // Repopulate the admin table to reflect the updated data
    populateAdminTable();

    // Hide the Bootstrap modal after saving changes
    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.hide();
  }
}

function loadItems() {
  let loadProducts = localStorage.getItem("products");
  if (loadProducts) {
    cart = JSON.parse(loadProducts);
    updateCart();
  }
}
populateAdminTable();
displayProduts();
updateCart();
// loadItems();


window.addEventListener("load", function () {
  loadItems();
});


