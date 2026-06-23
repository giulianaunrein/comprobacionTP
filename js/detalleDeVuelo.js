
// CARGA DINÁMICA DE INFORMACIÓN DEL VUELO

function cargarVueloSeleccionado() {
  const guardado = sessionStorage.getItem("vueloSeleccionado");
  if (guardado) {
    datoVuelo = JSON.parse(guardado);
  }
}


function extraerCodigo(texto) {
  if (!texto) return "";
  const match = texto.match(/\(([^)]+)\)/);
  return match ? match[1] : texto;
}

function cargarInfoVuelo() {
  const tramos = document.querySelectorAll(".tramo-vuelo");
  if (tramos.length < 2) return;

  const tramoIda = tramos[0];
  const tramoVuelta = tramos[1];

  // ---------- IDA ----------
  const infoIda = tramoIda.querySelector(".info");
  if (infoIda) infoIda.textContent = `Ida: ${datoVuelo.ida.origen} ➔ ${datoVuelo.ida.destino}`;

  const horaIdaSalida = tramoIda.querySelector(".punto-partida .hora strong");
  const horaIdaLlegada = tramoIda.querySelector(".punto-llegada .hora strong");
  if (horaIdaSalida) horaIdaSalida.textContent = datoVuelo.ida.horaSalida;
  if (horaIdaLlegada) horaIdaLlegada.textContent = datoVuelo.ida.horaLlegada;

  const ciudadIdaPartida = tramoIda.querySelector(".punto-partida .ciudad");
  const ciudadIdaLlegada = tramoIda.querySelector(".punto-llegada .ciudad");
  if (ciudadIdaPartida) ciudadIdaPartida.textContent = extraerCodigo(datoVuelo.ida.origen);
  if (ciudadIdaLlegada) ciudadIdaLlegada.textContent = extraerCodigo(datoVuelo.ida.destino);

  const duracionIda = tramoIda.querySelector(".duracion-mini");
  if (duracionIda) duracionIda.textContent = datoVuelo.ida.duracion;

  const listaIda = tramoIda.querySelectorAll("ul li");
  if (listaIda.length >= 5) {
    listaIda[0].innerHTML = `<img class="chico icono-vuelo" src="../images/calendario.svg"> ${datoVuelo.ida.fecha}`;
    listaIda[1].innerHTML = `<img class="chico icono-vuelo" src="../images/tiempo.svg"> Duración: ${datoVuelo.ida.duracion}`;
    listaIda[3].innerHTML = `<img class="chico icono-vuelo" src="${datoVuelo.aerolineaLogo}"> ${datoVuelo.aerolineaNombre}`;
  }

  // ---------- VUELTA ----------
  const infoVuelta = tramoVuelta.querySelector(".info");
  if (infoVuelta) infoVuelta.textContent = `Vuelta: ${datoVuelo.vuelta.origen} ➔ ${datoVuelo.vuelta.destino}`;

  const horaVueltaSalida = tramoVuelta.querySelector(".punto-partida .hora strong");
  const horaVueltaLlegada = tramoVuelta.querySelector(".punto-llegada .hora strong");
  if (horaVueltaSalida) horaVueltaSalida.textContent = datoVuelo.vuelta.horaSalida;
  if (horaVueltaLlegada) horaVueltaLlegada.textContent = datoVuelo.vuelta.horaLlegada;

  const ciudadVueltaPartida = tramoVuelta.querySelector(".punto-partida .ciudad");
  const ciudadVueltaLlegada = tramoVuelta.querySelector(".punto-llegada .ciudad");
  if (ciudadVueltaPartida) ciudadVueltaPartida.textContent = extraerCodigo(datoVuelo.vuelta.origen);
  if (ciudadVueltaLlegada) ciudadVueltaLlegada.textContent = extraerCodigo(datoVuelo.vuelta.destino);

  const duracionVuelta = tramoVuelta.querySelector(".duracion-mini");
  if (duracionVuelta) duracionVuelta.textContent = datoVuelo.vuelta.duracion;

  const listaVuelta = tramoVuelta.querySelectorAll("ul li");
  if (listaVuelta.length >= 5) {
    listaVuelta[0].innerHTML = `<img class="chico icono-vuelo" src="../images/calendario.svg"> ${datoVuelo.vuelta.fecha}`;
    listaVuelta[1].innerHTML = `<img class="chico icono-vuelo" src="../images/tiempo.svg"> Duración: ${datoVuelo.vuelta.duracion}`;
    listaVuelta[3].innerHTML = `<img class="chico icono-vuelo" src="${datoVuelo.aerolineaLogo}"> ${datoVuelo.aerolineaNombre}`;
  }

  // ---------- PRECIO EN EL PANEL DE DETALLE ----------
  const montoDetalle = document.querySelector(".detalle .monto");
  if (montoDetalle) montoDetalle.textContent = `US$ ${datoVuelo.precio.toLocaleString("es-AR")}`;
}


