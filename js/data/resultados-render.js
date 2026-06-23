// ============================================================
// resultados-render.js
// Lee la búsqueda guardada en sessionStorage (por el form de
// index.html) y renderiza las tarjetas de vuelo correspondientes
// al destino buscado, usando los datos de vuelos-data.js.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    const contenedorTarjetas = document.querySelector(".opciones-vuelos");
    if (!contenedorTarjetas) {
        console.error('resultados-render.js: no se encontró ".opciones-vuelos" en el HTML.');
        return;
    }

    // ------------------------------------------------------------------
    // 1. LEER LA BÚSQUEDA GUARDADA DESDE INDEX.HTML
    // ------------------------------------------------------------------
    const busquedaGuardada = sessionStorage.getItem("busquedaVuelo");
    const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : null;

    // ------------------------------------------------------------------
    // 2. ACTUALIZAR LOS CAMPOS DEL BUSCADOR (aside) CON LO BUSCADO
    // ------------------------------------------------------------------
    function precargarFormularioBusqueda() {
        if (!busqueda) return;

        const inputOrigen = document.querySelector('.contenedor-viaje .origenydestino:nth-child(1) input');
        const inputDestino = document.querySelector('.contenedor-viaje .origenydestino:nth-child(3) input');
        const inputFechaIda = document.querySelector('.contenedor-fechas .fecha:nth-child(1) input');
        const inputFechaVuelta = document.querySelector('.contenedor-fechas .fecha:nth-child(3) input');
        const inputPasajeros = document.getElementById('pasajeros') || document.getElementById('passengers');

        if (inputOrigen && busqueda.origen) inputOrigen.value = busqueda.origen;
        if (inputDestino && busqueda.destino) inputDestino.value = busqueda.destino;
        if (inputFechaIda && busqueda.fechaIda) inputFechaIda.value = busqueda.fechaIda;
        if (inputFechaVuelta && busqueda.fechaVuelta) inputFechaVuelta.value = busqueda.fechaVuelta;
        if (inputPasajeros && busqueda.pasajeros) inputPasajeros.value = busqueda.pasajeros;
    }

    // ------------------------------------------------------------------
    // 3. RENDERIZAR UNA TARJETA DE VUELO (HTML) A PARTIR DE UN OBJETO VUELO
    // ------------------------------------------------------------------
    function crearFilaTramo(etiqueta, tramo) {
        return `
            <div class="fila">
                <div class="aerolinea">
                    <img src="${tramo.logoAerolinea}" class="aeroargentina">
                    <p class="nombreAerolinea">${tramo.nombreAerolinea}</p>
                </div>
                <div class="info">
                    <span class="etiqueta">${etiqueta}</span>
                    <span class="hora"><strong>${tramo.horaSalida}</strong></span>
                    <span class="ciudad">${tramo.origenCiudad}</span>
                </div>
                <div class="duracion">
                    <span class="tiempo">${tramo.duracion}</span>
                    <div class="linea-trayecto"></div>
                    <span class="tipo-vuelo">${tramo.tipoVuelo}</span>
                </div>
                <div class="info">
                    <span class="hora"><strong>${tramo.horaLlegada}</strong></span>
                    <span class="ciudad">${tramo.destinoCiudad}</span>
                </div>
                <div class="icono-servicio">
                    <img src="../images/MOCHILA-color.svg" class="mochila">
                    <img src="../images/VALIJA-color.svg" class="valija">
                    <img src="../images/MALETA-color.svg" class="maleta">
                </div>
            </div>
        `;
    }

   function crearTarjetaVuelo(vuelo) {
    const tramoIda = { ...vuelo.ida, nombreAerolinea: vuelo.aerolinea, logoAerolinea: vuelo.logo };
    const tramoVuelta = { ...vuelo.vuelta, nombreAerolinea: vuelo.aerolinea, logoAerolinea: vuelo.logo };

    const precioFormateado = vuelo.precio.toLocaleString('es-AR');
    const claveAerolinea = obtenerClaveAerolinea(vuelo.aerolinea);
    const claveEscala = obtenerClaveEscala(vuelo.ida.tipoVuelo);

    return `
        <div class="tarjeta-vuelo"
             data-vuelo-id="${vuelo.id}"
             data-precio="${vuelo.precio}"
             data-aerolinea="${claveAerolinea}"
             data-escalas="${claveEscala}">
            <div class="informacion">
                ${crearFilaTramo("IDA", tramoIda)}
                ${crearFilaTramo("VUELTA", tramoVuelta)}
            </div>
            <div class="precio">
                <span class="desde">desde</span>
                <div class="monto">US$ ${precioFormateado}</div>
                <a href="DetalleDeVuelo.html" class="boton-accion">Comprar</a>
            </div>
        </div>
    `;
}

    // ------------------------------------------------------------------
    // 4. MENSAJE CUANDO NO HAY RESULTADOS O NO HAY BÚSQUEDA
    // ------------------------------------------------------------------
    function mostrarMensaje(texto) {
        contenedorTarjetas.innerHTML = `
            <div class="sin-resultados">
                <p>${texto}</p>
            </div>
        `;
    }

    // ------------------------------------------------------------------
    // 5. FLUJO PRINCIPAL
    // ------------------------------------------------------------------
    precargarFormularioBusqueda();

    if (!busqueda || !busqueda.destino) {
        // No hay búsqueda guardada (el usuario entró directo a resultados.html)
        mostrarMensaje("Ingresá un destino desde la búsqueda para ver los vuelos disponibles.");
        return;
    }

    const resultado = obtenerVuelosPorDestino(busqueda.destino, 8);

    if (!resultado.destino) {
        mostrarMensaje(`No encontramos vuelos para "${busqueda.destino}". Probá con otro destino.`);
        return;
    }

    if (resultado.vuelos.length === 0) {
        mostrarMensaje(`No hay vuelos disponibles para ${resultado.destino.destino} en este momento.`);
        return;
    }

    contenedorTarjetas.innerHTML = resultado.vuelos.map(crearTarjetaVuelo).join('');
});