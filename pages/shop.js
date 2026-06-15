let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const cartCount = document.getElementById("cartCount");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price}₽`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Удалить";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
    total += item.price;
  });

  totalPrice.textContent = total;
  cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

function checkout() {
  if (cart.length === 0) return alert("Корзина пуста");
  document.getElementById("checkoutForm").classList.remove("hidden");
}

function completeOrder(e) {
  e.preventDefault();
  const name = document.getElementById("orderName").value.trim();
  const address = document.getElementById("orderAddress").value.trim();
  const orderId = "TIT" + Date.now();

  const order = {
    id: orderId,
    name,
    address,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price, 0)
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert(`Заказ оформлен!\nНомер: ${orderId}\nИмя: ${name}\nАдрес: ${address}`);
  cart = [];
  updateCart();
  document.getElementById("checkoutForm").classList.add("hidden");
  localStorage.removeItem("cart");
}


