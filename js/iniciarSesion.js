const form = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("contrasenia").value.trim();

  mensaje.textContent = "";

  if (!email || !pass) {
    mensaje.textContent = "❌ Completá todos los campos";
    return;
  }

  if (pass.length < 6) {
    mensaje.textContent = "❌ La contraseña debe tener al menos 6 caracteres";
    return;
  }

  localStorage.setItem("usuario", email);

  mensaje.style.color = "green";
  mensaje.textContent = "✔ Ingresando...";

});