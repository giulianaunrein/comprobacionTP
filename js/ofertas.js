import { vuelos } from "./data/ArrayVuelos.js";

const contenedor = document.querySelector(".contenedor-ofertas");
const selectOrden = document.getElementById("orden");
const ofertas = vuelos.filter(vuelo => vuelo.oferta === true);

function mostrarOfertas(lista) {
    // Asegurarse que el contenedor este limpio
    contenedor.innerHTML = ""; 

    lista.forEach(oferta => {
        contenedor.innerHTML += `
             <div class="tarjeta">
                <span class="promo">PROMO</span>
                <img src="${oferta.imagen}" alt="${oferta.destino}">

                <div class="info">
                
                    <div class="parte-arriba">
                        <h3>${oferta.destino}</h3>
                        <p>${oferta.pais}</p>
                    </div>

                    <div class="parte-abajo">
                        <p>Desde</p>
                        <p class="precio">US$${oferta.precioBase}</p>

                        <div class="ver-vuelos">
                            <a href="../pages/detalleDestino.html?destino=${oferta.destino}">
                                <p>Ver Oferta</p>
                            </a>

                            <a href="../pages/detalleDestino.html?destino=${oferta.destino}">
                                <img src="../images/flecha-naranja.png" alt="flecha">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// escucha el cambio
selectOrden.addEventListener("change", (e) => {
    const valorSeleccionado = e.target.value;
    
    
    let listaFiltrada = [...ofertas];

    if (valorSeleccionado === "precio") {
       
        listaFiltrada.sort((a, b) => Number(a.precioBase) - Number(b.precioBase));
    } else if (valorSeleccionado === "nacional") {
        
        listaFiltrada = listaFiltrada.filter(oferta => oferta.tipoVuelo === "Nacional");
    } else if (valorSeleccionado === "internacional") {
       
        listaFiltrada = listaFiltrada.filter(oferta => oferta.tipoVuelo === "Internacional");
    }

    
    mostrarOfertas(listaFiltrada);
});


mostrarOfertas(ofertas);