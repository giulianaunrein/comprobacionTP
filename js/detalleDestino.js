import { vuelos } from "./data/ArrayVuelos.js";

const parametrosURL = new URLSearchParams(window.location.search);
const nombreBuscado = parametrosURL.get("destino");

// Buscamos la oferta que coincida con el destino para la sección de cabecera
const destinoEncontrado = vuelos.find(
    item => item.destino.toLowerCase() === nombreBuscado?.toLowerCase() && item.oferta
);

function crearTarjetaVuelo(vuelo, numero) {
    const tipoEscalas = vuelo.escalas ? "1 Escala" : "Directo";

   
    let iconosEquipaje = `<img src="../images/MOCHILA-color.svg" class="mochila" title="Mochila">`;
    if (vuelo.equipajeIncluido === "Cabina" || vuelo.equipajeIncluido === "Bodega") {
        iconosEquipaje += `<img src="../images/VALIJA-color.svg" class="valija" title="Equipaje de mano (Cabina)">`;
    }
    if (vuelo.equipajeIncluido === "Bodega") {
        iconosEquipaje += `<img src="../images/MALETA.svg" class="maleta" title="Equipaje de bodega">`;
    }

    // Lee el código directamente del objeto del vuelo (usamos "DST" de respaldo por seguridad)
    const codigoDestino = vuelo.codigo || "DST";

    return `
        <div class="tarjeta-vuelo">

            <input
                type="checkbox"
                id="vuelo${numero}"
                class="abrir">

            <label
                for="vuelo${numero}"
                class="informacion">

                <div class="fila">

                    <div class="aerolinea">
                        <img src="../images/AeroArgentinas.jpg"
                             class="aeroargentina" alt="${vuelo.aerolinea}">

                        <p class="nombreAerolinea">
                            ${vuelo.aerolinea}
                        </p>
                    </div>

                    <div class="info">
                        <span class="etiqueta">IDA</span>
                        <span class="hora">
                            <strong>${vuelo.salida}</strong>
                        </span>
                        <span class="ciudad">EZE</span>
                    </div>

                    <div class="duracion">
                        <span class="tiempo">${vuelo.duracion}</span>
                        <div class="linea-trayecto"></div>
                        <span class="tipo-vuelo">
                            ${tipoEscalas}
                        </span>
                    </div>

                    <div class="info">
                        <span class="hora">
                            <strong>${vuelo.llegada}</strong>
                        </span>
                        <span class="ciudad">${codigoDestino}</span>
                    </div>

                    <div class="icono-servicio">
                        ${iconosEquipaje}
                    </div>

                    <div class="clase">
                        <span>${vuelo.clase}</span>
                    </div>

                    <div class="flecha">
                        <img src="../images/flecha-hacia-abajo.png">
                    </div>

                </div>

            </label>

            <div class="desplegable">

                <div class="extras">
                    <p>Precio por 1 pasajero</p>
                    <p><small>Equipaje incluido: ${vuelo.equipajeIncluido}</small></p>
                </div>

                <div class="parte-abajo">
                    <span class="precio-vuelo">
                        US$ ${vuelo.precioBase}
                    </span>

                    <a href="../pages/Checkout.html"
                       class="boton-accion">
                        Comprar
                    </a>
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

    // Asignación de datos del banner superior
    seccionFondo.style.backgroundImage = `url('${destinoEncontrado.imagen}')`;
    titulo.textContent = destinoEncontrado.destino;
    precio.textContent = `US$ ${destinoEncontrado.precioBase}`;
    info.textContent = destinoEncontrado.informacion;

    // Filtramos TODOS los vuelos disponibles en el JSON para este destino específico
    const vuelosDestino = vuelos.filter(
        item => item.destino.toLowerCase() === nombreBuscado?.toLowerCase()
    );
    sessionStorage.setItem("vuelosDelDestino", JSON.stringify(vuelosDelDestino));

    if (vuelosDestino.length > 0) {
        contenedor.innerHTML = vuelosDestino
            .map((vuelo, index) => crearTarjetaVuelo(vuelo, index + 1))
            .join("");
    } else {
        contenedor.innerHTML = "<p>No hay vuelos disponibles actualmente para este destino.</p>";
    }

} else {
    const titulo = document.getElementById("nombre-destino");
    if (titulo) {
        titulo.textContent = "Destino no encontrado";
    }
}
