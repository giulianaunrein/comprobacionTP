// ============================================================
// ArrayVuelos.js
// Contiene los destinos, la lógica de generación de vuelos
// y el renderizado de tarjetas. Todo en un solo archivo.
// ============================================================

// ─── DESTINOS DISPONIBLES ───────────────────────────────────

export const destinos = [
    { destino: "Bariloche",        pais: "Argentina", precio: 420,  tipo: "nacional",       imagen: "../images/bariloche.png" },
    { destino: "Madrid",           pais: "España",    precio: 1450, tipo: "internacional",  imagen: "../images/madrid.png" },
    { destino: "Ushuaia",          pais: "Argentina", precio: 780,  tipo: "nacional",       imagen: "../images/ushuaia.avif" },
    { destino: "Salta",            pais: "Argentina", precio: 250,  tipo: "nacional",       imagen: "../images/salta.jpg" },
    { destino: "Neuquen",          pais: "Argentina", precio: 180,  tipo: "nacional",       imagen: "../images/neuquen.jpg" },
    { destino: "Cordoba",          pais: "Argentina", precio: 140,  tipo: "nacional",       imagen: "../images/cordoba.jpg" },
    { destino: "Roma",             pais: "Italia",    precio: 1380, tipo: "internacional",  imagen: "../images/roma.avif" },
    { destino: "Paris",            pais: "Francia",   precio: 1520, tipo: "internacional",  imagen: "../images/paris.avif" },
    { destino: "Barcelona",        pais: "España",    precio: 1340, tipo: "internacional",  imagen: "../images/barcelona.jpg" },
    { destino: "Bogota",           pais: "Colombia",  precio: 720,  tipo: "internacional",  imagen: "../images/bogota.avif" },
    { destino: "Calafate",         pais: "Argentina", precio: 650,  tipo: "nacional",       imagen: "../images/calafate.jpg" },
    { destino: "Cancun",           pais: "Mexico",    precio: 980,  tipo: "internacional",  imagen: "../images/cancun.jpg" },
    { destino: "Mar del Plata",    pais: "Argentina", precio: 120,  tipo: "nacional",       imagen: "../images/mardel.jpg" },
    { destino: "Rio de Janeiro",   pais: "Brasil",    precio: 650,  tipo: "internacional",  imagen: "../images/rio.png" },
    { destino: "Santiago de Chile",pais: "Chile",     precio: 420,  tipo: "internacional",  imagen: "../images/santiago.jpg" },
    { destino: "Mendoza",          pais: "Argentina", precio: 200,  tipo: "nacional",       imagen: "../images/mendoza.jpg" },
    { destino: "Iguazu",           pais: "Argentina", precio: 170,  tipo: "nacional",       imagen: "../images/iguazu.jpg" },
    { destino: "Miami",            pais: "Estados Unidos", precio: 1800, tipo: "internacional", imagen: "../images/miami.jpg" },
    { destino: "Nueva York",       pais: "Estados Unidos", precio: 2100, tipo: "internacional", imagen: "../images/nueva.jpg" },
    { destino: "Londres",          pais: "Reino Unido",    precio: 2800, tipo: "internacional", imagen: "../images/londres.jpg" },
    { destino: "Punta Cana",       pais: "Rep. Dominicana",precio: 1300, tipo: "internacional", imagen: "../images/puntacana.jpg" }
];

// ─── AEROLÍNEAS ─────────────────────────────────────────────

const aerolineas = [
    { nombre: "Aerolineas Argentinas", logo: "../images/AeroArgentinas.jpg",  clave: "argentinas" },
    { nombre: "Iberia",                logo: "../images/Iberia.jpg",           clave: "iberia" },
    { nombre: "Air Europa",            logo: "../images/airEuropa.png",        clave: "europa" },
    { nombre: "LATAM Airlines",        logo: "../images/latam.png",            clave: "latam" },
    { nombre: "Lufthansa",             logo: "../images/Lufthansa.png",        clave: "lufthansa" }
];

// ─── CÓDIGOS DE AEROPUERTO ──────────────────────────────────

