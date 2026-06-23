

 export const destinos = [
    {
        destino: "Bariloche",
        pais: "Argentina",
        precio: 420,
        tipo: "nacional",
        informacion: "Bariloche te espera con sus paisajes únicos, montañas, lagos y bosques para unas vacaciones inolvidables. Ideal para los amantes de la naturaleza y la aventura.",
        imagen: "../images/bariloche.png"
    },
    {
        destino: "Madrid",
        pais: "España",
        precio: 1450,
        tipo: "internacional",
        informacion: "Madrid combina historia, cultura y gastronomía en una de las ciudades más vibrantes de Europa.",
        imagen: "../images/madrid.png"
    },
    {
        destino: "Ushuaia",
        pais: "Argentina",
        precio: 780,
        tipo: "nacional",
        informacion: "Ushuaia, la ciudad más austral del mundo, ofrece paisajes impresionantes, navegación por el Canal Beagle y aventuras en la Patagonia fueguina.",
        imagen: "../images/ushuaia.avif"
    },
    {
        destino: "Salta",
        pais: "Argentina",
        precio: 250,
        tipo: "nacional",
        informacion: "Salta combina historia, cultura y paisajes únicos como la Quebrada de Humahuaca y los Valles Calchaquíes.",
        imagen: "../images/salta.avif"
    },
    {
        destino: "Neuquen",
        pais: "Argentina",
        precio: 180,
        tipo: "nacional",
        informacion: "Neuquén es la puerta de entrada a la Patagonia, con lagos cristalinos, montañas y excelentes rutas para recorrer.",
        imagen: "../images/neuquen.jpg"
    },
    {
        destino: "Cordoba",
        pais: "Argentina",
        precio: 140,
        tipo: "nacional",
        informacion: "Córdoba ofrece sierras, ríos, gastronomía y una vibrante vida cultural ideal para escapadas durante todo el año.",
        imagen: "../images/cordoba.jpg"
    },
    {
        destino: "Roma",
        pais: "Italia",
        precio: 1380,
        tipo: "internacional",
        informacion: "Roma es una ciudad llena de historia, monumentos icónicos y una gastronomía reconocida mundialmente.",
        imagen: "../images/roma.avif"
    },
    {
        destino: "Paris",
        pais: "Francia",
        precio: 1520,
        tipo: "internacional",
        informacion: "París, la Ciudad de la Luz, enamora con su arquitectura, museos, cafés y lugares emblemáticos como la Torre Eiffel.",
        imagen: "../images/paris.avif"
    },
    {
        destino: "Barcelona",
        pais: "España",
        precio: 1340,
        tipo: "internacional",
        informacion: "Barcelona combina playa, cultura y arquitectura única gracias a las obras de Antoni Gaudí.",
        imagen: "../images/barcelona.jpg"
    },
    {
        destino: "Bogota",
        pais: "Colombia",
        precio: 720,
        tipo: "internacional",
        informacion: "Bogotá combina historia, cultura y gastronomía. Descubrí el barrio La Candelaria, el Cerro Monserrate y una vibrante vida urbana.",
        imagen: "../images/bogota.avif"
    },
    {
        destino: "Calafate",
        pais: "Argentina",
        precio: 650,
        tipo: "nacional",
        informacion: "El Calafate es la puerta de entrada al impresionante Glaciar Perito Moreno y uno de los destinos más visitados de la Patagonia.",
        imagen: "../images/calafate.jpg"
    },
    {
        destino: "Cancun",
        pais: "Mexico",
        precio: 980,
        tipo: "internacional",
        informacion: "Cancún ofrece playas paradisíacas de arena blanca, aguas turquesas y acceso a increíbles sitios arqueológicos mayas.",
        imagen: "../images/cancun.webp"
    },
    {
        destino: "Mar del Plata",
        pais: "Argentina",
        precio: 120,
        tipo: "nacional",
        informacion: "Mar del Plata es el principal destino de playa de Argentina, ideal para disfrutar del mar, la gastronomía y la vida nocturna.",
        imagen: "../images/mardel.jpg"
    },
    {
        destino: "Rio de Janeiro",
        pais: "Brasil",
        precio: 650,
        tipo: "internacional",
        informacion: "Río de Janeiro cautiva con el Cristo Redentor, el Pan de Azúcar, sus playas icónicas y un ambiente lleno de energía.",
        imagen: "../images/rio.png"
    },
    {
        destino: "Santiago de Chile",
        pais: "Chile",
        precio: 420,
        tipo: "internacional",
        informacion: "Santiago combina modernidad y naturaleza, con vistas a la Cordillera de los Andes, excelente gastronomía y atractivos culturales.",
        imagen: "../images/santiago.jpg"
    },
    {
        destino: "Mendoza",
        pais: "Argentina",
        precio: 200,
        tipo: "nacional",
        informacion: "Mendoza cautiva con sus paisajes y buen vino, con vistas preciosas para disfrutar",
        imagen: "../images/mendoza.jpg"
    }
];

