
import { vuelos, renderizarVuelos } from "../js/ArrayVuelos.js";


// ─────────────────────────────────────────────
//  GUARDAR VUELO ELEGIDO AL HACER CLICK EN COMPRAR
// ─────────────────────────────────────────────
function inicializarBotonesComprar() {
  document.querySelectorAll(".tarjeta-vuelo .boton-accion").forEach(boton => {
    boton.addEventListener("click", function (e) {
      e.preventDefault();
      const tarjeta = this.closest(".tarjeta-vuelo");
      const vuelo = extraerDatosVuelo(tarjeta);
      sessionStorage.setItem("vueloSeleccionado", JSON.stringify(vuelo));
      window.location.href = this.getAttribute("href");
    });
  });
}

function extraerDatosVuelo(tarjeta) {
  const filas = tarjeta.querySelectorAll(".fila");
  const filaIda = filas[0];
  const filaVuelta = filas[1];

  const busquedaGuardada = sessionStorage.getItem("busquedaVuelo");
  const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : {};

  const nombreAerolinea = filaIda.querySelector(".nombreAerolinea").textContent.trim();
  const logoAerolinea = filaIda.querySelector("img").getAttribute("src");

  const montoTexto = tarjeta.querySelector(".monto").textContent;
  const precio = parseInt(montoTexto.replace(/[^\d]/g, ""), 10);

  function datosFila(fila) {
    if (!fila) return { horaSalida:"", horaLlegada:"", ciudadSalida:"", ciudadLlegada:"", duracion:"" };
    const horas = fila.querySelectorAll(".info .hora strong");
    const ciudades = fila.querySelectorAll(".info .ciudad");
    return {
      horaSalida:   horas[0]   ? horas[0].textContent.trim()   : "",
      horaLlegada:  horas[1]   ? horas[1].textContent.trim()   : "",
      ciudadSalida: ciudades[0] ? ciudades[0].textContent.trim() : "",
      ciudadLlegada:ciudades[1] ? ciudades[1].textContent.trim() : "",
      duracion: fila.querySelector(".tiempo").textContent.trim()
    };
  }

  const datosIda    = datosFila(filaIda);
  const datosVuelta = datosFila(filaVuelta);

  return {
    precio,
    aerolineaNombre: nombreAerolinea,
    aerolineaLogo: logoAerolinea,
    ida: {
      origen:      busqueda.origen  ? `${busqueda.origen} (${datosIda.ciudadSalida})`  : datosIda.ciudadSalida,
      destino:     busqueda.destino ? `${busqueda.destino} (${datosIda.ciudadLlegada})`: datosIda.ciudadLlegada,
      horaSalida:  datosIda.horaSalida,
      horaLlegada: datosIda.horaLlegada,
      duracion:    datosIda.duracion,
      fecha:       formatearFecha(busqueda.fechaIda)
    },
    vuelta: filaVuelta ? {
      origen:      busqueda.destino ? `${busqueda.destino} (${datosVuelta.ciudadSalida})` : datosVuelta.ciudadSalida,
      destino:     busqueda.origen  ? `${busqueda.origen} (${datosVuelta.ciudadLlegada})` : datosVuelta.ciudadLlegada,
      horaSalida:  datosVuelta.horaSalida,
      horaLlegada: datosVuelta.horaLlegada,
      duracion:    datosVuelta.duracion,
      fecha:       formatearFecha(busqueda.fechaVuelta)
    } : null
  };
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return "";
  const dias   = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
  const meses  = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                   "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const fecha  = new Date(fechaISO + "T00:00:00");
  return `${dias[fecha.getDay()]}. ${fecha.getDate()} ${meses[fecha.getMonth()]}`;
}


