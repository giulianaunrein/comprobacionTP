import { vuelos } from "./data/ArrayVuelos.js";


const vuelosNacionales = vuelos.filter(vuelo => vuelo.tipoVuelo === "Nacional" && !vuelo.oferta);
const vuelosEuropa = vuelos.filter(vuelo => vuelo.tipoVuelo === "Internacional" && !vuelo.oferta);
const contenedorNacional = document.getElementById("vuelos-nacionales");
const contenedorInternacional = document.getElementById("vuelos-inter");


function guardarBusquedaYNavegar(vuelo) {
    const busqueda = {
        origen:      vuelo.origen,
        destino:     vuelo.destino,
        fechaIda:    "",
        fechaVuelta: "",
        pasajeros:   "1",
        clase:       "Económica",
        tipoVuelo:   "Ida y vuelta"
    };
    sessionStorage.setItem("busquedaVuelo", JSON.stringify(busqueda));
    window.location.href = "../pages/resultados.html";
}

function mostrarVuelos(lista, contenedorId) {

    const contenedor = document.getElementById(contenedorId);

    lista.forEach(vuelo => {

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML = `
            <img src="${vuelo.imagen}" alt="${vuelo.destino}">
            <div class="info">
                <div class="parte-arriba">
                    <h3>${vuelo.destino}</h3>
                    <p>${vuelo.pais}</p>
                </div>
                <div class="parte-abajo">
                    <p>Desde</p>
                    <p class="precio">US$${vuelo.precioBase}</p>
                    <div class="ver-vuelos">
                        <a class="btn-ver-vuelos">
                            <p>Ver vuelos</p>
                        </a>
                        <a class="btn-ver-vuelos">
                            <img src="../images/flecha-naranja.png" alt="flecha">
                        </a>
                    </div>
                </div>
            </div>
        `;

        tarjeta.querySelectorAll(".btn-ver-vuelos").forEach(btn => {
            btn.style.cursor = "pointer";
            btn.addEventListener("click", () => guardarBusquedaYNavegar(vuelo));
        });

        contenedor.appendChild(tarjeta);
    });
}


function carrusel(contenedor, btnAnterior, btnSiguiente){

    btnSiguiente.addEventListener("click", () => {
        contenedor.scrollLeft += 300;
    });

    btnAnterior.addEventListener("click", () => {
        contenedor.scrollLeft -= 300;
    });
}


mostrarVuelos(vuelosNacionales, "vuelos-nacionales");
mostrarVuelos(vuelosEuropa, "vuelos-inter");

carrusel(contenedorNacional,document.getElementById("anterior-nacional"),document.getElementById("siguiente-nacional"));
carrusel(contenedorInternacional,document.getElementById("anterior-inter"),document.getElementById("siguiente-inter"));