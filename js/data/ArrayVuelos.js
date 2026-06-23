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

// ─────────────────────────────────────────────
//  RENDERIZADO DE TARJETAS DE VUELO
// ─────────────────────────────────────────────

export function generarTarjetaVuelo(vuelo) {
    const aerolineaSlug = vuelo.aerolinea
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[áéíóú]/g, c => ({ á:"a", é:"e", í:"i", ó:"o", ú:"u" }[c]));

    // "true" booleano se trata como "2+ escalas"; si tiene valor numérico, se usa ese
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

export function renderizarVuelos() {
    const contenedor = document.querySelector(".opciones-vuelos");
    if (!contenedor) return;

    const busquedaGuardada = sessionStorage.getItem("busquedaVuelo");
    const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : null;

    // Sin búsqueda guardada → mostrar todos
    if (!busqueda) {
        contenedor.innerHTML = vuelos.map(generarTarjetaVuelo).join("");
        return;
    }

    let vuelosFiltrados = [...vuelos];

    // Solo filtrar por origen y destino (busqueda parcial, sin tildes ni mayusculas).
    // No se filtra por tipoVuelo ni clase porque los valores del sessionStorage
    // no coinciden con los del array; esos filtros son del panel lateral.
    if (busqueda.origen) {
        const origen = normalizar(busqueda.origen);
        vuelosFiltrados = vuelosFiltrados.filter(v =>
            normalizar(v.origen).includes(origen)
        );
    }

    if (busqueda.destino) {
        const destino = normalizar(busqueda.destino);
        vuelosFiltrados = vuelosFiltrados.filter(v =>
            normalizar(v.destino).includes(destino)
        );
    }

    // Renderizar o mostrar mensaje
    if (vuelosFiltrados.length === 0) {
        const destino = busqueda.destino || "ese destino";
        contenedor.innerHTML = `
            <p id="sin-resultados" style="text-align:center; padding:3em; color:#777; font-size:1.1em;">
                No encontramos vuelos disponibles hacia <strong>${destino}</strong>.<br>
                Probá con otro destino o modificá los filtros.
            </p>`;
        return;
    }

    contenedor.innerHTML = vuelosFiltrados.map(generarTarjetaVuelo).join("");
}

// Normaliza texto: minúsculas + sin tildes para comparaciones flexibles
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}