
export const vuelos = [
    {
        id: 1,
        origen: "Buenos Aires",
        destino: "Bariloche",
        codigo: "BRC",
        pais: "Argentina",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Nacional",
        aerolinea: "Aerolíneas Argentinas",
        clase: "Economy",
        equipajeIncluido: "Mochila",
        escalas: false,
        ocupados: ["1A", "2B", "3C"],
        duracion: "2h 20m",
        salida: "08:00",
        llegada: "10:20",
        precioBase: 200,
        oferta: true,
        imagen: "../images/bariloche.png",
        informacion: "Bariloche te espera con montañas, lagos y paisajes únicos ideales para descansar y hacer turismo aventura."
    },
    {
        id: 1,
        origen: "Buenos Aires",
        destino: "Bariloche",
        codigo: "BRC",
        pais: "Argentina",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Nacional",
        aerolinea: "Aerolíneas Argentinas",
        escalas: false,
        ocupados: ["1A", "2B", "3C"],
        duracion: "2h 20m",
        salida: "08:00",
        llegada: "10:20",
        precioBase: 300,
        oferta: false,
        imagen: "../images/bariloche.png",
        informacion: "Bariloche te espera con montañas, lagos y paisajes únicos ideales para descansar y hacer turismo aventura."
    },
    {
        id: 2,
        origen: "Buenos Aires",
        destino: "Mendoza",
        codigo: "MDZ",
        pais: "Argentina",
        tipoViaje: "Solo ida",
        tipoVuelo: "Nacional",
        aerolinea: "JetSmart",
        escalas: false,
        ocupados: ["1A", "1B", "4C"],
        duracion: "1h 50m",
        salida: "13:00",
        llegada: "14:50",
        precioBase: 150,
        oferta: false,
        imagen: "../images/mendoza.jpg",
        informacion: "Mendoza es famosa por sus vinos, viñedos y la Cordillera de los Andes, ideal para turismo gastronómico y naturaleza."
    },
    {
        id: 3,
        origen: "Buenos Aires",
        destino: "Córdoba",
        codigo: "COR",
        pais: "Argentina",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Nacional",
        aerolinea: "Aerolíneas Argentinas",
        escalas: false,
        ocupados: ["2A", "2C", "5D"],
        duracion: "1h 25m",
        salida: "07:30",
        llegada: "08:55",
        precioBase: 120,
        oferta: false,
        imagen: "../images/cordoba.jpg",
        informacion: "Córdoba combina sierras, ríos y ciudades históricas, ideal para escapadas cortas y turismo activo."
    },
    {
        id: 3,
        origen: "Buenos Aires",
        destino: "Ushuaia",
        codigo: "USH",
        pais: "Argentina",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Nacional",
        aerolinea: "Aerolíneas Argentinas",
        escalas: false,
        ocupados: ["2A", "2C", "5D"],
        duracion: "1h 25m",
        salida: "07:30",
        llegada: "08:55",
        precioBase: 120,
        oferta: false,
        imagen: "../images/ushuaia.avif",
        informacion: "Ushuaia combina montañas, naturaleza y paisajes únicos en el extremo sur de Argentina."
    },
    {
        id: 4,
        origen: "Buenos Aires",
        destino: "Iguazú",
        codigo: "IGR",
        pais: "Argentina",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Nacional",
        aerolinea: "Flybondi",
        clase: "Economy",
        equipajeIncluido: "Mochila",
        escalas: false,
        ocupados: ["1A", "3B", "6F"],
        duracion: "1h 55m",
        salida: "11:20",
        llegada: "13:15",
        precioBase: 170,
        oferta: true,
        imagen: "../images/iguazu.jpg",
        informacion: "Iguazú es hogar de una de las maravillas naturales del mundo: sus cataratas imponentes rodeadas de selva."
    },
    {
        id: 5,
        origen: "Buenos Aires",
        destino: "Salta",
        codigo: "SLA",
        pais: "Argentina",
        tipoViaje: "Solo ida",
        tipoVuelo: "Nacional",
        aerolinea: "JetSmart",
        escalas: false,
        ocupados: ["1A", "2B"],
        duracion: "2h 15m",
        salida: "15:30",
        llegada: "17:45",
        precioBase: 300,
        oferta: false,
        imagen: "../images/salta.jpg",
        informacion: "Salta combina cultura, montañas coloridas y tradición del norte argentino con paisajes únicos."
    },
    {
        id: 6,
        origen: "Buenos Aires",
        destino: "Madrid",
        codigo: "MAD",
        pais: "España",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Internacional",
        aerolinea: "Aerolíneas Argentinas",
        escalas: false,
        ocupados: ["10A", "10B", "11C"],
        duracion: "11h 40m",
        salida: "12:00",
        llegada: "08:40",
        precioBase: 1000,
        oferta: false,
        imagen: "../images/madrid.png",
        informacion: "Madrid es una ciudad vibrante con historia, museos, vida nocturna y una fuerte cultura gastronómica."
    },
    {
        id: 7,
        origen: "Buenos Aires",
        destino: "Roma",
        codigo: "FCO",
        pais: "Italia",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Internacional",
        aerolinea: "Iberia",
        clase: "Economy",
        equipajeIncluido: "Mochila",
        escalas: true,
        ocupados: ["1A", "2C", "3D"],
        duracion: "14h 20m",
        salida: "10:30",
        llegada: "07:50",
        precioBase: 850,
        oferta: true,
        imagen: "../images/roma.avif",
        informacion: "Roma es historia viva: monumentos antiguos, arte y cultura en cada rincón de la ciudad eterna."
    },
    {
        id: 8,
        origen: "Buenos Aires",
        destino: "Miami",
        codigo: "MIA",
        pais: "Estados Unidos",
        tipoViaje: "Solo ida",
        tipoVuelo: "Internacional",
        aerolinea: "LATAM",
        escalas: false,
        ocupados: ["1A", "1B"],
        duracion: "9h 15m",
        salida: "15:00",
        llegada: "00:15",
        precioBase: 1800,
        oferta: false,
        imagen: "../images/miami.jpg",
        informacion: "Miami combina playas, vida nocturna y compras en una ciudad moderna y turística todo el año."
    },
    {
        id: 9,
        origen: "Buenos Aires",
        destino: "Cancún",
        codigo: "CUN",
        pais: "Mexico",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Internacional",
        aerolinea: "LATAM",
        clase: "Economy",
        equipajeIncluido: "Mochila",
        escalas: true,
        ocupados: ["2A", "2B", "3C"],
        duracion: "12h 30m",
        salida: "21:00",
        llegada: "09:30",
        precioBase: 1700,
        oferta: true,
        imagen: "../images/cancun.jpg",
        informacion: "Cancún ofrece playas paradisíacas, aguas turquesa y una fuerte vida turística y nocturna."
    },
    {
        id: 10,
        origen: "Buenos Aires",
        destino: "París",
        codigo: "CDG",
        pais: "Francia",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Internacional",
        aerolinea: "Air France",
        escalas: false,
        ocupados: ["1A", "1B", "1C"],
        duracion: "13h 10m",
        salida: "22:15",
        llegada: "11:25",
        precioBase: 2500,
        oferta: false,
        imagen: "../images/paris.avif",
        informacion: "París es la ciudad del amor, la moda y el arte con monumentos icónicos como la Torre Eiffel."
    },
    {
        id: 11,
        origen: "Buenos Aires",
        destino: "Río de Janeiro",
        codigo: "GIG",
        pais: "Brasil",
        tipoViaje: "Solo ida",
        tipoVuelo: "Internacional",
        aerolinea: "LATAM",
        clase: "Economy",
        equipajeIncluido: "Mochila",
        escalas: false,
        ocupados: ["1A", "2B"],
        duracion: "3h 10m",
        salida: "09:40",
        llegada: "12:50",
        precioBase: 400,
        oferta: true,
        imagen: "../images/rio.png",
        informacion: "Río de Janeiro combina playas, carnaval y el Cristo Redentor con paisajes increíbles."
    },
    {
        id: 12,
        origen: "Buenos Aires",
        destino: "Santiago de Chile",
        codigo: "SCL",
        pais: "Chile",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Internacional",
        aerolinea: "Sky Airline",
        escalas: false,
        ocupados: ["2A", "2B"],
        duracion: "2h 30m",
        salida: "17:00",
        llegada: "19:30",
        precioBase: 450,
        oferta: false,
        imagen: "../images/santiago.jpg",
        informacion: "Santiago es una ciudad moderna rodeada de montañas, ideal para turismo urbano y nieve cercana."
    },
    {
        id: 13,
        origen: "Buenos Aires",
        destino: "Londres",
        codigo: "LHR",
        pais: "Reino Unido",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Internacional",
        aerolinea: "British Airways",
        escalas: true,
        ocupados: ["1A", "1B", "2C"],
        duracion: "15h 40m",
        salida: "20:30",
        llegada: "12:10",
        precioBase: 2800,
        oferta: false,
        imagen: "../images/londres.jpg",
        informacion: "Londres mezcla historia, realeza y modernidad con museos, parques y arquitectura icónica."
    },
    {
        id: 14,
        origen: "Buenos Aires",
        destino: "Nueva York",
        codigo: "JFK",
        pais: "Estados Unidos",
        tipoViaje: "Solo ida",
        tipoVuelo: "Internacional",
        aerolinea: "American Airlines",
        escalas: false,
        ocupados: ["1A", "2B"],
        duracion: "10h 20m",
        salida: "23:00",
        llegada: "09:20",
        precioBase: 2100,
        oferta: false,
        imagen: "../images/nueva.jpg",
        informacion: "Nueva York es la ciudad que nunca duerme, llena de rascacielos, cultura y entretenimiento."
    },
    {
        id: 15,
        origen: "Buenos Aires",
        destino: "Punta Cana",
        codigo: "PUJ",
        pais: "Republica Dominicana",
        tipoViaje: "Ida y vuelta",
        tipoVuelo: "Internacional",
        aerolinea: "LATAM",
        clase: "Economy",
        equipajeIncluido: "Mochila",
        escalas: true,
        ocupados: ["1A", "1B", "2C"],
        duracion: "11h 50m",
        salida: "19:10",
        llegada: "07:00",
        precioBase: 1300,
        oferta: true,
        imagen: "../images/puntacana.jpg",
        informacion: "Punta Cana es un destino de playas caribeñas, resorts y descanso total."
    }
];