const codigosAeropuerto = {
    "Bariloche": "BRC", "Madrid": "MAD", "Ushuaia": "USH", "Salta": "SLA",
    "Neuquen": "NQN", "Cordoba": "COR", "Roma": "FCO", "Paris": "CDG",
    "Barcelona": "BCN", "Bogota": "BOG", "Calafate": "FTE", "Cancun": "CUN",
    "Mar del Plata": "MDQ", "Rio de Janeiro": "GIG", "Santiago de Chile": "SCL",
    "Mendoza": "MDZ", "Iguazu": "IGR", "Miami": "MIA", "Nueva York": "JFK",
    "Londres": "LHR", "Punta Cana": "PUJ"
};

const ORIGEN_DEFAULT = { ciudad: "Buenos Aires, Argentina", codigo: "EZE" };

function obtenerCodigo(nombreDestino) {
    return codigosAeropuerto[nombreDestino] || nombreDestino.substring(0, 3).toUpperCase();
}

// ─── HELPERS DE GENERACIÓN ──────────────────────────────────

function horarioAleatorio() {
    const h = Math.floor(Math.random() * 24).toString().padStart(2, "0");
    const m = ([0,5,10,15,20,25,30,35,40,45,50,55][Math.floor(Math.random()*12)]).toString().padStart(2,"0");
    return `${h}:${m}`;
}

function sumarDuracion(salida, horas, minutos) {
    const [h, m] = salida.split(":").map(Number);
    let total = h * 60 + m + horas * 60 + minutos;
    total = total % (24 * 60);
    return `${Math.floor(total/60).toString().padStart(2,"0")}:${(total%60).toString().padStart(2,"0")}`;
}

function generarDuracionYTipo(tipo) {
    const esNacional = tipo === "nacional";
    const opciones = esNacional
        ? [
            { horas:2,  minutos:0,  tipo:"Directo" },
            { horas:2,  minutos:30, tipo:"Directo" },
            { horas:3,  minutos:15, tipo:"1 Escala" }
          ]
        : [
            { horas:11, minutos:0,  tipo:"Directo" },
            { horas:12, minutos:40, tipo:"Directo" },
            { horas:18, minutos:10, tipo:"1 Escala" },
            { horas:25, minutos:15, tipo:"2 Escalas" }
          ];
    return opciones[Math.floor(Math.random() * opciones.length)];
}

