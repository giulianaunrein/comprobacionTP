import { renderizarVuelos } from "js/data/ArrayVuelos.js";
// NOTA: si el archivo se llama "ArrayVuelos.js" y está en la carpeta "js/", esta ruta es correcta.
// Si está en otra ubicación, ajustá la ruta acá.


// ─── PRECARGAR FORMULARIO LATERAL CON LA BÚSQUEDA ───────────

function precargarFormularioBusqueda() {
    const busquedaGuardada = sessionStorage.getItem("busquedaVuelo");
    if (!busquedaGuardada) return;
    const busqueda = JSON.parse(busquedaGuardada);

    // Selectores igual que el resultados-render.js original
    const inputOrigen  = document.querySelector(".contenedor-viaje .origenydestino:first-child input");
    const inputDestino = document.querySelector(".contenedor-viaje .origenydestino:last-child input");
    const inputFechaIda    = document.querySelector(".contenedor-fechas .fecha:first-child input");
    const inputFechaVuelta = document.querySelector(".contenedor-fechas .fecha:last-child input");
    const inputPasajeros   = document.getElementById("passengers");
    const selectClase      = document.getElementById("select-clase");

    if (inputOrigen      && busqueda.origen)      inputOrigen.value      = busqueda.origen;
    if (inputDestino     && busqueda.destino)     inputDestino.value     = busqueda.destino;
    if (inputFechaIda    && busqueda.fechaIda)    inputFechaIda.value    = busqueda.fechaIda;
    if (inputFechaVuelta && busqueda.fechaVuelta) inputFechaVuelta.value = busqueda.fechaVuelta;
    if (inputPasajeros   && busqueda.pasajeros)   inputPasajeros.value   = busqueda.pasajeros;

    if (selectClase && busqueda.clase) {
        const match = Array.from(selectClase.options).find(
            opt => opt.value.toLowerCase().trim() === busqueda.clase.toLowerCase().trim()
        );
        if (match) selectClase.value = match.value;
    }

    // Botones Ida y vuelta / Solo ida
    const botones = document.querySelectorAll(".tipo-vuelo button");
    if (busqueda.tipoVuelo && botones.length === 2) {
        botones.forEach(b => b.classList.remove("activo"));
        botones[busqueda.tipoVuelo.toLowerCase().includes("solo") ? 1 : 0].classList.add("activo");
    }
}


// ─── GUARDAR VUELO AL HACER CLICK EN COMPRAR ────────────────

function inicializarBotonesComprar() {
    document.querySelectorAll(".tarjeta-vuelo .boton-accion").forEach(boton => {
        boton.addEventListener("click", function (e) {
            e.preventDefault();
            const tarjeta = this.closest(".tarjeta-vuelo");
            const vuelo   = extraerDatosVuelo(tarjeta);
            sessionStorage.setItem("vueloSeleccionado", JSON.stringify(vuelo));
            window.location.href = this.getAttribute("href");
        });
    });
}

function extraerDatosVuelo(tarjeta) {
    const filas   = tarjeta.querySelectorAll(".fila");
    const filaIda = filas[0];
    const filaVuelta = filas[1] || null;
    const busqueda   = JSON.parse(sessionStorage.getItem("busquedaVuelo") || "{}");

    const nombreAerolinea = filaIda.querySelector(".nombreAerolinea")?.textContent.trim() || "";
    const logoAerolinea   = filaIda.querySelector("img")?.getAttribute("src") || "";
    const precio          = parseInt((tarjeta.querySelector(".monto")?.textContent || "0").replace(/[^\d]/g, ""), 10);

    function datosFila(fila) {
        if (!fila) return {};
        const horas    = fila.querySelectorAll(".hora strong");
        const ciudades = fila.querySelectorAll(".ciudad");
        return {
            horaSalida:    horas[0]?.textContent.trim()    || "",
            horaLlegada:   horas[1]?.textContent.trim()    || "",
            ciudadSalida:  ciudades[0]?.textContent.trim() || "",
            ciudadLlegada: ciudades[1]?.textContent.trim() || "",
            duracion:      fila.querySelector(".tiempo")?.textContent.trim() || ""
        };
    }

    const ida    = datosFila(filaIda);
    const vuelta = datosFila(filaVuelta);

    return {
        precio, aerolineaNombre: nombreAerolinea, aerolineaLogo: logoAerolinea,
        ida: {
            origen:      busqueda.origen  ? `${busqueda.origen} (${ida.ciudadSalida})`    : ida.ciudadSalida,
            destino:     busqueda.destino ? `${busqueda.destino} (${ida.ciudadLlegada})`  : ida.ciudadLlegada,
            horaSalida:  ida.horaSalida,
            horaLlegada: ida.horaLlegada,
            duracion:    ida.duracion,
            fecha:       formatearFecha(busqueda.fechaIda)
        },
        vuelta: filaVuelta ? {
            origen:      busqueda.destino ? `${busqueda.destino} (${vuelta.ciudadSalida})`  : vuelta.ciudadSalida,
            destino:     busqueda.origen  ? `${busqueda.origen} (${vuelta.ciudadLlegada})` : vuelta.ciudadLlegada,
            horaSalida:  vuelta.horaSalida,
            horaLlegada: vuelta.horaLlegada,
            duracion:    vuelta.duracion,
            fecha:       formatearFecha(busqueda.fechaVuelta)
        } : null
    };
}

function formatearFecha(fechaISO) {
    if (!fechaISO) return "";
    const dias  = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                   "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const f = new Date(fechaISO + "T00:00:00");
    return `${dias[f.getDay()]}. ${f.getDate()} ${meses[f.getMonth()]}`;
}