// ------------------------------------------------------------------
// Catálogo de aerolíneas disponibles (con sus logos, igual a los que
// ya usás en resultados.html) para sortear entre ellas al generar
// los vuelos de ejemplo.
// ------------------------------------------------------------------
const aerolineas = [
    { nombre: "Aerolinea argentina", logo: "../images/AeroArgentinas.jpg" },
    { nombre: "Iberia", logo: "../images/Iberia.jpg" },
    { nombre: "Air Europa", logo: "../images/airEuropa.png" },
    { nombre: "LATAM Airlines", logo: "../images/latam.png" },
    { nombre: "Lufthansa", logo: "../images/Lufthansa.png" }
];

// Código de aeropuerto de origen por defecto (Buenos Aires)
const ORIGEN_DEFAULT = { ciudad: "Buenos Aires, Argentina", codigo: "EZE" };

// Mapeo simple destino -> código de aeropuerto (3 letras), para mostrar
// algo razonable en las tarjetas. Si no está mapeado, se usan las
// primeras 3 letras del nombre del destino en mayúsculas.
const codigosAeropuerto = {
    "Bariloche": "BRC",
    "Madrid": "MAD",
    "Ushuaia": "USH",
    "Salta": "SLA",
    "Neuquen": "NQN",
    "Cordoba": "COR",
    "Roma": "FCO",
    "Paris": "CDG",
    "Barcelona": "BCN",
    "Bogota": "BOG",
    "Calafate": "FTE",
    "Cancun": "CUN",
    "Mar del Plata": "MDQ",
    "Rio de Janeiro": "GIG",
    "Santiago de Chile": "SCL",
    "Mendoza": "MDZ"
};

function obtenerCodigoAeropuerto(nombreDestino) {
    return codigosAeropuerto[nombreDestino] || nombreDestino.substring(0, 3).toUpperCase();
}

// Genera un horario "HH:MM" aleatorio, usado para ida y vuelta.
function horarioAleatorio() {
    const hora = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutos = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55][Math.floor(Math.random() * 12)]
        .toString().padStart(2, '0');
    return `${hora}:${minutos}`;
}

// Suma horas:minutos a un horario "HH:MM" y devuelve el horario de llegada.
function sumarDuracion(horarioSalida, horasDuracion, minutosDuracion) {
    const [h, m] = horarioSalida.split(':').map(Number);
    let totalMinutos = h * 60 + m + horasDuracion * 60 + minutosDuracion;
    totalMinutos = totalMinutos % (24 * 60);
    const horaLlegada = Math.floor(totalMinutos / 60).toString().padStart(2, '0');
    const minutoLlegada = (totalMinutos % 60).toString().padStart(2, '0');
    return `${horaLlegada}:${minutoLlegada}`;
}

// Genera la duración y el tipo de vuelo (Directo / N Escalas) según si el
// destino es nacional o internacional, para que sea más realista.
function generarDuracionYTipo(tipoDestino) {
    const esNacional = tipoDestino === 'nacional';
    const opciones = esNacional
        ? [
            { horas: 2, minutos: 0, tipo: "Directo" },
            { horas: 2, minutos: 30, tipo: "Directo" },
            { horas: 3, minutos: 15, tipo: "1 Escala" }
        ]
        : [
            { horas: 11, minutos: 0, tipo: "Directo" },
            { horas: 12, minutos: 40, tipo: "Directo" },
            { horas: 18, minutos: 10, tipo: "1 Escala" },
            { horas: 25, minutos: 15, tipo: "2 Escalas" }
        ];
    return opciones[Math.floor(Math.random() * opciones.length)];
}

