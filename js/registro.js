const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const nombre    = document.getElementById("nombre").value.trim();
    const email     = document.getElementById("email").value.trim();
    const password  = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;
    let errores = "";

    if (!validarNombreCompleto(nombre))
        errores += "Nombre inválido (entre 9 y 40 caracteres). ";

    if (!validarEmail(email))
        errores += "Email inválido. ";

    const errorPass = validarContrasenia(password, confirmar);
    if (errorPass !== "")
        errores += errorPass;

    if (!validarCheckbox())
        errores += "Debés aceptar los términos y condiciones. ";

    if (errores !== "") {
        mensaje.textContent = errores;
        mensaje.style.color = "red";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existe) {
        mensaje.textContent = "Ese email ya está registrado.";
        mensaje.style.color = "red";
        return;
    }

    const nuevoUsuario = {
        id: Date.now(),
        nombre,
        email,
        password,
        reservas: []
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // ── Loguear automáticamente al registrarse ──────────────────
    localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));

    mensaje.textContent = "¡Registro exitoso! Iniciando sesión...";
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

function validarCheckbox() {
    return document.getElementById("terminos").checked;
}

function validarNombreCompleto(nombre) {
    return nombre.length >= 9 && nombre.length < 40;
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarContrasenia(password, confirmar) {
    if (password.length < 6)
        return "La contraseña debe tener al menos 6 caracteres. ";
    if (password !== confirmar)
        return "Las contraseñas no coinciden. ";
    return "";
}