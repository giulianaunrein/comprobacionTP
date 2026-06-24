import { vuelos } from "./data/ArrayVuelos.js";

const parametrosURL = new URLSearchParams(window.location.search);
const nombreBuscado = parametrosURL.get("destino");

const destinoEncontrado = vuelos.find(
    item => item.destino.toLowerCase() === nombreBuscado?.toLowerCase() && item.oferta
);

let vuelosDestino = [];

function crearTarjetaVuelo(vuelo, numero, index) {
    const tipoEscalas = vuelo.escalas ? "1 Escala" : "Directo";
    const codigoDestino = vuelo.codigo || "DST";
    const clase = (vuelo.clase === "Economy" ? "Económica" : vuelo.clase) || "Económica";
    const equipaje = vuelo.equipajeIncluido || "Mochila";

    let iconosEquipaje = `<img src="../images/MOCHILA-color.svg" class="mochila" title="Mochila">`;
    if (equipaje === "Cabina" || equipaje === "Bodega") {
        iconosEquipaje += `<img src="../images/VALIJA-color.svg" class="valija" title="Equipaje de mano">`;
    }
    if (equipaje === "Bodega") {
        iconosEquipaje += `<img src="../images/MALETA.svg" class="maleta" title="Equipaje de bodega">`;
    }

    return `
        <div class="tarjeta-vuelo" data-index="${index}">
            <input type="checkbox" id="vuelo${numero}" class="abrir">
            <label for="vuelo${numero}" class="informacion">
                <div class="fila">
                    <div class="aerolinea">
                        <img src="../images/AeroArgentinas.jpg" class="aeroargentina" alt="${vuelo.aerolinea}">
                        <p class="nombreAerolinea">${vuelo.aerolinea}</p>
                    </div>
                    <div class="info">
                        <span class="etiqueta">IDA</span>
                        <span class="hora"><strong>${vuelo.salida}</strong></span>
                        <span class="ciudad">EZE</span>
                    </div>
                    <div class="duracion">
                        <span class="tiempo">${vuelo.duracion}</span>
                        <div class="linea-trayecto"></div>
                        <span class="tipo-vuelo">${tipoEscalas}</span>
                    </div>
                    <div class="info">
                        <span class="hora"><strong>${vuelo.llegada}</strong></span>
                        <span class="ciudad">${codigoDestino}</span>
                    </div>
                    <div class="icono-servicio">${iconosEquipaje}</div>
                    <div class="clase"><span>${clase}</span></div>
                    <div class="flecha"><img src="../images/flecha-hacia-abajo.png"></div>
                </div>
            </label>
            <div class="desplegable">
                <div class="extras">
                    <p>Precio por 1 pasajero</p>
                    <p><small>Equipaje incluido: ${equipaje}</small></p>
                </div>
                <div class="parte-abajo">
                    <span class="precio-vuelo">US$ ${vuelo.precioBase}</span>
                    <button class="boton-accion boton-comprar" data-index="${index}">
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    `;
}

if (destinoEncontrado) {
    const seccionFondo = document.getElementById("detalle-seccion");
    const titulo       = document.getElementById("nombre-destino");
    const precio       = document.getElementById("precio-destino");
    const info         = document.getElementById("info-destino");
    const contenedor   = document.getElementById("contenedor-vuelos");

    seccionFondo.style.backgroundImage = `url('${destinoEncontrado.imagen}')`;
    titulo.textContent = destinoEncontrado.destino;
    precio.textContent = `US$ ${destinoEncontrado.precioBase}`;
    info.textContent   = destinoEncontrado.informacion;

    vuelosDestino = vuelos.filter(
        item => item.destino.toLowerCase() === nombreBuscado?.toLowerCase()
    );

    if (vuelosDestino.length > 0) {
        contenedor.innerHTML = vuelosDestino
            .map((vuelo, index) => crearTarjetaVuelo(vuelo, index + 1, index))
            .join("");
    } else {
        contenedor.innerHTML = "<p>No hay vuelos disponibles actualmente para este destino.</p>";
    }

    // Delegación de eventos: escucha clicks en el contenedor
    contenedor.addEventListener("click", function(e) {
        const boton = e.target.closest(".boton-comprar");
        if (!boton) return;

        const index = parseInt(boton.dataset.index);
        const vuelo = vuelosDestino[index];

        const vueloParaGuardar = {
            precio: vuelo.precioBase,
            aerolineaNombre: vuelo.aerolinea,
            aerolineaLogo: "../images/AeroArgentinas.jpg",
            ida: {
                origen:      "Buenos Aires (EZE)",
                destino:     `${vuelo.destino} (${vuelo.codigo})`,
                horaSalida:  vuelo.salida,
                horaLlegada: vuelo.llegada,
                duracion:    vuelo.duracion,
                fecha:       "A confirmar"
            },
            vuelta: null,
            cantidadPasajeros: 1,
            precioTotal: vuelo.precioBase + 100
        };

        sessionStorage.setItem("vueloSeleccionado", JSON.stringify(vueloParaGuardar));
        window.location.href = "../pages/Checkout.html";
    });

} else {
    const titulo = document.getElementById("nombre-destino");
    if (titulo) titulo.textContent = "Destino no encontrado";
}