function duracionTexto(horas, minutos) {
    return minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h 00m`;
}

// ─── NORMALIZACIÓN ──────────────────────────────────────────

function normalizar(texto) {
    return (texto || "").toString().trim().toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function obtenerClaveEscala(tipoVuelo) {
    return normalizar(tipoVuelo).replace(/\s+/g, "");
}

// ─── GENERACIÓN DE VUELOS ───────────────────────────────────

function generarVuelosParaDestino(destinoObj, cantidad) {
    const codigo = obtenerCodigo(destinoObj.destino);
    const vuelos = [];

    for (let i = 0; i < cantidad; i++) {
        const aerolinea = aerolineas[Math.floor(Math.random() * aerolineas.length)];
        const precio = Math.round(destinoObj.precio * (0.9 + Math.random() * 0.45));

        const idaSalida = horarioAleatorio();
        const idaInfo   = generarDuracionYTipo(destinoObj.tipo);
        const idaLlegada = sumarDuracion(idaSalida, idaInfo.horas, idaInfo.minutos);

        const vueltaSalida  = horarioAleatorio();
        const vueltaInfo    = generarDuracionYTipo(destinoObj.tipo);
        const vueltaLlegada = sumarDuracion(vueltaSalida, vueltaInfo.horas, vueltaInfo.minutos);

        vuelos.push({
            id: `${codigo}-${i}-${Date.now()}`,
            destinoNombre: destinoObj.destino,
            pais: destinoObj.pais,
            tipo: destinoObj.tipo,
            precio,
            aerolinea: aerolinea.nombre,
            logo: aerolinea.logo,
            claveAerolinea: aerolinea.clave,
            ida: {
                origenCiudad: ORIGEN_DEFAULT.codigo,
                destinoCiudad: codigo,
                horaSalida:  idaSalida,
                horaLlegada: idaLlegada,
                duracion:    duracionTexto(idaInfo.horas, idaInfo.minutos),
                tipoVuelo:   idaInfo.tipo
            },
            vuelta: {
                origenCiudad: codigo,
                destinoCiudad: ORIGEN_DEFAULT.codigo,
                horaSalida:  vueltaSalida,
                horaLlegada: vueltaLlegada,
                duracion:    duracionTexto(vueltaInfo.horas, vueltaInfo.minutos),
                tipoVuelo:   vueltaInfo.tipo
            }
        });
    }
    return vuelos;
}

function buscarDestino(textoBuscado) {
    const norm = normalizar(textoBuscado);
    if (!norm) return null;
    return destinos.find(d => {
        const n = normalizar(d.destino);
        return n.includes(norm) || norm.includes(n);
    }) || null;
}

export function obtenerVuelosPorDestino(textoDestino, cantidad = 6) {
    const destinoEncontrado = buscarDestino(textoDestino);
    if (!destinoEncontrado) return { destino: null, vuelos: [] };
    return { destino: destinoEncontrado, vuelos: generarVuelosParaDestino(destinoEncontrado, cantidad) };
}

// ─── RENDERIZADO DE TARJETAS ────────────────────────────────

function crearFilaTramo(etiqueta, tramo, logo, nombreAerolinea) {
    return `
        <div class="fila">
            <div class="aerolinea">
                <img src="${logo}" class="aeroargentina">
                <p class="nombreAerolinea">${nombreAerolinea}</p>
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
                <img src="../images/VALIJA-color.svg"  class="valija">
                <img src="../images/MALETA-color.svg"  class="maleta">
            </div>
        </div>`;
}

function crearTarjetaVuelo(vuelo, esIdaYVuelta) {
    const precio = vuelo.precio.toLocaleString("es-AR");
    const claveEscala = obtenerClaveEscala(vuelo.ida.tipoVuelo);

    const filaVuelta = esIdaYVuelta
        ? crearFilaTramo("VUELTA", vuelo.vuelta, vuelo.logo, vuelo.aerolinea)
        : "";

    return `
        <div class="tarjeta-vuelo"
             data-vuelo-id="${vuelo.id}"
             data-precio="${vuelo.precio}"
             data-aerolinea="${vuelo.claveAerolinea}"
             data-escalas="${claveEscala}">
            <div class="informacion">
                ${crearFilaTramo("IDA", vuelo.ida, vuelo.logo, vuelo.aerolinea)}
                ${filaVuelta}
            </div>
            <div class="precio">
                <span class="desde">desde</span>
                <div class="monto">US$ ${precio}</div>
                <a href="DetalleDeVuelo.html" class="boton-accion">Comprar</a>
            </div>
        </div>`;
}

// ─── FUNCIÓN PRINCIPAL DE RENDERIZADO ───────────────────────

export function renderizarVuelos() {
    const contenedor = document.querySelector(".opciones-vuelos");
    if (!contenedor) return;

    const busquedaGuardada = sessionStorage.getItem("busquedaVuelo");
    const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : null;

    // Sin búsqueda: pedir que busquen desde el inicio
    if (!busqueda || !busqueda.destino) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <p>Ingresa un destino desde la busqueda para ver los vuelos disponibles.</p>
            </div>`;
        return;
    }

    const resultado = obtenerVuelosPorDestino(busqueda.destino, 8);

    if (!resultado.destino) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <p>No encontramos vuelos para "<strong>${busqueda.destino}</strong>". Proba con otro destino.</p>
            </div>`;
        return;
    }

    const esIdaYVuelta = !busqueda.tipoVuelo || !busqueda.tipoVuelo.toLowerCase().includes("solo");

    contenedor.innerHTML = resultado.vuelos
        .map(v => crearTarjetaVuelo(v, esIdaYVuelta))
        .join("");
}