// ─── FUNCIÓN DE TARJETA (usada por otras páginas del grupo) ─

export function generarTarjetaVuelo(vuelo) {
    const aerolineaSlug = vuelo.aerolinea
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[áéíóú]/g, c => ({ á:"a", é:"e", í:"i", ó:"o", ú:"u" }[c]));

    const escalasKey = !vuelo.escalas
        ? "directo"
        : vuelo.escalas === 1 ? "1escala" : "2escalas";

    const tieneMano   = vuelo.equipajeIncluido === "Mano"   || vuelo.equipajeIncluido === "Bodega";
    const tieneBodega = vuelo.equipajeIncluido === "Bodega";

    const iconoPersonal = `../images/equipaje/mochila-color.svg`;
    const iconoMano     = `../images/equipaje/valija${tieneMano   ? "-color" : ""}.svg`;
    const iconoBodega   = `../images/equipaje/maleta${tieneBodega ? "-color" : ""}.svg`;

    const logoAerolinea = `../images/aerolineas/${aerolineaSlug}.png`;
    const escalasTexto  = !vuelo.escalas ? "Directo" : vuelo.escalas === 1 ? "1 escala" : "2+ escalas";

    const esIdaYVuelta = vuelo.tipoViaje === "Ida y vuelta";
    const filaVuelta = esIdaYVuelta ? `
        <div class="fila">
            <img src="${logoAerolinea}" alt="${vuelo.aerolinea}" class="logo-aerolinea">
            <span class="nombreAerolinea">${vuelo.aerolinea}</span>
            <div class="info">
                <div class="hora"><strong>${vuelo.llegada}</strong><span class="ciudad">${vuelo.destino}</span></div>
                <div class="tiempo">${vuelo.duracion}</div>
                <div class="hora"><strong>${vuelo.salida}</strong><span class="ciudad">${vuelo.origen}</span></div>
            </div>
            <span class="escalas-texto">${escalasTexto}</span>
        </div>` : "";

    return `
    <article class="tarjeta-vuelo"
        data-precio="${vuelo.precioBase}"
        data-aerolinea="${aerolineaSlug}"
        data-escalas="${escalasKey}">
        <div class="fila">
            <img src="${logoAerolinea}" alt="${vuelo.aerolinea}" class="logo-aerolinea">
            <span class="nombreAerolinea">${vuelo.aerolinea}</span>
            <div class="info">
                <div class="hora"><strong>${vuelo.salida}</strong><span class="ciudad">${vuelo.origen}</span></div>
                <div class="tiempo">${vuelo.duracion}</div>
                <div class="hora"><strong>${vuelo.llegada}</strong><span class="ciudad">${vuelo.destino}</span></div>
            </div>
            <span class="escalas-texto">${escalasTexto}</span>
        </div>
        ${filaVuelta}
        <div class="equipaje">
            <img src="${iconoPersonal}" alt="artículo personal" class="mochila">
            <img src="${iconoMano}"     alt="equipaje de mano"  class="valija">
            <img src="${iconoBodega}"   alt="equipaje de bodega" class="maleta">
        </div>
        <div class="precio">
            <span class="monto">US$ ${vuelo.precioBase.toLocaleString("es-AR")}</span>
            <a href="detalle.html" class="boton-accion">Comprar</a>
        </div>
    </article>`;
}

