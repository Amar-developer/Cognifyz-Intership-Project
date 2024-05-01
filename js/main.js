// Special Countdown
let daysItem = document.querySelector("#days");
let hoursItem = document.querySelector("#hours");
let minItem = document.querySelector("#min");
let secItem = document.querySelector("#sec");

let countDown = () => {
  let futureDate = new Date("30 May 2024");
  let currentDate = new Date();
  let myDate = futureDate - currentDate;

  let days = Math.floor(myDate / 1000 / 60 / 60 / 24);
  let hours = Math.floor(myDate / 1000 / 60 / 60) % 24;
  let min = Math.floor(myDate / 1000 / 60) % 60;
  let sec = Math.floor(myDate / 1000) % 60;

  daysItem.innerHTML = days;
  hoursItem.innerHTML = hours;
  minItem.innerHTML = min;
  secItem.innerHTML = sec;
};

countDown();

setInterval(countDown, 1000);

// Scroll Back To Top
function scrollTopBack() {
  let scrollTopButton = document.querySelector("#scrollUp");
  window.onscroll = function () {
    var scroll = document.documentElement.scrollTop;
    if (scroll >= 250) {
      scrollTopButton.classList.add("scrollActive");
    } else {
      scrollTopButton.classList.remove("scrollActive");
    }
  };
}
scrollTopBack();

// nav hide
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (a) {
  a.addEventListener("click", function () {
    navCollapse.classList.remove("show");
  });
});

// Api Integration fetch data Dummyjson

// Define the base API URL
const API_URL = "https://dummyjson.com/products";

// Variables to track the current page and number of products per page
let currentPage = 1;
const productsPerPage = 10;