// ─── FILTROS ─────────────────────────────────────────────────

const COSTO_EQUIPAJE = { personal: 0, mano: 35, bodega: 60 };

const filtros = {
    escalas:    new Set(),
    equipaje:   new Set(),
    aerolineas: new Set(),
    precioMax:  Infinity
};

function inicializarFiltros() {
    configurarGrupo("escalas",
        ["direct","1scale","2scale"], "all-scales",
        { direct:"directo", "1scale":"1escala", "2scale":"2escalas" });

    configurarGrupo("equipaje",
        ["staff","hand","store"], "all-options",
        { staff:"personal", hand:"mano", store:"bodega" });

    configurarGrupo("aerolineas",
        ["argentinas","europa","iberia","latam","lufthansa"], "all-airlines",
        { argentinas:"argentinas", europa:"europa", iberia:"iberia", latam:"latam", lufthansa:"lufthansa" });
}

function configurarGrupo(nombre, ids, idTodas, mapa) {
    const todos   = document.getElementById(idTodas);
    const checks  = ids.map(id => document.getElementById(id));

    todos?.addEventListener("change", () => {
        checks.forEach(cb => { if (cb) cb.checked = todos.checked; });
        actualizarFiltro(nombre, ids, mapa);
        aplicarFiltros();
    });

    checks.forEach(cb => {
        if (!cb) return;
        cb.addEventListener("change", () => {
            if (!cb.checked && todos) todos.checked = false;
            if (checks.every(c => c?.checked) && todos) todos.checked = true;
            actualizarFiltro(nombre, ids, mapa);
            aplicarFiltros();
            if (nombre === "equipaje") actualizarPreciosConEquipaje();
        });
    });
}

function actualizarFiltro(nombre, ids, mapa) {
    filtros[nombre].clear();
    ids.forEach(id => {
        const cb = document.getElementById(id);
        if (cb?.checked) filtros[nombre].add(mapa[id]);
    });
}

function inicializarRangoPrecio() {
    const range = document.querySelector(".range");
    const spans = document.querySelectorAll(".rango-valores span");
    if (!range) return;

    const MIN = 100, MAX = 5000;
    range.min = MIN; range.max = MAX; range.value = MAX;

    const actualizar = () => {
        const val = parseInt(range.value, 10);
        if (spans[0]) spans[0].textContent = `US$ ${MIN.toLocaleString("es-AR")}`;
        if (spans[1]) spans[1].textContent = `US$ ${val.toLocaleString("es-AR")}`;
        filtros.precioMax = val;
    };
    range.addEventListener("input", () => { actualizar(); aplicarFiltros(); });
    actualizar();
}

function aplicarFiltros() {
    const tarjetas = document.querySelectorAll(".tarjeta-vuelo");
    if (tarjetas.length === 0) return;

    let visibles = 0;
    tarjetas.forEach(t => {
        const precio    = parseInt(t.dataset.precio, 10);
        const aerolinea = t.dataset.aerolinea;
        const escalas   = t.dataset.escalas;

        const visible =
            precio <= filtros.precioMax &&
            (filtros.escalas.size    === 0 || filtros.escalas.has(escalas)) &&
            (filtros.aerolineas.size === 0 || filtros.aerolineas.has(aerolinea));

        t.style.display = visible ? "" : "none";
        if (visible) visibles++;
    });

    let msg = document.getElementById("sin-resultados-filtros");
    if (visibles === 0) {
        if (!msg) {
            msg = document.createElement("p");
            msg.id = "sin-resultados-filtros";
            msg.textContent = "No se encontraron vuelos con los filtros seleccionados.";
            msg.style.cssText = "text-align:center;padding:2em;color:#777;font-size:1.1em;";
            document.querySelector(".opciones-vuelos")?.appendChild(msg);
        }
    } else msg?.remove();
}

function tarjetaIncluyeEquipaje(tarjeta, tipo) {
    const clase = { personal:"mochila", mano:"valija", bodega:"maleta" }[tipo];
    const img   = tarjeta.querySelector(`.${clase}`);
    return img ? img.getAttribute("src").toLowerCase().includes("-color") : false;
}

function actualizarPreciosConEquipaje() {
    document.querySelectorAll(".tarjeta-vuelo").forEach(t => {
        const base  = parseInt(t.dataset.precio, 10);
        let extra   = 0;
        filtros.equipaje.forEach(tipo => {
            if (!tarjetaIncluyeEquipaje(t, tipo)) extra += COSTO_EQUIPAJE[tipo];
        });
        const montoEl = t.querySelector(".monto");
        if (montoEl) {
            montoEl.textContent = `US$ ${(base + extra).toLocaleString("es-AR")}`;
            montoEl.style.color = extra > 0 ? "#E9631A" : "";
        }
        let detalle = t.querySelector(".extra-equipaje");
        if (extra > 0) {
            if (!detalle) {
                detalle = document.createElement("span");
                detalle.className = "extra-equipaje";
                detalle.style.cssText = "font-size:0.7em;color:#999;display:block;";
                t.querySelector(".precio")?.insertBefore(detalle, t.querySelector(".boton-accion"));
            }
            detalle.textContent = `+US$ ${extra} por equipaje`;
        } else detalle?.remove();
    });
}


// ─── INICIALIZACIÓN ──────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    precargarFormularioBusqueda();
    renderizarVuelos();          // genera las tarjetas en el DOM
    inicializarFiltros();
    inicializarRangoPrecio();
    aplicarFiltros();
    inicializarBotonesComprar(); // debe ir DESPUÉS de renderizarVuelos para que las tarjetas ya existan
});