// ─── DESTINOS (para la página de resultados con búsqueda dinámica) ──

export const destinos = [
    { destino: "Bariloche",         pais: "Argentina",       precio: 420,  tipo: "nacional",      imagen: "../images/bariloche.png" },
    { destino: "Madrid",            pais: "España",           precio: 1450, tipo: "internacional", imagen: "../images/madrid.png" },
    { destino: "Ushuaia",           pais: "Argentina",       precio: 780,  tipo: "nacional",      imagen: "../images/ushuaia.avif" },
    { destino: "Salta",             pais: "Argentina",       precio: 250,  tipo: "nacional",      imagen: "../images/salta.jpg" },
    { destino: "Neuquen",           pais: "Argentina",       precio: 180,  tipo: "nacional",      imagen: "../images/neuquen.jpg" },
    { destino: "Cordoba",           pais: "Argentina",       precio: 140,  tipo: "nacional",      imagen: "../images/cordoba.jpg" },
    { destino: "Roma",              pais: "Italia",           precio: 1380, tipo: "internacional", imagen: "../images/roma.avif" },
    { destino: "Paris",             pais: "Francia",          precio: 1520, tipo: "internacional", imagen: "../images/paris.avif" },
    { destino: "Barcelona",         pais: "España",           precio: 1340, tipo: "internacional", imagen: "../images/barcelona.jpg" },
    { destino: "Bogota",            pais: "Colombia",         precio: 720,  tipo: "internacional", imagen: "../images/bogota.avif" },
    { destino: "Calafate",          pais: "Argentina",       precio: 650,  tipo: "nacional",      imagen: "../images/calafate.jpg" },
    { destino: "Cancun",            pais: "Mexico",           precio: 980,  tipo: "internacional", imagen: "../images/cancun.jpg" },
    { destino: "Mar del Plata",     pais: "Argentina",       precio: 120,  tipo: "nacional",      imagen: "../images/mardel.jpg" },
    { destino: "Rio de Janeiro",    pais: "Brasil",           precio: 650,  tipo: "internacional", imagen: "../images/rio.png" },
    { destino: "Santiago de Chile", pais: "Chile",            precio: 420,  tipo: "internacional", imagen: "../images/santiago.jpg" },
    { destino: "Mendoza",           pais: "Argentina",       precio: 200,  tipo: "nacional",      imagen: "../images/mendoza.jpg" },
    { destino: "Iguazu",            pais: "Argentina",       precio: 170,  tipo: "nacional",      imagen: "../images/iguazu.jpg" },
    { destino: "Miami",             pais: "Estados Unidos",   precio: 1800, tipo: "internacional", imagen: "../images/miami.jpg" },
    { destino: "Nueva York",        pais: "Estados Unidos",   precio: 2100, tipo: "internacional", imagen: "../images/nueva.jpg" },
    { destino: "Londres",           pais: "Reino Unido",      precio: 2800, tipo: "internacional", imagen: "../images/londres.jpg" },
    { destino: "Punta Cana",        pais: "Rep. Dominicana",  precio: 1300, tipo: "internacional", imagen: "../images/puntacana.jpg" }
];