// Genera `cantidad` vuelos de ejemplo (ida y vuelta) para un destino dado,
// variando un poco el precio base, la aerolínea y los horarios.
function generarVuelosParaDestino(destinoObj, cantidad = 3) {
    const codigoDestino = obtenerCodigoAeropuerto(destinoObj.destino);
    const vuelos = [];

    for (let i = 0; i < cantidad; i++) {
        const aerolinea = aerolineas[Math.floor(Math.random() * aerolineas.length)];

        // Variación de precio: entre -10% y +35% del precio base, para que
        // no todas las tarjetas muestren exactamente el mismo monto.
        const variacion = 0.9 + Math.random() * 0.45;
        const precioFinal = Math.round(destinoObj.precio * variacion);

        const idaSalida = horarioAleatorio();
        const idaInfo = generarDuracionYTipo(destinoObj.tipo);
        const idaLlegada = sumarDuracion(idaSalida, idaInfo.horas, idaInfo.minutos);

        const vueltaSalida = horarioAleatorio();
        const vueltaInfo = generarDuracionYTipo(destinoObj.tipo);
        const vueltaLlegada = sumarDuracion(vueltaSalida, vueltaInfo.horas, vueltaInfo.minutos);

        const duracionTexto = (horas, minutos) =>
            minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h 00m`;

        vuelos.push({
            id: `${codigoDestino}-${i}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            destinoNombre: destinoObj.destino,
            pais: destinoObj.pais,
            tipo: destinoObj.tipo,
            precio: precioFinal,
            aerolinea: aerolinea.nombre,
            logo: aerolinea.logo,
            ida: {
                origenCiudad: ORIGEN_DEFAULT.codigo,
                destinoCiudad: codigoDestino,
                horaSalida: idaSalida,
                horaLlegada: idaLlegada,
                duracion: duracionTexto(idaInfo.horas, idaInfo.minutos),
                tipoVuelo: idaInfo.tipo
            },
            vuelta: {
                origenCiudad: codigoDestino,
                destinoCiudad: ORIGEN_DEFAULT.codigo,
                horaSalida: vueltaSalida,
                horaLlegada: vueltaLlegada,
                duracion: duracionTexto(vueltaInfo.horas, vueltaInfo.minutos),
                tipoVuelo: vueltaInfo.tipo
            }
        });
    }

    return vuelos;
}

// Normaliza texto para comparar sin importar mayúsculas, acentos o espacios
// extra (así "parís", "Paris " o "PARIS" matchean igual).
function normalizarTexto(texto) {
    return (texto || "")
        .toString()
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

const clavesAerolinea = {
    "Aerolinea argentina": "argentinas",
    "Iberia": "iberia",
    "Air Europa": "europa",
    "LATAM Airlines": "latam",
    "Lufthansa": "lufthansa"
};

function obtenerClaveAerolinea(nombreAerolinea) {
    return clavesAerolinea[nombreAerolinea] || normalizarTexto(nombreAerolinea).replace(/\s+/g, "");
}

function obtenerClaveEscala(tipoVuelo) {
    // "Directo" -> "directo" | "1 Escala" -> "1escala" | "2 Escalas" -> "2escalas"
    return normalizarTexto(tipoVuelo).replace(/\s+/g, "");
}

// Busca el destino del array cuyo nombre coincide (parcial o total) con el
// texto buscado. Devuelve null si no encuentra ninguno.
function buscarDestinoPorNombre(textoBuscado) {
    const normalizado = normalizarTexto(textoBuscado);
    if (!normalizado) return null;

    return destinos.find((d) => {
        const nombreNormalizado = normalizarTexto(d.destino);
        return nombreNormalizado.includes(normalizado) || normalizado.includes(nombreNormalizado);
    }) || null;
}

// Función principal: a partir del texto de destino que escribió el usuario,
// devuelve la lista de vuelos de ejemplo a mostrar en resultados.html.
function obtenerVuelosPorDestino(textoDestino, cantidad = 6) {
    const destinoEncontrado = buscarDestinoPorNombre(textoDestino);

    if (!destinoEncontrado) {
        return { destino: null, vuelos: [] };
    }

    return {
        destino: destinoEncontrado,
        vuelos: generarVuelosParaDestino(destinoEncontrado, cantidad)
    };
}