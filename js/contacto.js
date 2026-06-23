document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("form-contacto");

    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputTelefono = document.getElementById("telefono");
    const inputMensaje = document.getElementById("mensaje");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evitamos que la página se recargue

        // Limpiamos los mensajes y estilos de error previos
        limpiarErrores();

        let formularioValido = true;

        //(Requerido, mínimo 3 caracteres)
        const nombreValor = inputNombre.value.trim();
        if (nombreValor === "") {
            mostrarError(inputNombre, "El nombre es obligatorio.");
            formularioValido = false;
        } else if (nombreValor.length < 3) {
            mostrarError(inputNombre, "El nombre debe tener al menos 3 caracteres.");
            formularioValido = false;
        }

        // (Requerido y formato válido)
        const emailValor = inputEmail.value.trim();
        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValor === "") {
            mostrarError(inputEmail, "El correo electrónico es obligatorio.");
            formularioValido = false;
        } else if (!expresionEmail.test(emailValor)) {
            mostrarError(inputEmail, "Por favor, ingresá un correo electrónico válido.");
            formularioValido = false;
        }

        // 3. Validación de Teléfono (Requerido y formato válido)
        const telefonoValor = inputTelefono.value.trim();
        const expresionTelefono = /^[0-9\s\-+()]{7,15}$/;

        if (telefonoValor === "") {
            mostrarError(inputTelefono, "El teléfono es obligatorio.");
            formularioValido = false;
        } else if (!expresionTelefono.test(telefonoValor)) {
            mostrarError(inputTelefono, "Por favor, ingresá un teléfono válido (entre 7 y 15 dígitos).");
            formularioValido = false;
        }

        // 4. Validación de Mensaje (Requerido, mínimo 10 caracteres)
        const mensajeValor = inputMensaje.value.trim();
        if (mensajeValor === "") {
            mostrarError(inputMensaje, "El mensaje es obligatorio.");
            formularioValido = false;
        } else if (mensajeValor.length < 10) {
            mostrarError(inputMensaje, "El mensaje debe contener al menos 10 caracteres.");
            formularioValido = false;
        }

        // Si todos los campos son validos,se envia
        if (formularioValido) {
            alert("¡Mensaje enviado con éxito!");
            formulario.reset(); // Reiniciamos los campos del formulario
        }
    });

    function mostrarError(elementoInput, mensaje) {
        elementoInput.classList.add("input-error");

     
        const mensajeError = document.createElement("span");
        mensajeError.classList.add("error-texto");
        mensajeError.textContent = mensaje;


        elementoInput.parentNode.appendChild(mensajeError);
    }

   
    function limpiarErrores() {
        const inputsConError = formulario.querySelectorAll(".input-error");
        inputsConError.forEach(input => input.classList.remove("input-error"));

        const mensajesDeError = formulario.querySelectorAll(".error-texto");
        mensajesDeError.forEach(mensaje => mensaje.remove());
    }
});