// ─── AEROLÍNEAS ─────────────────────────────────────────────

const aerolineas = [
    { nombre: "Aerolineas Argentinas", logo: "../images/AeroArgentinas.jpg", clave: "argentinas" },
    { nombre: "Iberia",                logo: "../images/Iberia.jpg",          clave: "iberia" },
    { nombre: "Air Europa",            logo: "../images/airEuropa.png",       clave: "europa" },
    { nombre: "LATAM Airlines",        logo: "../images/latam.png",           clave: "latam" },
    { nombre: "Lufthansa",             logo: "../images/Lufthansa.png",       clave: "lufthansa" }
];

const codigosAeropuerto = {
    "Bariloche": "BRC", "Madrid": "MAD", "Ushuaia": "USH", "Salta": "SLA",
    "Neuquen": "NQN", "Cordoba": "COR", "Roma": "FCO", "Paris": "CDG",
    "Barcelona": "BCN", "Bogota": "BOG", "Calafate": "FTE", "Cancun": "CUN",
    "Mar del Plata": "MDQ", "Rio de Janeiro": "GIG", "Santiago de Chile": "SCL",
    "Mendoza": "MDZ", "Iguazu": "IGR", "Miami": "MIA", "Nueva York": "JFK",
    "Londres": "LHR", "Punta Cana": "PUJ"
};

const ORIGEN_DEFAULT = { ciudad: "Buenos Aires, Argentina", codigo: "EZE" };

