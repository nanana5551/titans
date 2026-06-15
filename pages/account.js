// Проверка авторизации
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const orderHistory = document.getElementById("orderHistory");
    const clearBtn = document.getElementById("clearHistory");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const profileForm = document.getElementById("profileForm");
    const currentOrdersKey = getOrdersKey();
  
    // Заполнить поля из localStorage
    usernameInput.value = localStorage.getItem("username") || "";
    emailInput.value = localStorage.getItem("email") || "";
  
    // Сохранение профиля
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
  
      if (username) localStorage.setItem("username", username);
      if (email) localStorage.setItem("email", email);
      alert("Профиль обновлён!");
    });
  
    // История заказов
    const orders = JSON.parse(localStorage.getItem(currentOrdersKey)) || [];
  
    if (orders.length === 0) {
      orderHistory.innerHTML = "<p>Заказов пока нет.</p>";
    } else {
      orders.forEach(order => {
        const block = document.createElement("div");
        block.className = "order-block";
        block.innerHTML = `
          <p><strong>Номер заказа:</strong> ${order.id}</p>
          <p><strong>Имя:</strong> ${order.name}</p>
          <p><strong>Адрес доставки:</strong> ${order.address}</p>
          <p><strong>Товары:</strong></p>
          <ul>
            ${order.items.map(item => `<li>${item.name} — ${item.price}₽</li>`).join("")}
          </ul>
          <p><strong>Итого:</strong> ${order.total}₽</p>
        `;
        orderHistory.appendChild(block);
      });
    }
  
    // Очистка истории заказов
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem(currentOrdersKey);
      location.reload();
    });
  });
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  });

function getOrdersKey() {
  const email = (localStorage.getItem("email") || "").trim().toLowerCase();
  return email ? `orders_${email}` : "orders_guest";
}
   
  
  
