// ============================================================
// checkout.js
// Lógica de la página de Checkout (FlyNow)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // ------------------------------------------------------------------
    // 1. ESTADO GLOBAL DEL CHECKOUT
    // ------------------------------------------------------------------
    const tarjetaResumen = document.getElementById('resumen-vuelo-card');

    if (!tarjetaResumen) {
        console.error(
            'checkout.js: no se encontró el elemento con id="resumen-vuelo-card". ' +
            'Verificá que estás usando la última versión de checkout.html, ' +
            'que tiene ese id en la sección "Resumen de vuelo".'
        );
        return;
    }

    // Datos del vuelo definidos directamente en JS (más robusto que leerlos
    // desde un atributo data-* en el HTML, que es fácil de romper al copiar).
    // Si en el futuro estos datos vienen de una API, alcanza con reemplazar
    // este objeto por el resultado del fetch.
    const vueloData = {
        ida: {
            origen: "Buenos Aires (EZE)",
            destino: "Madrid (MAD)",
            fecha: "10/08/2026",
            horario: "12:00 - 08:40 (+1)",
            escala: "1 escala en Lima (LIM) — 11h 40m"
        },
        vuelta: {
            origen: "Madrid (MAD)",
            destino: "Buenos Aires (EZE)",
            fecha: "20/08/2026",
            horario: "18:30 - 06:40 (+1)",
            escala: "1 escala en Lima (LIM) — 11h 10m"
        },
        pasajeros: 1,
        precioBase: 1739,
        impuestos: 100
    };

    const estado = {
        vuelo: vueloData,
        descuentoPorcentaje: 0,
        cuponAplicado: null
    };

    const formatearMonto = (numero) => {
        return 'US$ ' + numero.toLocaleString('es-AR', { maximumFractionDigits: 0 });
    };

    // ------------------------------------------------------------------
    // 2. RENDERIZADO DINÁMICO DEL RESUMEN DE VUELO
    // ------------------------------------------------------------------
    function renderizarItinerario() {
        const contenedor = document.getElementById('resumen-itinerario');
        const { ida, vuelta } = estado.vuelo;

        contenedor.innerHTML = `
            <section class="tramo-vuelo">
                <p class="itinerario"><strong>Ida:</strong> ${ida.origen} ➔ ${ida.destino}</p>
                <div class="info-salida">
                    <span><img src="../images/calendario.svg" alt=""> ${ida.fecha}</span>
                    <span><img src="../images/tiempo.svg" alt=""> ${ida.horario}</span>
                </div>
                <p class="detalle-escala">${ida.escala}</p>
            </section>
            <div class="separador-puntos"></div>
            <section class="tramo-vuelo">
                <p class="itinerario"><strong>Vuelta:</strong> ${vuelta.origen} ➔ ${vuelta.destino}</p>
                <div class="info-salida">
                    <span><img src="../images/calendario.svg" alt=""> ${vuelta.fecha}</span>
                    <span><img src="../images/tiempo.svg" alt=""> ${vuelta.horario}</span>
                </div>
                <p class="detalle-escala">${vuelta.escala}</p>
            </section>
        `;
    }

    function renderizarPrecios() {
        const contenedor = document.getElementById('resumen-precios');
        const { pasajeros, precioBase, impuestos } = estado.vuelo;
        const etiquetaPasajeros = pasajeros === 1 ? '1 Adulto' : `${pasajeros} Adultos`;

        let filasDescuento = '';
        if (estado.descuentoPorcentaje > 0) {
            const montoDescuento = Math.round((precioBase + impuestos) * (estado.descuentoPorcentaje / 100));
            filasDescuento = `
                <div class="fila-precio cupon-exito">
                    <span>Descuento (${estado.cuponAplicado})</span>
                    <span>- ${formatearMonto(montoDescuento)}</span>
                </div>
            `;
        }

        contenedor.innerHTML = `
            <div class="fila-precio">
                <span>${etiquetaPasajeros}</span>
                <span>${formatearMonto(precioBase)}</span>
            </div>
            <div class="fila-precio">
                <span>Impuestos y tasas</span>
                <span>${formatearMonto(impuestos)}</span>
            </div>
            ${filasDescuento}
        `;
    }

    function calcularTotal() {
        const { precioBase, impuestos } = estado.vuelo;
        const subtotal = precioBase + impuestos;
        const descuento = subtotal * (estado.descuentoPorcentaje / 100);
        return Math.round(subtotal - descuento);
    }

    function actualizarTotales() {
        const total = calcularTotal();
        document.getElementById('monto-resumen').textContent = formatearMonto(total);
        document.getElementById('monto-total-pagar').textContent = formatearMonto(total);
    }

    function renderizarResumenCompleto() {
        renderizarItinerario();
        renderizarPrecios();
        actualizarTotales();
    }

    renderizarResumenCompleto();

    // ------------------------------------------------------------------
    // 3. VALIDACIÓN DE DATOS DEL PASAJERO
    // ------------------------------------------------------------------
    const campos = {
        full_name: {
            input: document.getElementById('full_name'),
            error: document.getElementById('error_full_name'),
            validar: (valor) => {
                if (!valor.trim()) return 'El nombre completo es obligatorio.';
                if (valor.trim().length < 3) return 'Ingresá un nombre válido.';
                if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor.trim())) return 'El nombre no debe contener números ni símbolos.';
                return '';
            }
        },
        document_number: {
            input: document.getElementById('document_number'),
            error: document.getElementById('error_document_number'),
            validar: (valor) => {
                if (!valor.trim()) return 'El documento es obligatorio.';
                if (!/^\d{6,9}$/.test(valor.trim())) return 'Ingresá un documento válido (6 a 9 números).';
                return '';
            }
        },
        passenger_email: {
            input: document.getElementById('passenger_email'),
            error: document.getElementById('error_passenger_email'),
            validar: (valor) => {
                if (!valor.trim()) return 'El correo electrónico es obligatorio.';
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexEmail.test(valor.trim())) return 'Ingresá un correo electrónico válido.';
                return '';
            }
        },
        phone: {
            input: document.getElementById('phone'),
            error: document.getElementById('error_phone'),
            validar: (valor) => {
                if (!valor.trim()) return 'El teléfono es obligatorio.';
                if (!/^[+\d\s-]{8,20}$/.test(valor.trim())) return 'Ingresá un teléfono válido.';
                return '';
            }
        }
    };

    function validarCampo(clave) {
        const campo = campos[clave];
        const mensaje = campo.validar(campo.input.value);

        if (mensaje) {
            campo.input.classList.add('campo-invalido');
            campo.error.textContent = mensaje;
            return false;
        } else {
            campo.input.classList.remove('campo-invalido');
            campo.error.textContent = '';
            return true;
        }
    }

    Object.keys(campos).forEach((clave) => {
        const campo = campos[clave];
        campo.input.addEventListener('input', () => validarCampo(clave));
        campo.input.addEventListener('blur', () => validarCampo(clave));
    });

    function validarDatosPasajero() {
        let todoValido = true;
        Object.keys(campos).forEach((clave) => {
            const valido = validarCampo(clave);
            if (!valido) todoValido = false;
        });
        return todoValido;
    }

    // ------------------------------------------------------------------
    // 4. MÉTODO DE PAGO: actualización visual dinámica
    // ------------------------------------------------------------------
    const radiosMetodoPago = document.querySelectorAll('input[name="metodo_pago"]');
    const metodoHeaders = document.querySelectorAll('.metodo-header');

    function actualizarSeleccionMetodoPago() {
        metodoHeaders.forEach((header) => header.classList.remove('metodo-seleccionado'));

        radiosMetodoPago.forEach((radio) => {
            if (radio.checked) {
                const headerAsociado = document.querySelector(`label[for="${radio.id}"]`);
                if (headerAsociado) headerAsociado.classList.add('metodo-seleccionado');
            }
        });
    }

    radiosMetodoPago.forEach((radio) => {
        radio.addEventListener('change', actualizarSeleccionMetodoPago);
    });

    actualizarSeleccionMetodoPago();

    function obtenerMetodoPagoSeleccionado() {
        const seleccionado = document.querySelector('input[name="metodo_pago"]:checked');
        return seleccionado ? seleccionado.value : null;
    }

    // ------------------------------------------------------------------
    // 5. CUPÓN DE DESCUENTO
    // ------------------------------------------------------------------
    const cuponesValidos = {
        'FLYNOW10': 10,
        'VERANO15': 15,
        'BIENVENIDA5': 5
    };

    const inputCupon = document.getElementById('discount_coupon');
    const botonCupon = document.getElementById('btn-aplicar-cupon');
    const errorCupon = document.getElementById('error_cupon');

    function aplicarCupon() {
        const codigo = inputCupon.value.trim().toUpperCase();

        if (!codigo) {
            errorCupon.textContent = 'Ingresá un código de cupón.';
            errorCupon.classList.remove('cupon-exito');
            return;
        }

        if (cuponesValidos[codigo]) {
            estado.descuentoPorcentaje = cuponesValidos[codigo];
            estado.cuponAplicado = codigo;
            errorCupon.textContent = `¡Cupón aplicado! ${cuponesValidos[codigo]}% de descuento.`;
            errorCupon.classList.add('cupon-exito');
            inputCupon.disabled = true;
            botonCupon.textContent = 'Quitar';
            botonCupon.dataset.aplicado = 'true';
        } else {
            estado.descuentoPorcentaje = 0;
            estado.cuponAplicado = null;
            errorCupon.textContent = 'El cupón ingresado no es válido.';
            errorCupon.classList.remove('cupon-exito');
        }

        renderizarPrecios();
        actualizarTotales();
    }

    function quitarCupon() {
        estado.descuentoPorcentaje = 0;
        estado.cuponAplicado = null;
        inputCupon.value = '';
        inputCupon.disabled = false;
        botonCupon.textContent = 'Aplicar';
        botonCupon.dataset.aplicado = 'false';
        errorCupon.textContent = '';
        errorCupon.classList.remove('cupon-exito');

        renderizarPrecios();
        actualizarTotales();
    }

    botonCupon.addEventListener('click', () => {
        if (botonCupon.dataset.aplicado === 'true') {
            quitarCupon();
        } else {
            aplicarCupon();
        }
    });

    inputCupon.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            aplicarCupon();
        }
    });

    // ------------------------------------------------------------------
    // 6. VALIDACIÓN ESPECÍFICA SEGÚN MÉTODO DE PAGO
    // ------------------------------------------------------------------
    function validarMetodoPago() {
        const metodo = obtenerMetodoPagoSeleccionado();

        if (metodo === 'tarjeta') {
            const numero = document.getElementById('card_number').value.trim();
            const vencimiento = document.getElementById('expiration').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            if (!numero || !vencimiento || !cvv) {
                alert('Completá todos los datos de la tarjeta para continuar.');
                return false;
            }
            if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(numero)) {
                alert('Ingresá un número de tarjeta válido (16 dígitos).');
                return false;
            }
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento)) {
                alert('Ingresá la fecha de vencimiento en formato MM/AA.');
                return false;
            }
            if (!/^\d{3,4}$/.test(cvv)) {
                alert('Ingresá un CVV válido.');
                return false;
            }
        }

        if (metodo === 'paypal') {
            const emailPaypal = document.querySelector('.datos.paypal input[type="email"]').value.trim();
            if (!emailPaypal) {
                alert('Ingresá tu correo de PayPal para continuar.');
                return false;
            }
        }

        // Transferencia bancaria no requiere datos adicionales del usuario
        return true;
    }

    // ------------------------------------------------------------------
    // 7. BOTÓN "PAGAR": validación general antes de redirigir
    // ------------------------------------------------------------------
    const botonPagar = document.getElementById('btn-pagar');

    botonPagar.addEventListener('click', function () {
        const datosValidos = validarDatosPasajero();
        const pagoValido = validarMetodoPago();

        if (!datosValidos) {
            document.querySelector('.campo-invalido')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!pagoValido) {
            return;
        }

        // Si todo es válido, redirige a la página de confirmación
        window.location.href = 'MiCuenta.html';
    });

});