// El sistema solo opera vuelos que SALEN de Buenos Aires. Estas son las
// formas válidas en que un usuario podría haber escrito ese origen.
const ORIGENES_VALIDOS = [
    "buenos aires", "bs as", "bsas", "bs. as.", "caba",
    "ciudad autonoma de buenos aires", "eze", "ezeiza", "argentina"
];

// Devuelve true si el texto ingresado como origen corresponde a Buenos Aires.
// Si el campo viene vacío, se considera válido (no filtramos por algo que
// el usuario no completó).
function esOrigenValido(textoOrigen) {
    const norm = normalizar(textoOrigen);
    if (!norm) return true;
    return ORIGENES_VALIDOS.some(o => norm.includes(o) || o.includes(norm));
}

function obtenerCodigo(nombreDestino) {
    return codigosAeropuerto[nombreDestino] || nombreDestino.substring(0, 3).toUpperCase();
}

function horarioAleatorio() {
    const h = Math.floor(Math.random() * 24).toString().padStart(2, "0");
    const m = ([0,5,10,15,20,25,30,35,40,45,50,55][Math.floor(Math.random()*12)]).toString().padStart(2,"0");
    return `${h}:${m}`;
}

function sumarDuracion(salida, horas, minutos) {
    const [h, m] = salida.split(":").map(Number);
    let total = h * 60 + m + horas * 60 + minutos;
    total = total % (24 * 60);
    return `${Math.floor(total/60).toString().padStart(2,"0")}:${(total%60).toString().padStart(2,"00")}`;
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

function normalizar(texto) {
    return (texto || "").toString().trim().toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function obtenerClaveEscala(tipoVuelo) {
    return normalizar(tipoVuelo).replace(/\s+/g, "");
}

function generarVuelosParaDestino(destinoObj, cantidad) {
    const codigo = obtenerCodigo(destinoObj.destino);
    const vuelosGenerados = [];

    for (let i = 0; i < cantidad; i++) {
        const aerolinea = aerolineas[Math.floor(Math.random() * aerolineas.length)];
        const precio = Math.round(destinoObj.precio * (0.9 + Math.random() * 0.45));

        const idaSalida  = horarioAleatorio();
        const idaInfo    = generarDuracionYTipo(destinoObj.tipo);
        const idaLlegada = sumarDuracion(idaSalida, idaInfo.horas, idaInfo.minutos);

        const vueltaSalida  = horarioAleatorio();
        const vueltaInfo    = generarDuracionYTipo(destinoObj.tipo);
        const vueltaLlegada = sumarDuracion(vueltaSalida, vueltaInfo.horas, vueltaInfo.minutos);

        vuelosGenerados.push({
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
    return vuelosGenerados;
}

function buscarDestino(textoBuscado) {
    const norm = normalizar(textoBuscado);
    if (!norm) return null;
    return destinos.find(d => {
        const n = normalizar(d.destino);
        return n.includes(norm) || norm.includes(n);
    }) || null;
}

export function obtenerVuelosPorDestino(textoDestino, cantidad = 6, textoOrigen = "") {
    if (!esOrigenValido(textoOrigen)) return { destino: null, vuelos: [], origenInvalido: true };

    const destinoEncontrado = buscarDestino(textoDestino);
    if (!destinoEncontrado) return { destino: null, vuelos: [] };
    return { destino: destinoEncontrado, vuelos: generarVuelosParaDestino(destinoEncontrado, cantidad) };
}

// ─── RENDERIZADO PARA RESULTADOS (búsqueda desde index) ─────

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

export function renderizarVuelos() {
    const contenedor = document.querySelector(".opciones-vuelos");
    if (!contenedor) return;

    const busquedaGuardada = sessionStorage.getItem("busquedaVuelo");
    const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : null;

    if (!busqueda || !busqueda.destino) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <p>Ingresá un destino desde la búsqueda para ver los vuelos disponibles.</p>
            </div>`;
        return;
    }

    const resultado = obtenerVuelosPorDestino(busqueda.destino, 8, busqueda.origen);

    if (resultado.origenInvalido) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <p>No encontramos vuelos desde "<strong>${busqueda.origen}</strong>". Actualmente todos nuestros vuelos parten desde Buenos Aires.</p>
            </div>`;
        return;
    }

    if (!resultado.destino) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <p>No encontramos vuelos para "<strong>${busqueda.destino}</strong>". Probá con otro destino.</p>
            </div>`;
        return;
    }

    const esIdaYVuelta = !busqueda.tipoVuelo || !busqueda.tipoVuelo.toLowerCase().includes("solo");

    contenedor.innerHTML = resultado.vuelos
        .map(v => crearTarjetaVuelo(v, esIdaYVuelta))
        .join("");
}