// ─────────────────────────────────────────────
//  CARGAR DATOS DE BÚSQUEDA EN EL PANEL LATERAL
// ─────────────────────────────────────────────
function cargarDatosBusqueda() {
  const datosGuardados = sessionStorage.getItem("busquedaVuelo");
  if (!datosGuardados) return;

  const busqueda = JSON.parse(datosGuardados);

  const inputOrigen      = document.getElementById("input-origen");
  const inputDestino     = document.getElementById("input-destino");
  const inputFechaSalida = document.getElementById("input-fecha-salida");
  const inputFechaVuelta = document.getElementById("input-fecha-vuelta");
  const inputPasajeros   = document.getElementById("passengers");
  const selectClase      = document.getElementById("select-clase");

  if (inputOrigen      && busqueda.origen)      inputOrigen.value      = busqueda.origen;
  if (inputDestino     && busqueda.destino)     inputDestino.value     = busqueda.destino;
  if (inputFechaSalida && busqueda.fechaIda)    inputFechaSalida.value = busqueda.fechaIda;
  if (inputFechaVuelta && busqueda.fechaVuelta) inputFechaVuelta.value = busqueda.fechaVuelta;
  if (inputPasajeros   && busqueda.pasajeros)   inputPasajeros.value   = busqueda.pasajeros;

  if (selectClase && busqueda.clase) {
    const opciones = Array.from(selectClase.options);
    const coincidencia = opciones.find(
      opt => opt.value.toLowerCase().trim() === busqueda.clase.toLowerCase().trim()
    );
    if (coincidencia) selectClase.value = coincidencia.value;
  }

  const botonesTipo = document.querySelectorAll(".tipo-vuelo button");
  if (busqueda.tipoVuelo && botonesTipo.length === 2) {
    botonesTipo.forEach(btn => btn.classList.remove("activo"));
    if (busqueda.tipoVuelo.toLowerCase().includes("solo")) {
      botonesTipo[1].classList.add("activo");
    } else {
      botonesTipo[0].classList.add("activo");
    }
  }
}


// ─────────────────────────────────────────────
//  FILTROS
// ─────────────────────────────────────────────
const COSTO_EQUIPAJE = { personal: 0, mano: 35, bodega: 60 };

const filtros = {
  escalas:   new Set(),
  equipaje:  new Set(),
  aerolineas: new Set(),
  precioMax: Infinity
};

function inicializarFiltros() {
  configurarGrupoFiltro("escalas",    ["direct","1scale","2scale"],                            "all-scales",   { direct:"directo", "1scale":"1escala", "2scale":"2escalas" });
  configurarGrupoFiltro("equipaje",   ["staff","hand","store"],                                 "all-options",  { staff:"personal", hand:"mano", store:"bodega" });
  configurarGrupoFiltro("aerolineas", ["argentinas","europa","iberia","latam","lufthansa"],     "all-airlines", { argentinas:"aerol-neas-argentinas", europa:"air-europa", iberia:"iberia", latam:"latam", lufthansa:"lufthansa" });
}

function configurarGrupoFiltro(nombreFiltro, ids, idTodas, mapaValores) {
  const checkboxTodas = document.getElementById(idTodas);
  const checkboxesIndividuales = ids.map(id => document.getElementById(id));

  if (checkboxTodas) {
    checkboxTodas.addEventListener("change", function () {
      checkboxesIndividuales.forEach(cb => { if (cb) cb.checked = checkboxTodas.checked; });
      actualizarFiltro(nombreFiltro, ids, mapaValores);
      aplicarFiltros();
    });
  }

  checkboxesIndividuales.forEach(cb => {
    if (!cb) return;
    cb.addEventListener("change", function () {
      if (!cb.checked && checkboxTodas) checkboxTodas.checked = false;
      const todosMarcados = checkboxesIndividuales.every(c => c && c.checked);
      if (checkboxTodas) checkboxTodas.checked = todosMarcados;
      actualizarFiltro(nombreFiltro, ids, mapaValores);
      aplicarFiltros();
      if (nombreFiltro === "equipaje") actualizarPreciosConEquipaje();
    });
  });
}

function actualizarFiltro(nombreFiltro, ids, mapaValores) {
  filtros[nombreFiltro].clear();
  ids.forEach(id => {
    const cb = document.getElementById(id);
    if (cb && cb.checked) filtros[nombreFiltro].add(mapaValores[id]);
  });
}

