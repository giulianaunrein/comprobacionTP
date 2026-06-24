const reservas = [
    {
        origenCiudad: "Buenos Aires",
        destinoCiudad: "Madrid",
        destinoCodigo: "MAD",
        fechaInicio: "10/08/2024",
        fechaFin: "20/08/2024",
        precio: 1739,
        moneda: "USD",
        ida: {
            origenNombre: "Buenos Aires",
            origenCodigo: "BUE",
            destinoNombre: "París",
            destinoCodigo: "PAR",
            horaSalida: "05:30",
            horaLlegada: "12:45",
            duracion: "11h 30m",
            fecha: "23/04 11:30"
        },
        vuelta: {
            origenNombre: "París",
            origenCodigo: "PAR",
            destinoNombre: "Buenos Aires",
            destinoCodigo: "BUE"
           
        }
    },
    {
        origenCiudad: "Buenos Aires",
        destinoCiudad: "París",
        destinoCodigo: "PAR",
        fechaInicio: "23/03/2023",
        fechaFin: "07/04/2023",
        precio: 2100,
        moneda: "USD",
        ida: {
            origenNombre: "Buenos Aires",
            origenCodigo: "BUE",
            destinoNombre: "París",
            destinoCodigo: "PAR",
            horaSalida: "05:30",
            horaLlegada: "12:45",
            duracion: "11h 30m",
            fecha: "23/04 11:30"
        },
        vuelta: {
            origenNombre: "París",
            origenCodigo: "PAR",
            destinoNombre: "Buenos Aires",
            destinoCodigo: "BUE",
            horaSalida: "14:20",
            horaLlegada: "23:10",
            duracion: "12h 50m",
            fecha: "07/04 08:15"
        }
    }
];
 
//Construye el bloque "horarios" (ida o vuelta) si hay datos
function crearBloqueHorario(tramo) {
    if (!tramo.horaSalida) return "";
 
    return `
        <div class="horarios-conector">
            <span class="hora-bold">${tramo.horaSalida}</span>
            <div class="conector-puntos"></div>
            <span class="hora-bold">${tramo.horaLlegada}</span>
        </div>
        <span class="info-secundaria">${tramo.duracion} · ${tramo.fecha}</span>
    `;
}
 
// Crea el HTML de una reserva (un .vuelo-item completo)
//   a partir de un objeto del array "reservas"
function crearVueloItem(reserva, index) {
    const id = `vuelo-${index + 1}`;
 
    const item = document.createElement("div");
    item.className = "vuelo-item";
 
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.className = "boton-vuelo";
 
    // cabecera: ruta, fechas, precio
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.className = "vuelo-header";
    label.innerHTML = `
        <div class="info-vuelo">
            <strong>${reserva.origenCiudad} — ${reserva.destinoCiudad} (${reserva.destinoCodigo})</strong>
            <p>${reserva.fechaInicio} - ${reserva.fechaFin}</p>
        </div>
        <div class="precio-seccion">
            <span class="precio">$ ${reserva.precio} ${reserva.moneda}</span>
            <span class="flecha">▼</span>
        </div>
    `;
 
    // detalle: tramo de ida y vuelta
    const detalle = document.createElement("div");
    detalle.className = "vuelo-detalle";
    detalle.innerHTML = `
        <div class="datos-ida">
            <p><strong>Ida:</strong> ${reserva.ida.origenNombre} (${reserva.ida.origenCodigo}) — ${reserva.ida.destinoNombre} (${reserva.ida.destinoCodigo})</p>
            ${crearBloqueHorario(reserva.ida)}
        </div>
        <div class="datos-vuelta">
            <p><strong>Vuelta:</strong> ${reserva.vuelta.origenNombre} (${reserva.vuelta.origenCodigo}) — ${reserva.vuelta.destinoNombre} (${reserva.vuelta.destinoCodigo})</p>
            ${crearBloqueHorario(reserva.vuelta)}
        </div>
    `;
 
    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(detalle);
 
    return item;
}
 
// Mensaje para cuando no hay reservas
function mostrarMensajeVacio(contenedor) {
    const mensaje = document.createElement("p");
    mensaje.className = "sin-reservas";
    mensaje.textContent = "Todavía no tenés vuelos reservados.";
    contenedor.appendChild(mensaje);
}
 

function renderizarReservas(listaReservas) {
    const contenedor = document.querySelector(".bloque-informacion");
 
    if (!contenedor) {
        console.error("No se encontró el contenedor .bloque-informacion");
        return;
    }
 
    // limpia cualquier .vuelo-item estático del HTML o de un render previo
    contenedor.querySelectorAll(".vuelo-item, .sin-reservas").forEach(el => el.remove());
 
    if (!listaReservas || listaReservas.length === 0) {
        mostrarMensajeVacio(contenedor);
        return;
    }
 
    listaReservas.forEach((reserva, index) => {
        contenedor.appendChild(crearVueloItem(reserva, index));
    });
}
 
// Punto de entrada

document.addEventListener("DOMContentLoaded", () => {
    // Reservas hechas realmente por el usuario en el checkout (persisten en localStorage)
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservasGuardadas")) || [];

    // Se muestran primero las reservas reales del usuario, y al final las de ejemplo
    // (si no querés ver las de ejemplo, cambiá la línea siguiente por: const todasLasReservas = reservasGuardadas;)
    const todasLasReservas = [...reservasGuardadas, ...reservas];

    renderizarReservas(todasLasReservas);
});