//RECÁLCULO DINÁMICO DEL RESUMEN DE PRECIO

function actualizarResumen() {
  const base = datoVuelo.precio;
  const total = base + IMPUESTOS;

  const montosIndividuales = document.querySelectorAll(".monto-individual");
  if (montosIndividuales[0]) montosIndividuales[0].textContent = `US$ ${base.toLocaleString("es-AR")}`;
  if (montosIndividuales[1]) montosIndividuales[1].textContent = `US$ ${IMPUESTOS.toLocaleString("es-AR")}`;

  const montoFinal = document.querySelector(".monto-final");
  if (montoFinal) montoFinal.textContent = `US$ ${total.toLocaleString("es-AR")}`;

  // Mostrar qué asientos están elegidos dentro del resumen
  let resumenAsientos = document.getElementById("resumen-asientos");
  if (!resumenAsientos) {
    resumenAsientos = document.createElement("div");
    resumenAsientos.id = "resumen-asientos";
    resumenAsientos.style.cssText = "margin: 0.8em 0; font-size: 0.85em; color: #555;";
    const separador = document.querySelector(".resumen-precio .separador-puntos");
    if (separador) separador.before(resumenAsientos);
  }

  const textoIda = seleccion.ida
    ? `✔ Asiento ida: <strong>${seleccion.ida}</strong>`
    : "⚠ Sin asiento de ida";
  const textoVuelta = seleccion.vuelta
    ? `✔ Asiento vuelta: <strong>${seleccion.vuelta}</strong>`
    : "⚠ Sin asiento de vuelta";
  resumenAsientos.innerHTML = `<p>${textoIda}</p><p>${textoVuelta}</p>`;
}


// ESTADO VISUAL Y ALMACENAMIENTO DE ASIENTOS

function inicializarAsientos() {
  document.querySelectorAll('input[name="asiento-ida"]').forEach(radio => {
    radio.addEventListener("change", function () {
      seleccion.ida = this.id.replace("outbound-", "");
      actualizarResumen();
      mostrarNotificacion(`Asiento de ida seleccionado: ${seleccion.ida}`);
    });
  });

  document.querySelectorAll('input[name="asiento-vuelta"]').forEach(radio => {
    radio.addEventListener("change", function () {
      seleccion.vuelta = this.id.replace("lap-", "");
      actualizarResumen();
      mostrarNotificacion(`Asiento de vuelta seleccionado: ${seleccion.vuelta}`);
    });
  });
}


// VALIDACIÓN DEL BOTÓN CONTINUAR
function inicializarBotonContinuar() {
  const boton = document.querySelector(".boton-continuar");
  if (!boton) return;

  boton.addEventListener("click", function (e) {
    e.preventDefault();

    if (!seleccion.ida) {
      mostrarError("Por favor seleccioná un asiento de ida para continuar.");
      return;
    }
    if (!seleccion.vuelta) {
      mostrarError("Por favor seleccioná un asiento de vuelta para continuar.");
      return;
    }

    sessionStorage.setItem("asientoIda", seleccion.ida);
    sessionStorage.setItem("asientoVuelta", seleccion.vuelta);
    sessionStorage.setItem("totalPrecio", datoVuelo.precio + IMPUESTOS);

    window.location.href = boton.getAttribute("href");
  });
}

// notificación y mensaje de error
function mostrarNotificacion(mensaje) {
  mostrarMensajeFlotante(mensaje, "notif-asiento", "#315762");
}

function mostrarError(mensaje) {
  mostrarMensajeFlotante(mensaje, "error-asiento", "#c0392b");
}

function mostrarMensajeFlotante(mensaje, id, color) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    el.style.cssText = `
      position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
      background: ${color}; color: white; padding: 0.7em 1.5em;
      border-radius: 2em; font-size: 0.95rem; z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: opacity 0.4s;
    `;
    document.body.appendChild(el);
  }
  el.textContent = mensaje;
  el.style.opacity = "1";
  clearTimeout(el._timeout);
  el._timeout = setTimeout(() => (el.style.opacity = "0"), 2800);
}

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  cargarVueloSeleccionado();
  cargarInfoVuelo();
  actualizarResumen();
  inicializarAsientos();
  inicializarBotonContinuar();
});
