document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-busqueda");
  const mensaje = document.getElementById("mensajeDeError");
  const inputVuelta = document.getElementById("fecha-vuelta");

  if (!form) return;

  // --- Bloquear fechas pasadas---
  const hoy = new Date().toISOString().split("T")[0];
  document.getElementById("fecha-ida").min = hoy;
  document.getElementById("fecha-vuelta").min = hoy;

  // Cuando cambia fecha de ida, la vuelta no puede ser anterior
  document.getElementById("fecha-ida").addEventListener("change", function () {
    if (inputVuelta) {
      inputVuelta.min = this.value || hoy;
    }
  });
  
  // --- 1. Lógica para bloquear/desbloquear fecha de vuelta ---
  const radioTipos = form.querySelectorAll('input[name="tipo"]');

  function actualizarEstadoVuelta() {
    const radioTipo = form.querySelector('input[name="tipo"]:checked');
    const tipoVueloText = radioTipo ? radioTipo.parentElement.textContent.trim().toLowerCase() : "ida y vuelta";

    if (inputVuelta) {
      // Si el texto del tipo de vuelo NO incluye la palabra "vuelta" (ej. "Solo ida" o "Ida")
      if (!tipoVueloText.includes("vuelta")) {
        inputVuelta.disabled = true;
        inputVuelta.value = ""; // Limpiamos el valor para no enviar una fecha residual
        inputVuelta.style.opacity = "0.5"; // Efecto visual de deshabilitado
      } else {
        inputVuelta.disabled = false;
        inputVuelta.style.opacity = "1";
      }
    }
  }

  // Escuchar cambios en los botones de tipo de vuelo
  radioTipos.forEach(radio => {
    radio.addEventListener("change", actualizarEstadoVuelta);
  });

  // Ejecutar al cargar la página por si el formulario inicia con "Solo ida" preseleccionado
  actualizarEstadoVuelta();


  // --- 2. Manejo del Envío del Formulario ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const origen = document.getElementById("origen").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const ida = document.getElementById("fecha-ida").value;
    const vuelta = inputVuelta ? inputVuelta.value : "";
    const pasajeros = document.getElementById("pasajeros").value;
    const clase = document.getElementById("clase").value;

    const radioTipo = form.querySelector('input[name="tipo"]:checked');
    const tipoVuelo = radioTipo ? radioTipo.parentElement.textContent.trim() : "Ida y vuelta";

    if (mensaje) {
      mensaje.textContent = "";
      mensaje.style.color = "red";
    }

    // Validaciones básicas de campos vacíos
    if (!origen || !destino || !ida || !pasajeros) {
      if (mensaje) mensaje.textContent = "❌ Completá todos los campos obligatorios";
      return;
    }

    if (origen.toLowerCase() === destino.toLowerCase()) {
      if (mensaje) mensaje.textContent = "❌ Origen y destino no pueden ser iguales";
      return;
    }

    const cant = parseInt(pasajeros);
    if (isNaN(cant) || cant < 1) {
      if (mensaje) mensaje.textContent = "❌ Ingresá una cantidad válida de pasajeros";
      return;
    }

    // Validación de fecha de vuelta (solo si el campo está activo y fue completado)
    if (inputVuelta && !inputVuelta.disabled && vuelta) {
      if (vuelta < ida) {
        if (mensaje) mensaje.textContent = "❌ La fecha de vuelta no puede ser anterior a la de ida";
        return;
      }
    }

    if (mensaje) {
      mensaje.style.color = "green";
      mensaje.textContent = "✔ Buscando vuelos...";
    }

    const busqueda = {
      origen,
      destino,
      fechaIda: ida,
      // Si la fecha de vuelta está deshabilitada, guardamos un string vacío
      fechaVuelta: inputVuelta && !inputVuelta.disabled ? vuelta : "",
      pasajeros: cant,
      clase,
      tipoVuelo
    };

    sessionStorage.setItem("busquedaVuelo", JSON.stringify(busqueda));

    setTimeout(() => {
      window.location.href = "pages/resultados.html";
    }, 800);
  });
});
