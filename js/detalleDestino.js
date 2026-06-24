import { vuelos } from "./data/ArrayVuelos.js";

const parametrosURL = new URLSearchParams(window.location.search);
const nombreBuscado = parametrosURL.get("destino");

const destinoEncontrado = vuelos.find(
    item => item.destino.toLowerCase() === nombreBuscado?.toLowerCase() && item.oferta
);

// Array accesible por comprarVuelo()
let vuelosDelDestino = [];

// Necesario porque el archivo es type="module" y onclick en HTML dinámico
// no puede acceder a funciones locales directamente
window.comprarVuelo = function(index) {
    const vuelo = vuelosDelDestino[index];

    const vueloParaGuardar = {
        ida: {
            origen: "Buenos Aires (EZE)",
            destino: `${vuelo.destino} (${vuelo.codigo})`,
            fecha: "A confirmar",
            horario: `${vuelo.salida} - ${vuelo.llegada}`,
            escala: vuelo.escalas ? "1 escala" : "Directo"
        },
        vuelta: null,
        pasajeros: 1,
        precioBase: vuelo.precioBase,
        impuestos: 50
    };

    localStorage.setItem("vueloSeleccionado", JSON.stringify(vueloParaGuardar));
    window.location.href = "../pages/Checkout.html";
};

function crearTarjetaVuelo(vuelo, numero, index) {
    const tipoEscalas = vuelo.escalas ? "1 Escala" : "Directo";

    let iconosEquipaje = `<img src="../images/MOCHILA-color.svg" class="mochila" title="Mochila">`;
    if (vuelo.equipajeIncluido === "Cabina" || vuelo.equipajeIncluido === "Bodega") {
        iconosEquipaje += `<img src="../images/VALIJA-color.svg" class="valija" title="Equipaje de mano">`;
    }
    if (vuelo.equipajeIncluido === "Bodega") {
        iconosEquipaje += `<img src="../images/MALETA.svg" class="maleta" title="Equipaje de bodega">`;
    }

    const codigoDestino = vuelo.codigo || "DST";

    return `
        <div class="tarjeta-vuelo">
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
                    <div class="clase"><span>${vuelo.clase}</span></div>
                    <div class="flecha"><img src="../images/flecha-hacia-abajo.png"></div>
                </div>
            </label>
            <div class="desplegable">
                <div class="extras">
                    <p>Precio por 1 pasajero</p>
                    <p><small>Equipaje incluido: ${vuelo.equipajeIncluido}</small></p>
                </div>
                <div class="parte-abajo">
                    <span class="precio-vuelo">US$ ${vuelo.precioBase}</span>

                    <!-- Cambiado: de <a href> a <button onclick> -->
                    <button class="boton-accion" onclick="comprarVuelo(${index})">
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    `;
}

if (destinoEncontrado) {
    const seccionFondo = document.getElementById("detalle-seccion");
    const titulo = document.getElementById("nombre-destino");
    const precio = document.getElementById("precio-destino");
    const info = document.getElementById("info-destino");
    const contenedor = document.getElementById("contenedor-vuelos");

    seccionFondo.style.backgroundImage = `url('${destinoEncontrado.imagen}')`;
    titulo.textContent = destinoEncontrado.destino;
    precio.textContent = `US$ ${destinoEncontrado.precioBase}`;
    info.textContent = destinoEncontrado.informacion;

    vuelosDelDestino = vuelos.filter(
        item => item.destino.toLowerCase() === nombreBuscado?.toLowerCase()
    );

    if (vuelosDelDestino.length > 0) {
        contenedor.innerHTML = vuelosDelDestino
            .map((vuelo, index) => crearTarjetaVuelo(vuelo, index + 1, index))
            .join("");
    } else {
        contenedor.innerHTML = "<p>No hay vuelos disponibles actualmente para este destino.</p>";
    }

} else {
    const titulo = document.getElementById("nombre-destino");
    if (titulo) titulo.textContent = "Destino no encontrado";
}