// Function to fetch data from the DummyJSON API
async function fetchProducts() {
  try {
    // Calculate the start and limit parameters for pagination
    const skip = (currentPage - 1) * productsPerPage;

    // Make a request to the DummyJSON API to fetch products with pagination
    const response = await fetch(
      `${API_URL}?skip=${skip}&limit=${productsPerPage}`
    );

    const response2 = await fetch(`${API_URL}/60`);

    const categoryResponse = await fetch(`${API_URL}/categories`);

    // Parse the JSON data
    const productData = await response.json();
    const sinleProductData = await response2.json();
    const categoryData = await categoryResponse.json();

    // Get the products array from the data
    const products = productData.products;
    const singleProduct = sinleProductData;
    const categories = categoryData;

    // Display the fetched products on the webpage
    displayProducts(products);
    displaySingleProduct(singleProduct);
    displayCategories(categories);

    // Update pagination controls
    updatePaginationControls(productData.total, productsPerPage);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to display products on the webpage
function displayProducts(products) {
  // Get the element where you want to display the products
  const productsContainer = document.getElementById("product-fetch");

  // Clear any existing content
  productsContainer.innerHTML = "";

  // Iterate over the products and create HTML elements for each product
  products.forEach((product) => {
    // Create a div for each product
    const productColDiv = document.createElement("div");
    productColDiv.classList.add("col-sm-6", "col-lg-4");

    const productLink = document.createElement("a");
    productLink.href = "#product-fetch";
    productLink.classList.add("d-block", "text-center", "mb-4");
    productColDiv.appendChild(productLink);

    const productList = document.createElement("div");
    productList.classList.add("product-list");
    productLink.appendChild(productList);

    const productImgDiv = document.createElement("div");
    productImgDiv.classList.add("product-image", "position-relative");
    productList.appendChild(productImgDiv);

    const productSpan = document.createElement("span");
    productSpan.innerText = "Sale";
    productSpan.classList.add("sale");
    productImgDiv.appendChild(productSpan);

    // Create an image element for the product
    const productImage = document.createElement("img");
    productImage.src = product.thumbnail;
    productImage.classList.add("img-fluid", "product-image-first");

    productImage.alt = product.title;
    productImgDiv.appendChild(productImage);

    const productName = document.createElement("div");
    productName.classList.add("product-name", "pt-3");
    productList.appendChild(productName);

    // Create a heading element for the product title
    const productTitle = document.createElement("h3");
    productTitle.textContent = product.title;
    productName.appendChild(productTitle);

    // Create a paragraph element for the product price
    const productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price}`;
    productName.appendChild(productPrice);

    // create a button elemwnt for add to cart
    const productCart = document.createElement("button");
    productCart.textContent = "Add cart";
    productCart.type = "button";
    productCart.classList.add("add_to_Card");
    productName.appendChild(productCart);

    // Append the product div to the products container
    productsContainer.appendChild(productColDiv);
  });
}

// Function to update pagination controls
function updatePaginationControls(totalProducts, limit) {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalProducts / limit);

  // Get the pagination buttons and page info
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");
  const pageInfo = document.getElementById("page-info");
  const pageNumbers = document.getElementById("page-numbers");

  // Update page info to display the current page number and total pages
  pageInfo.textContent = `Page: ${currentPage} of ${totalPages}`;

  // Enable/disable the Previous button based on the current page
  prevButton.disabled = currentPage === 1;

  // Enable/disable the Next button based on the current page and total pages
  nextButton.disabled = currentPage === totalPages;

  // Clear existing page numbers
  pageNumbers.innerHTML = "";

  // Create page number buttons
  for (let i = 1; i <= totalPages; i++) {
    // Create a button for each page number
    const pageButton = document.createElement("button");
    pageButton.textContent = i;

    pageButton.className = "page-button";

    // Add an event listener to handle page navigation
    pageButton.addEventListener("click", () => {
      currentPage = i;

      fetchProducts();
    });

    // Append the button to the page numbers container
    pageNumbers.appendChild(pageButton);
  }
}

// Event listener for the Previous button
document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts();
  }
});

// Event listener for the Next button
document.getElementById("next-page").addEventListener("click", () => {
  currentPage++;
  fetchProducts();
});

// fetch single product special offer
const displaySingleProduct = (singleProduct) => {
  const singleProductContainer = document.getElementById(
    "single-product-fetch"
  );

  // Create a div for each product
  const singleProductDiv = document.createElement("div");
  singleProductDiv.classList.add("special-img", "position-relative");
  singleProductContainer.appendChild(singleProductDiv);

  const singleProductSpan = document.createElement("span");
  singleProductSpan.innerText = "Sale";
  singleProductSpan.classList.add("sale");
  singleProductDiv.appendChild(singleProductSpan);

  const singleProductImage = document.createElement("img");
  singleProductImage.src = singleProduct.images[2];
  singleProductImage.classList.add("img-fluid", "product-image-first");

  singleProductImage.alt = singleProduct.title;
  singleProductDiv.appendChild(singleProductImage);
};

// Function to display categories on the webpage

const displayCategories = (categories) => {
  // Get the element where you want to display the categories
  const categoriesDropdown = document.getElementById("dropdown-menu");

  // Clear any existing content
  categoriesDropdown.innerHTML = "";

  // Create a container row for the three-column layout
  const row = document.createElement("div");
  row.classList.add("row");

  // Iterate over the categories and create HTML elements for each category
  categories.forEach((category, index) => {
    // Determine which column the current item belongs to
    const colIndex = index % 4;

    // Create a new column if it doesn't exist yet
    if (!row.children[colIndex]) {
      const col = document.createElement("div");
      col.classList.add("col");
      row.appendChild(col);
    }
    // Create a new dropdown item
    const dropdownItem = document.createElement("a");
    dropdownItem.classList.add("dropdown-item");
    dropdownItem.href = "#"; // Add a link or use JavaScript functionality
    dropdownItem.innerText = category;

    // Append the dropdown item to the appropriate column
    row.children[colIndex].appendChild(dropdownItem);
  });
  // Append the row to the dropdown menu
  categoriesDropdown.appendChild(row);
};

// Function to get user data from local storage
function getUsersFromLocalStorage() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

// Function to save user data to local storage
function saveUsersToLocalStorage(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Function to save logged-in user's username
function saveLoggedInUser(username) {
  localStorage.setItem("loggedInUser", username);
}

// Function to get logged-in user's username
function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}

// Function to clear logged-in user
function clearLoggedInUser() {
  localStorage.removeItem("loggedInUser");
}

// Function to handle logout action
function handleLogout() {
  clearLoggedInUser();
  updateInterfaceForLoggedInUser();
  alert("You have been logged out.");
}

// Elements
const formPopover = document.getElementById("formPopover");
const formTitle = document.getElementById("formTitle");
const form = document.getElementById("form");
const emailField = document.getElementById("emailField");
const switchModeLink = document.getElementById("switchModeLink");
const submitButton = document.getElementById("submitButton");
const overlay = document.getElementById("overlay");
const formCloseIcon = document.getElementById("formCloseIcon");
const formPopoverButton = document.getElementById("formPopoverButton");
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutButton = document.getElementById("logoutButton");

// Track the current form mode (login or registration)
let isLoginMode = true;

// Toggle the form popover and overlay visibility
function toggleFormPopover() {
  const isVisible = formPopover.style.display === "none";

  if (isVisible) {
    formPopover.style.display = "block";
    overlay.style.display = "block";
  } else {
    formPopover.style.display = "none";
    overlay.style.display = "none";
  }
}

// Switch between login and registration modes
function switchFormMode(event) {
  event.preventDefault();
  isLoginMode = !isLoginMode;

  // Update form title, email field visibility, and submit button text
  if (isLoginMode) {
    formTitle.textContent = "Login";
    emailField.style.display = "none";
    submitButton.textContent = "Login";
    switchModeLink.textContent = "Don't have an account? Register";
  } else {
    formTitle.textContent = "Register";
    emailField.style.display = "block";
    submitButton.textContent = "Register";
    switchModeLink.textContent = "Already have an account? Login";
  }

  // Clear form inputs and error messages
  form.reset();
  document.getElementById("usernameError").textContent = "";
  document.getElementById("passwordError").textcontent = "";
  document.getElementById("emailError").textContent = "";
}

// Validate form inputs
function validateForm() {
  let isValid = true;
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  const emailError = document.getElementById("emailError");

  // Clear previous error messages
  usernameError.textContent = "";
  passwordError.textContent = "";
  emailError.textContent = "";

  // Validate form inputs
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long.";
    isValid = false;
  }

  // Validate based on mode (login or registration)
  if (isLoginMode) {
    // Login mode
    const users = getUsersFromLocalStorage();
    const existingUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!existingUser) {
      usernameError.textContent = "Invalid username or password.";
      passwordError.textContent = "Invalid username or password.";
      isValid = false;
    }
  } else {
    // Registration mode
    const email = document.getElementById("email").value;

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = "Invalid email format.";
      isValid = false;
    }

    // Check for duplicate username
    const users = getUsersFromLocalStorage();
    const duplicateUser = users.find((user) => user.username === username);
    if (duplicateUser) {
      usernameError.textContent = "Username already exists.";
      isValid = false;
    }
  }

  return isValid;
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (isLoginMode) {
      // Login successful
      alert("Login successful! Redirecting to home page...");
      saveLoggedInUser(username);
      toggleFormPopover();
      redirectToHomePage();
    } else {
      // Registration successful
      const email = document.getElementById("email").value;
      const users = getUsersFromLocalStorage();

      // Save new user data to local storage
      users.push({ username, password, email });
      saveUsersToLocalStorage(users);

      alert("Account created successfully!");
      // Automatically switch to login mode
      switchFormMode(event);
    }
  }
}

// Redirect to the home page
function redirectToHomePage() {
  window.location.href = "index.html"; // Change the URL as needed
}

// Check if a user is logged in and update the interface accordingly
function updateInterfaceForLoggedInUser() {
  const loggedInUser = getLoggedInUser();
  if (loggedInUser) {
    formPopoverButton.style.display = "none";
    usernameDisplay.textContent = `Welcome, ${loggedInUser}!`;
    usernameDisplay.style.display = "block";
    logoutButton.style.display = "block";
  } else {
    formPopoverButton.style.display = "block";
    usernameDisplay.style.display = "none";
    logoutButton.style.display = "none";
  }
}

// Event listeners
document
  .getElementById("formPopoverButton")
  .addEventListener("click", toggleFormPopover);
switchModeLink.addEventListener("click", switchFormMode);
form.addEventListener("submit", handleFormSubmit);
formCloseIcon.addEventListener("click", toggleFormPopover);
logoutButton.addEventListener("click", handleLogout);

// Initial setup
formPopover.style.display = "none";
overlay.style.display = "none";
updateInterfaceForLoggedInUser();

// Call the function to fetch products when the page loads
window.onload = fetchProducts;