function inicializarRangoPrecio() {
  const range = document.querySelector(".range");
  const spans = document.querySelectorAll(".rango-valores span");
  if (!range) return;

  const PRECIO_MIN = 100;
  const PRECIO_MAX = 5000;
  range.min   = PRECIO_MIN;
  range.max   = PRECIO_MAX;
  range.value = PRECIO_MAX;

  function actualizarTextoRango() {
    const valorActual = parseInt(range.value, 10);
    spans[0].textContent = `US$ ${PRECIO_MIN.toLocaleString("es-AR")}`;
    spans[1].textContent = `US$ ${valorActual.toLocaleString("es-AR")}`;
    filtros.precioMax = valorActual;
  }

  range.addEventListener("input", function () {
    actualizarTextoRango();
    aplicarFiltros();
  });

  actualizarTextoRango();
}

function aplicarFiltros() {
  const tarjetas = document.querySelectorAll(".tarjeta-vuelo");
  if (tarjetas.length === 0) return;

  let visibles = 0;

  tarjetas.forEach(tarjeta => {
    const precio     = parseInt(tarjeta.dataset.precio, 10);
    const aerolinea  = tarjeta.dataset.aerolinea;
    const escalas    = tarjeta.dataset.escalas;

    const pasaPrecio    = precio <= filtros.precioMax;
    const pasaEscalas   = filtros.escalas.size    === 0 || filtros.escalas.has(escalas);
    const pasaAerolinea = filtros.aerolineas.size === 0 || filtros.aerolineas.has(aerolinea);

    const visible = pasaPrecio && pasaEscalas && pasaAerolinea;
    tarjeta.style.display = visible ? "" : "none";
    if (visible) visibles++;
  });

  mostrarMensajeSinResultados(visibles);
}

function mostrarMensajeSinResultados(cantidadVisible) {
  const tarjetas = document.querySelectorAll(".tarjeta-vuelo");
  if (tarjetas.length === 0) return;

  let mensaje = document.getElementById("sin-resultados");
  if (cantidadVisible === 0) {
    if (!mensaje) {
      mensaje = document.createElement("p");
      mensaje.id = "sin-resultados";
      mensaje.textContent = "No se encontraron vuelos con los filtros seleccionados.";
      mensaje.style.cssText = "text-align:center; padding:2em; color:#777; font-size:1.1em;";
      document.querySelector(".opciones-vuelos").appendChild(mensaje);
    }
  } else if (mensaje) {
    mensaje.remove();
  }
}

function tarjetaIncluyeEquipaje(tarjeta, tipo) {
  const claseImg = { personal:"mochila", mano:"valija", bodega:"maleta" }[tipo];
  const img = tarjeta.querySelector(`.${claseImg}`);
  if (!img) return false;
  return img.getAttribute("src").toLowerCase().includes("-color");
}

function actualizarPreciosConEquipaje() {
  document.querySelectorAll(".tarjeta-vuelo").forEach(tarjeta => {
    const precioBase = parseInt(tarjeta.dataset.precio, 10);
    let extra = 0;

    filtros.equipaje.forEach(tipo => {
      if (!tarjetaIncluyeEquipaje(tarjeta, tipo)) extra += COSTO_EQUIPAJE[tipo];
    });

    const montoEl = tarjeta.querySelector(".monto");
    if (montoEl) {
      montoEl.textContent = `US$ ${(precioBase + extra).toLocaleString("es-AR")}`;
      montoEl.style.color = extra > 0 ? "#E9631A" : "";
    }

    let detalleExtra = tarjeta.querySelector(".extra-equipaje");
    if (extra > 0) {
      if (!detalleExtra) {
        detalleExtra = document.createElement("span");
        detalleExtra.className = "extra-equipaje";
        detalleExtra.style.cssText = "font-size:0.7em; color:#999; display:block;";
        tarjeta.querySelector(".precio").insertBefore(detalleExtra, tarjeta.querySelector(".boton-accion"));
      }
      detalleExtra.textContent = `incluye +US$ ${extra} equipaje`;
    } else if (detalleExtra) {
      detalleExtra.remove();
    }
  });
}


// ─────────────────────────────────────────────
//  INICIALIZACIÓN
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  cargarDatosBusqueda();   // Completa el panel lateral con la búsqueda guardada
  renderizarVuelos();      // Genera y muestra las tarjetas desde ArrayVuelos.js
  inicializarFiltros();
  inicializarRangoPrecio();
  aplicarFiltros();
  inicializarBotonesComprar();
});