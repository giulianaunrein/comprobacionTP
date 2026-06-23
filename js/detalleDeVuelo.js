

const IMPUESTOS = 100;

let datoVuelo = null;
let busqueda  = null;

// Asientos seleccionados: arrays para soportar múltiples pasajeros
const seleccion = { ida: [], vuelta: [] };

// ─── 1. CARGA DE DATOS DESDE SESSION STORAGE ────────────────

function cargarDatos() {
    const guardadoVuelo   = sessionStorage.getItem("vueloSeleccionado");
    const guardadaBusqueda = sessionStorage.getItem("busquedaVuelo");

    if (guardadoVuelo)    datoVuelo = JSON.parse(guardadoVuelo);
    if (guardadaBusqueda) busqueda  = JSON.parse(guardadaBusqueda);
}

function obtenerPasajeros() {
    return busqueda && busqueda.pasajeros ? parseInt(busqueda.pasajeros, 10) : 1;
}

function esSoloIda() {
    return busqueda && busqueda.tipoVuelo &&
           busqueda.tipoVuelo.toLowerCase().includes("solo");
}

// ─── 2. RENDERIZADO DEL DETALLE DE VUELO (aside izquierdo) ──

function extraerCodigo(texto) {
    if (!texto) return "";
    const match = texto.match(/\(([^)]+)\)/);
    return match ? match[1] : texto;
}

function cargarInfoVuelo() {
    if (!datoVuelo) return;

    const tramos = document.querySelectorAll(".tramo-vuelo");
    if (tramos.length < 1) return;

    // ── IDA ──
    const tramoIda = tramos[0];

    const infoIda = tramoIda.querySelector(".info");
    if (infoIda) infoIda.textContent = `Ida: ${datoVuelo.ida.origen} ➔ ${datoVuelo.ida.destino}`;

    const horaIdaSalida  = tramoIda.querySelector(".punto-partida .hora strong");
    const horaIdaLlegada = tramoIda.querySelector(".punto-llegada .hora strong");
    if (horaIdaSalida)  horaIdaSalida.textContent  = datoVuelo.ida.horaSalida;
    if (horaIdaLlegada) horaIdaLlegada.textContent = datoVuelo.ida.horaLlegada;

    const ciudadIdaPartida = tramoIda.querySelector(".punto-partida .ciudad");
    const ciudadIdaLlegada = tramoIda.querySelector(".punto-llegada .ciudad");
    if (ciudadIdaPartida) ciudadIdaPartida.textContent = extraerCodigo(datoVuelo.ida.origen);
    if (ciudadIdaLlegada) ciudadIdaLlegada.textContent = extraerCodigo(datoVuelo.ida.destino);

    const duracionIda = tramoIda.querySelector(".duracion-mini");
    if (duracionIda) duracionIda.textContent = datoVuelo.ida.duracion;

    const listaIda = tramoIda.querySelectorAll("ul li");
    if (listaIda.length >= 4) {
        listaIda[0].innerHTML = `<img class="chico icono-vuelo" src="../images/calendario.svg"> ${datoVuelo.ida.fecha || ""}`;
        listaIda[1].innerHTML = `<img class="chico icono-vuelo" src="../images/tiempo.svg"> Duración: ${datoVuelo.ida.duracion}`;
        listaIda[3].innerHTML = `<img class="chico icono-vuelo" src="${datoVuelo.aerolineaLogo}"> ${datoVuelo.aerolineaNombre}`;
    }

    // ── VUELTA (solo si no es solo ida) ──
    const tramoVuelta = tramos[1];
    if (tramoVuelta) {
        if (esSoloIda() || !datoVuelo.vuelta) {
            // Ocultar toda la sección de vuelta en el aside
            tramoVuelta.style.display = "none";
            const separador = document.querySelector(".detalle .separador-puntos");
            if (separador) separador.style.display = "none";
        } else {
            const infoVuelta = tramoVuelta.querySelector(".info");
            if (infoVuelta) infoVuelta.textContent = `Vuelta: ${datoVuelo.vuelta.origen} ➔ ${datoVuelo.vuelta.destino}`;

            const horaVueltaSalida  = tramoVuelta.querySelector(".punto-partida .hora strong");
            const horaVueltaLlegada = tramoVuelta.querySelector(".punto-llegada .hora strong");
            if (horaVueltaSalida)  horaVueltaSalida.textContent  = datoVuelo.vuelta.horaSalida;
            if (horaVueltaLlegada) horaVueltaLlegada.textContent = datoVuelo.vuelta.horaLlegada;

            const ciudadVueltaPartida = tramoVuelta.querySelector(".punto-partida .ciudad");
            const ciudadVueltaLlegada = tramoVuelta.querySelector(".punto-llegada .ciudad");
            if (ciudadVueltaPartida) ciudadVueltaPartida.textContent = extraerCodigo(datoVuelo.vuelta.origen);
            if (ciudadVueltaLlegada) ciudadVueltaLlegada.textContent = extraerCodigo(datoVuelo.vuelta.destino);

            const duracionVuelta = tramoVuelta.querySelector(".duracion-mini");
            if (duracionVuelta) duracionVuelta.textContent = datoVuelo.vuelta.duracion;

            const listaVuelta = tramoVuelta.querySelectorAll("ul li");
            if (listaVuelta.length >= 4) {
                listaVuelta[0].innerHTML = `<img class="chico icono-vuelo" src="../images/calendario.svg"> ${datoVuelo.vuelta.fecha || ""}`;
                listaVuelta[1].innerHTML = `<img class="chico icono-vuelo" src="../images/tiempo.svg"> Duración: ${datoVuelo.vuelta.duracion}`;
                listaVuelta[3].innerHTML = `<img class="chico icono-vuelo" src="${datoVuelo.aerolineaLogo}"> ${datoVuelo.aerolineaNombre}`;
            }
        }
    }

    // Precio en el aside
    const montoDetalle = document.querySelector(".detalle .monto");
    if (montoDetalle && datoVuelo.precio) {
        montoDetalle.textContent = `US$ ${datoVuelo.precio.toLocaleString("es-AR")}`;
    }
}

