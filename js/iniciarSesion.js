const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("contrasenia").value;
    let errores = "";

    if (!validarEmail(email))
        errores = "Email inválido. ";

    if (!validarContrasenia(password))
        errores += "La contraseña debe tener al menos 6 caracteres.";

    if (errores !== "") {
        mensaje.textContent = errores;
        mensaje.style.color = "red";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar ignorando mayúsculas/minúsculas y espacios
    const existeUsuario = usuarios.find(
        u => u.email.toLowerCase().trim() === email.toLowerCase()
    );

    if (!existeUsuario) {
        mensaje.textContent = "No existe una cuenta con ese email.";
        mensaje.style.color = "red";
        return;
    }

    if (existeUsuario.password !== password) {
        mensaje.textContent = "Contraseña incorrecta.";
        mensaje.style.color = "red";
        return;
    }

    localStorage.setItem("usuarioLogueado", JSON.stringify(existeUsuario));

    mensaje.textContent = "¡Inicio de sesión exitoso!";
    mensaje.style.color = "green";

    setTimeout(() => {
        // Si vino desde checkout, volver ahí; si no, ir al inicio
        const redirigir = sessionStorage.getItem("redirigirDespuesLogin");
        if (redirigir) {
            sessionStorage.removeItem("redirigirDespuesLogin");
            window.location.href = redirigir;
        } else {
            window.location.href = "../index.html";
        }
    }, 1500);
});

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarContrasenia(password) {
    return password.length >= 6;
}