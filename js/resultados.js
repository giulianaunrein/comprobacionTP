
import { renderizarVuelos } from "../js/ArrayVuelos.js";


// ─── GUARDAR VUELO AL HACER CLICK EN COMPRAR ───

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
  const filaVuelta = filas[1] || null;

  const busqueda = JSON.parse(sessionStorage.getItem("busquedaVuelo") || "{}");

  const nombreAerolinea = filaIda.querySelector(".nombreAerolinea").textContent.trim();
  const logoAerolinea   = filaIda.querySelector("img").getAttribute("src");
  const montoTexto      = tarjeta.querySelector(".monto").textContent;
  const precio          = parseInt(montoTexto.replace(/[^\d]/g, ""), 10);

  function datosFila(fila) {
    if (!fila) return { horaSalida:"", horaLlegada:"", ciudadSalida:"", ciudadLlegada:"", duracion:"" };
    const horas   = fila.querySelectorAll(".info .hora strong");
    const ciudades = fila.querySelectorAll(".info .ciudad");
    return {
      horaSalida:    horas[0]    ? horas[0].textContent.trim()    : "",
      horaLlegada:   horas[1]    ? horas[1].textContent.trim()    : "",
      ciudadSalida:  ciudades[0] ? ciudades[0].textContent.trim() : "",
      ciudadLlegada: ciudades[1] ? ciudades[1].textContent.trim() : "",
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
      origen:      busqueda.origen  ? `${busqueda.origen} (${datosIda.ciudadSalida})`   : datosIda.ciudadSalida,
      destino:     busqueda.destino ? `${busqueda.destino} (${datosIda.ciudadLlegada})` : datosIda.ciudadLlegada,
      horaSalida:  datosIda.horaSalida,
      horaLlegada: datosIda.horaLlegada,
      duracion:    datosIda.duracion,
      fecha:       formatearFecha(busqueda.fechaIda)
    },
    vuelta: filaVuelta ? {
      origen:      busqueda.destino ? `${busqueda.destino} (${datosVuelta.ciudadSalida})`  : datosVuelta.ciudadSalida,
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
  const dias  = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const fecha = new Date(fechaISO + "T00:00:00");
  return `${dias[fecha.getDay()]}. ${fecha.getDate()} ${meses[fecha.getMonth()]}`;
}


// ─── CARGAR DATOS DE BÚSQUEDA EN EL PANEL LATERAL ───

function cargarDatosBusqueda() {
  const datosGuardados = sessionStorage.getItem("busquedaVuelo");
  if (!datosGuardados) return;
  const busqueda = JSON.parse(datosGuardados);

  const get = id => document.getElementById(id);

  if (get("input-origen")       && busqueda.origen)      get("input-origen").value      = busqueda.origen;
  if (get("input-destino")      && busqueda.destino)     get("input-destino").value     = busqueda.destino;
  if (get("input-fecha-salida") && busqueda.fechaIda)    get("input-fecha-salida").value = busqueda.fechaIda;
  if (get("input-fecha-vuelta") && busqueda.fechaVuelta) get("input-fecha-vuelta").value = busqueda.fechaVuelta;
  if (get("passengers")         && busqueda.pasajeros)   get("passengers").value        = busqueda.pasajeros;

  const selectClase = get("select-clase");
  if (selectClase && busqueda.clase) {
    const coincidencia = Array.from(selectClase.options).find(
      opt => opt.value.toLowerCase().trim() === busqueda.clase.toLowerCase().trim()
    );
    if (coincidencia) selectClase.value = coincidencia.value;
  }

  const botonesTipo = document.querySelectorAll(".tipo-vuelo button");
  if (busqueda.tipoVuelo && botonesTipo.length === 2) {
    botonesTipo.forEach(btn => btn.classList.remove("activo"));
    botonesTipo[busqueda.tipoVuelo.toLowerCase().includes("solo") ? 1 : 0].classList.add("activo");
  }
}


// ─── FILTROS ───

const COSTO_EQUIPAJE = { personal: 0, mano: 35, bodega: 60 };

const filtros = {
  escalas:    new Set(),
  equipaje:   new Set(),
  aerolineas: new Set(),
  precioMax:  Infinity
};

function inicializarFiltros() {
  configurarGrupoFiltro("escalas",
    ["direct", "1scale", "2scale"], "all-scales",
    { direct: "directo", "1scale": "1escala", "2scale": "2escalas" }
  );
  configurarGrupoFiltro("equipaje",
    ["staff", "hand", "store"], "all-options",
    { staff: "personal", hand: "mano", store: "bodega" }
  );
  configurarGrupoFiltro("aerolineas",
    ["argentinas", "europa", "iberia", "latam", "lufthansa"], "all-airlines",
    {
      argentinas: "aerolineas-argentinas",
      europa:     "air-europa",
      iberia:     "iberia",
      latam:      "latam",
      lufthansa:  "lufthansa"
    }
  );
}

function configurarGrupoFiltro(nombreFiltro, ids, idTodas, mapaValores) {
  const checkboxTodas = document.getElementById(idTodas);
  const checks = ids.map(id => document.getElementById(id));

  checkboxTodas?.addEventListener("change", () => {
    checks.forEach(cb => { if (cb) cb.checked = checkboxTodas.checked; });
    actualizarFiltro(nombreFiltro, ids, mapaValores);
    aplicarFiltros();
  });

  checks.forEach(cb => {
    if (!cb) return;
    cb.addEventListener("change", () => {
      if (!cb.checked && checkboxTodas) checkboxTodas.checked = false;
      if (checks.every(c => c?.checked) && checkboxTodas) checkboxTodas.checked = true;
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
    if (cb?.checked) filtros[nombreFiltro].add(mapaValores[id]);
  });
}

function inicializarRangoPrecio() {
  const range = document.querySelector(".range");
  const spans = document.querySelectorAll(".rango-valores span");
  if (!range) return;

  const MIN = 100, MAX = 5000;
  range.min   = MIN;
  range.max   = MAX;
  range.value = MAX;

  const actualizar = () => {
    const val = parseInt(range.value, 10);
    spans[0].textContent = `US$ ${MIN.toLocaleString("es-AR")}`;
    spans[1].textContent = `US$ ${val.toLocaleString("es-AR")}`;
    filtros.precioMax = val;
  };

  range.addEventListener("input", () => { actualizar(); aplicarFiltros(); });
  actualizar();
}

function aplicarFiltros() {
  const contenedor = document.querySelector(".opciones-vuelos");
  const tarjetas   = document.querySelectorAll(".tarjeta-vuelo");

  // Si el contenedor tiene el mensaje de "sin resultados de búsqueda", no hacer nada
  if (!contenedor || tarjetas.length === 0) return;

  let visibles = 0;

  tarjetas.forEach(tarjeta => {
    const precio    = parseInt(tarjeta.dataset.precio, 10);
    const aerolinea = tarjeta.dataset.aerolinea;
    const escalas   = tarjeta.dataset.escalas;

    const visible =
      precio <= filtros.precioMax &&
      (filtros.escalas.size    === 0 || filtros.escalas.has(escalas)) &&
      (filtros.aerolineas.size === 0 || filtros.aerolineas.has(aerolinea));

    tarjeta.style.display = visible ? "" : "none";
    if (visible) visibles++;
  });

  // Mensaje de sin resultados por filtros (distinto al de búsqueda)
  let msg = document.getElementById("sin-resultados-filtros");
  if (visibles === 0) {
    if (!msg) {
      msg = document.createElement("p");
      msg.id = "sin-resultados-filtros";
      msg.textContent = "No se encontraron vuelos con los filtros seleccionados.";
      msg.style.cssText = "text-align:center; padding:2em; color:#777; font-size:1.1em;";
      contenedor.appendChild(msg);
    }
  } else {
    msg?.remove();
  }
}

function tarjetaIncluyeEquipaje(tarjeta, tipo) {
  const clase = { personal:"mochila", mano:"valija", bodega:"maleta" }[tipo];
  const img   = tarjeta.querySelector(`.${clase}`);
  return img ? img.getAttribute("src").toLowerCase().includes("-color") : false;
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

    let detalle = tarjeta.querySelector(".extra-equipaje");
    if (extra > 0) {
      if (!detalle) {
        detalle = document.createElement("span");
        detalle.className = "extra-equipaje";
        detalle.style.cssText = "font-size:0.7em; color:#999; display:block;";
        tarjeta.querySelector(".precio").insertBefore(detalle, tarjeta.querySelector(".boton-accion"));
      }
      detalle.textContent = `+US$ ${extra} por equipaje`;
    } else {
      detalle?.remove();
    }
  });
}


// ─── INICIALIZACIÓN ───

document.addEventListener("DOMContentLoaded", () => {
  cargarDatosBusqueda();   // Muestra los datos de búsqueda en el panel lateral
  renderizarVuelos();      // Genera las tarjetas desde ArrayVuelos.js (con mensaje si no hay)
  inicializarFiltros();
  inicializarRangoPrecio();
  aplicarFiltros();
  inicializarBotonesComprar();
});