// ─── 3. OCULTAR MAPA DE VUELTA SI ES SOLO IDA ───────────────

function configurarMapaAsientos() {
    if (!esSoloIda()) return;

    // Ocultar la columna entera de vuelta en el mapa
    const columnas = document.querySelectorAll(".vuelo-columna");
    columnas.forEach(col => {
        const titulo = col.querySelector(".vuelo-titulo");
        if (titulo && titulo.textContent.trim().toLowerCase() === "vuelta") {
            col.style.display = "none";
        }
    });
}

// ─── 4. CHECKBOXES CON LÍMITE POR CANTIDAD DE PASAJEROS ─────

function inicializarAsientos() {
    const cantPasajeros = obtenerPasajeros();

    // Convertir inputs de ida a checkbox y agregar lógica de límite
    configurarGrupoAsientos(
        document.querySelectorAll('input[name="asiento-ida"]'),
        seleccion.ida,
        cantPasajeros,
        "ida"
    );

    // Solo configurar vuelta si no es solo ida
    if (!esSoloIda()) {
        configurarGrupoAsientos(
            document.querySelectorAll('input[name="asiento-vuelta"]'),
            seleccion.vuelta,
            cantPasajeros,
            "vuelta"
        );
    }
}

function configurarGrupoAsientos(inputs, arraySeleccion, limite, tramo) {
    inputs.forEach(input => {
        // Cambiar de radio a checkbox para permitir múltiples selecciones
        input.type = "checkbox";

        input.addEventListener("change", function () {
            const asientoId = this.id.replace(/^(outbound-|lap-)/, "");

            if (this.checked) {
                if (arraySeleccion.length >= limite) {
                    // Ya llegó al límite: desmarcar y avisar
                    this.checked = false;
                    mostrarError(
                        `Solo podés seleccionar ${limite} asiento${limite > 1 ? "s" : ""} de ${tramo}.`
                    );
                    return;
                }
                arraySeleccion.push(asientoId);
            } else {
                const idx = arraySeleccion.indexOf(asientoId);
                if (idx !== -1) arraySeleccion.splice(idx, 1);
            }

            actualizarResumen();
            mostrarNotificacion(
                `Asiento de ${tramo} ${this.checked ? "seleccionado" : "deseleccionado"}: ${asientoId}`
            );
        });
    });
}

// ─── 5. RESUMEN DE PRECIO ────────────────────────────────────

