let cart = [];
const maximumCartCapacity = 10;
let totalPrice = 0;
let freeShipping = false;

const addItemButton = document.querySelector(".addItem");
addItemButton.addEventListener("click", addItem);

function addItem() {
  const itemName = document.getElementById("itemName").value;
  const itemPrice = Number(document.getElementById("itemPrice").value);

  if (!itemName || isNaN(itemPrice) || itemPrice <= 0) {
    warningDescription("Please enter a valid item name and price.");
    return;
  }

  let totalItem = document.querySelector("#total-items");
  let totalPriceList = document.querySelector("#total-price");
  const freeShip = document.querySelector("#free-shipping");

  if (cart.length < maximumCartCapacity) {
    cart.push({ name: itemName, price: itemPrice });
    totalItem.textContent = cart.length;

    totalPrice += itemPrice;
    totalPriceList.textContent = totalPrice.toFixed(2);

    freeShipping = totalPrice >= 5000;
    freeShip.textContent = freeShipping ? "Yes" : "No";

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
  } else {
    warningDescription(
      `The cart is full! You have ${cart.length} items already.`
    );
  }
}

function warningDescription(text) {
  const description = document.querySelector("#description");
  description.textContent = text;
}

const checkOut = document.querySelector(".checkout");
checkOut.addEventListener("click", function () {
  const showItem = document.querySelector("#checkout");
  showItem.innerHTML = ""; // Clear previous checkout details

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      ${item.name} - &#x20A6;${item.price.toFixed(2)} 
      <button onclick="removeSpecificItem(${index})">Remove</button>
    `;
    showItem.appendChild(itemDiv);
  });
});

function removeSpecificItem(index) {
  const removedItem = cart.splice(index, 1)[0];
  document.querySelector("#total-items").textContent = cart.length;

  totalPrice -= removedItem.price;
  document.querySelector("#total-price").textContent = totalPrice.toFixed(2);

  freeShipping = totalPrice >= 5000;
  document.querySelector("#free-shipping").textContent = freeShipping
    ? "Yes"
    : "No";

  // Re-trigger the checkout button to refresh the cart display
  document.querySelector(".checkout").click();
}
