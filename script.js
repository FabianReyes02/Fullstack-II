// Registro
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const addProductForm = document.getElementById("addProductForm");
  const productTable = document.getElementById("productTable")?.querySelector("tbody");

  // === Registro ===
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

      if (name.length < 3) return alert("El nombre debe tener al menos 3 caracteres");
      if (!emailRegex.test(email)) return alert("Correo no válido");
      if (password.length < 4 || password.length > 10) return alert("La contraseña debe tener entre 4 y 10 caracteres");

      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      alert("Usuario registrado con éxito");
      window.location.href = "login.html";
    });
  }

  // === Login ===
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.email === email && user.password === password) {
        alert("Inicio de sesión exitoso");
        window.location.href = "index.html";
      } else {
        alert("Correo o contraseña incorrectos");
      }
    });
  }

  // === Administración ===
  if (addProductForm && productTable) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("productName").value.trim();
      const price = document.getElementById("productPrice").value.trim();
      const image = document.getElementById("productImage").value.trim() || "img/perfume1.jpg";

      const row = document.createElement("tr");
      row.innerHTML = `<td>${name}</td><td>$${price}</td><td><img src="${image}" width="50"></td>`;
      productTable.appendChild(row);

      alert("Producto agregado");
      addProductForm.reset();
    });
  }
});