function actualizarResumen() {
    if (!datoVuelo) return;

    const pasajeros = obtenerPasajeros();
    const base      = datoVuelo.precio * pasajeros;
    const impuestos = IMPUESTOS * pasajeros;
    const total     = base + impuestos;

    // Texto del ítem de adultos
    const itemAdultos = document.querySelector(".item-precio span:first-child");
    if (itemAdultos) itemAdultos.textContent = `${pasajeros} Adulto${pasajeros > 1 ? "s" : ""}`;

    const montosIndividuales = document.querySelectorAll(".monto-individual");
    if (montosIndividuales[0]) montosIndividuales[0].textContent = `US$ ${base.toLocaleString("es-AR")}`;
    if (montosIndividuales[1]) montosIndividuales[1].textContent = `US$ ${impuestos.toLocaleString("es-AR")}`;

    const montoFinal = document.querySelector(".monto-final");
    if (montoFinal) montoFinal.textContent = `US$ ${total.toLocaleString("es-AR")}`;

    // Contador de asientos seleccionados
    let resumenAsientos = document.getElementById("resumen-asientos");
    if (!resumenAsientos) {
        resumenAsientos = document.createElement("div");
        resumenAsientos.id = "resumen-asientos";
        resumenAsientos.style.cssText = "margin:0.8em 0;font-size:0.85em;color:#555;";
        const separador = document.querySelector(".resumen-precio .separador-puntos");
        if (separador) separador.before(resumenAsientos);
    }

    const cantPax = obtenerPasajeros();
    const textoIda = seleccion.ida.length > 0
        ? `✔ Asientos ida (${seleccion.ida.length}/${cantPax}): <strong>${seleccion.ida.join(", ")}</strong>`
        : `⚠ Sin asientos de ida seleccionados (0/${cantPax})`;

    let textoVuelta = "";
    if (!esSoloIda()) {
        textoVuelta = seleccion.vuelta.length > 0
            ? `<br>✔ Asientos vuelta (${seleccion.vuelta.length}/${cantPax}): <strong>${seleccion.vuelta.join(", ")}</strong>`
            : `<br>⚠ Sin asientos de vuelta seleccionados (0/${cantPax})`;
    }

    resumenAsientos.innerHTML = `<p>${textoIda}${textoVuelta}</p>`;
}

// ─── 6. VALIDACIÓN Y BOTÓN CONTINUAR ────────────────────────

function inicializarBotonContinuar() {
    const boton = document.querySelector(".boton-continuar");
    if (!boton) return;

    boton.addEventListener("click", function (e) {
        e.preventDefault();

        const cantPax = obtenerPasajeros();

        if (seleccion.ida.length < cantPax) {
            mostrarError(`Seleccioná ${cantPax} asiento${cantPax > 1 ? "s" : ""} de ida para continuar.`);
            return;
        }

        if (!esSoloIda() && seleccion.vuelta.length < cantPax) {
            mostrarError(`Seleccioná ${cantPax} asiento${cantPax > 1 ? "s" : ""} de vuelta para continuar.`);
            return;
        }

        const pasajeros = obtenerPasajeros();
        const totalFinal = datoVuelo.precio * pasajeros + IMPUESTOS * pasajeros;

        // Guardar todo en sessionStorage
        sessionStorage.setItem("asientosIda",    JSON.stringify(seleccion.ida));
        sessionStorage.setItem("asientosVuelta", JSON.stringify(seleccion.vuelta));
        sessionStorage.setItem("totalPrecio",    totalFinal);

        // Actualizar el objeto vuelo con los asientos y precio final
        const vueloActualizado = {
            ...datoVuelo,
            asientosIda:    seleccion.ida,
            asientosVuelta: seleccion.vuelta,
            precioTotal:    totalFinal,
            cantidadPasajeros: pasajeros
        };
        sessionStorage.setItem("vueloSeleccionado", JSON.stringify(vueloActualizado));

        window.location.href = boton.getAttribute("href");
    });
}

// ─── 7. MENSAJES FLOTANTES ───────────────────────────────────

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
            position:fixed; bottom:1.5rem; left:50%; transform:translateX(-50%);
            background:${color}; color:white; padding:0.7em 1.5em;
            border-radius:2em; font-size:0.95rem; z-index:9999;
            box-shadow:0 4px 12px rgba(0,0,0,0.2); transition:opacity 0.4s;
        `;
        document.body.appendChild(el);
    }
    el.textContent = mensaje;
    el.style.opacity = "1";
    clearTimeout(el._timeout);
    el._timeout = setTimeout(() => (el.style.opacity = "0"), 2800);
}

// ─── 8. INICIALIZACIÓN ──────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
    cargarInfoVuelo();
    configurarMapaAsientos();
    actualizarResumen();
    inicializarAsientos();
    inicializarBotonContinuar();
});