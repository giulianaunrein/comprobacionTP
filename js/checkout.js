document.addEventListener('DOMContentLoaded', function () {

    // ─── VERIFICAR LOGIN ─────────────────────────────────────────
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
        // Guardar la página actual para volver después del login
        sessionStorage.setItem("redirigirDespuesLogin", window.location.href);
        window.location.href = "InicioSesion.html";
        return;
    }

    const tarjetaResumen = document.getElementById('resumen-vuelo-card');
    if (!tarjetaResumen) {
        console.error('checkout.js: no se encontró resumen-vuelo-card');
        return;
    }

    // Lee de sessionStorage (puesto por detalleVuelo.js)
    const vueloGuardado = JSON.parse(sessionStorage.getItem("vueloSeleccionado"));
    // Adapta la estructura del objeto al formato que usa el checkout
    function adaptarVuelo(v) {
        if (!v) return null;
        return {
            ida: {
                origen:  v.ida?.origen  || "Buenos Aires (EZE)",
                destino: v.ida?.destino || "Sin destino",
                fecha:   v.ida?.fecha   || "A confirmar",
                horario: v.ida?.horaSalida && v.ida?.horaLlegada
                            ? `${v.ida.horaSalida} - ${v.ida.horaLlegada}`
                            : (v.ida?.horario || "-"),
                escala:  v.ida?.escala  || "-"
            },
            vuelta: v.vuelta ? {
                origen:  v.vuelta.origen  || "",
                destino: v.vuelta.destino || "",
                fecha:   v.vuelta.fecha   || "A confirmar",
                horario: v.vuelta.horaSalida && v.vuelta.horaLlegada
                            ? `${v.vuelta.horaSalida} - ${v.vuelta.horaLlegada}`
                            : (v.vuelta.horario || "-"),
                escala:  v.vuelta.escala  || "-"
            } : null,
            pasajeros:  v.cantidadPasajeros || 1,
            precioBase: v.precioTotal
                            ? v.precioTotal - 100 * (v.cantidadPasajeros || 1)
                            : (v.precio || 0),
            impuestos:  100 * (v.cantidadPasajeros || 1)
        };
    }

    const vueloData = adaptarVuelo(vueloGuardado) ?? {
        ida: {
            origen:  "Buenos Aires (EZE)",
            destino: "Sin destino",
            fecha:   "A confirmar",
            horario: "-",
            escala:  "-"
        },
        vuelta:     null,
        pasajeros:  1,
        precioBase: 0,
        impuestos:  0
    };

    const estado = {
        vuelo: vueloData,
        descuentoPorcentaje: 0,
        cuponAplicado: null
    };

    const formatearMonto = (numero) =>
        'US$ ' + numero.toLocaleString('es-AR', { maximumFractionDigits: 0 });

    // RENDERIZADO DEL RESUMEN
    function renderizarItinerario() {
        const contenedor = document.getElementById('resumen-itinerario');
        const { ida, vuelta } = estado.vuelo;

        const htmlVuelta = vuelta ? `
            <div class="separador-puntos"></div>
            <section class="tramo-vuelo">
                <p class="itinerario"><strong>Vuelta:</strong> ${vuelta.origen} ➔ ${vuelta.destino}</p>
                <div class="info-salida">
                    <span><img src="../images/calendario.svg" alt=""> ${vuelta.fecha}</span>
                    <span><img src="../images/tiempo.svg" alt=""> ${vuelta.horario}</span>
                </div>
                <p class="detalle-escala">${vuelta.escala}</p>
            </section>
        ` : '';

        contenedor.innerHTML = `
            <section class="tramo-vuelo">
                <p class="itinerario"><strong>Ida:</strong> ${ida.origen} ➔ ${ida.destino}</p>
                <div class="info-salida">
                    <span><img src="../images/calendario.svg" alt=""> ${ida.fecha}</span>
                    <span><img src="../images/tiempo.svg" alt=""> ${ida.horario}</span>
                </div>
                <p class="detalle-escala">${ida.escala}</p>
            </section>
            ${htmlVuelta}
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
        return Math.round(subtotal - subtotal * (estado.descuentoPorcentaje / 100));
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

    // ─── PRE-RELLENAR DATOS DEL USUARIO LOGUEADO ─────────────────
    const inputNombre = document.getElementById('full_name');
    const inputEmail  = document.getElementById('passenger_email');
    if (inputNombre && usuarioLogueado.nombre) inputNombre.value = usuarioLogueado.nombre;
    if (inputEmail  && usuarioLogueado.email)  inputEmail.value  = usuarioLogueado.email;

    // VALIDACIÓN DEL PASAJERO
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
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())) return 'Ingresá un correo electrónico válido.';
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
        campos[clave].input.addEventListener('input', () => validarCampo(clave));
        campos[clave].input.addEventListener('blur',  () => validarCampo(clave));
    });

    function validarDatosPasajero() {
        let todoValido = true;
        Object.keys(campos).forEach((clave) => {
            if (!validarCampo(clave)) todoValido = false;
        });
        return todoValido;
    }

    // MÉTODO DE PAGO
    const radiosMetodoPago = document.querySelectorAll('input[name="metodo_pago"]');
    const metodoHeaders    = document.querySelectorAll('.metodo-header');

    function actualizarSeleccionMetodoPago() {
        metodoHeaders.forEach(h => h.classList.remove('metodo-seleccionado'));
        radiosMetodoPago.forEach(radio => {
            if (radio.checked) {
                document.querySelector(`label[for="${radio.id}"]`)
                    ?.classList.add('metodo-seleccionado');
            }
        });
    }

    radiosMetodoPago.forEach(radio =>
        radio.addEventListener('change', actualizarSeleccionMetodoPago)
    );
    actualizarSeleccionMetodoPago();

    function obtenerMetodoPagoSeleccionado() {
        return document.querySelector('input[name="metodo_pago"]:checked')?.value || null;
    }

    // CUPÓN
    const cuponesValidos = { 'FLYNOW10': 10, 'VERANO15': 15, 'BIENVENIDA5': 5 };
    const inputCupon  = document.getElementById('discount_coupon');
    const botonCupon  = document.getElementById('btn-aplicar-cupon');
    const errorCupon  = document.getElementById('error_cupon');

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
        botonCupon.dataset.aplicado === 'true' ? quitarCupon() : aplicarCupon();
    });

    inputCupon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); aplicarCupon(); }
    });

    // VALIDACIÓN MÉTODO DE PAGO
    function validarMetodoPago() {
        const metodo = obtenerMetodoPagoSeleccionado();
        if (metodo === 'tarjeta') {
            const numero     = document.getElementById('card_number').value.trim();
            const vencimiento = document.getElementById('expiration').value.trim();
            const cvv        = document.getElementById('cvv').value.trim();
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
            const emailPaypal = document.querySelector('.datos.paypal input[type="email"]')?.value.trim();
            if (!emailPaypal) {
                alert('Ingresá tu correo de PayPal para continuar.');
                return false;
            }
        }
        return true;
    }

    // BOTÓN PAGAR
    document.getElementById('btn-pagar').addEventListener('click', function () {
        if (!validarDatosPasajero()) {
            document.querySelector('.campo-invalido')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (!validarMetodoPago()) return;
        window.location.href = 'MiCuenta.html';
    });

});