// COMPONENTE DEL HEADER
class MiHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
          <nav class="menu">
              <section class="menu-izquierda">
                <a href="/index.html"><img class="logo" src="/images/logo.png" alt="logo" height="35"></a>
              </section>

              <section class="menu-medio">
              <input type="checkbox" id="menu-toggle" class="menu-checkbox">
              <label for="menu-toggle" class="menu-icono-hamburguesa">
                  <span></span>
                  <span></span>
                  <span></span>
              </label>
              <ul>
                  <li><a href="/index.html">Inicio</a></li>
                  <li><a href="/pages/vuelos.html">Vuelos</a></li>
                  <li><a href="/pages/ofertas.html">Ofertas</a></li>
                  <li><a href="/pages/contacto.html">Contacto</a></li>
                  <li><a href="/pages/MiCuenta.html">Reservas</a></li>
                  <li><a href="/pages/perfil.html">Perfil</a></li>
              </ul>
              </section>

              <section class="menu-derecha">
                  <details class="iniciar-sesion">
                      <summary>¡Hola!</summary>
                      <a href="#" id="btn-cerrar-sesion" class="cerrar-sesion">Cerrar sesión</a>
                  </details>
                  <a href="/pages/InicioSesion.html">
                      <img class="usuario" src="/images/usuario.png" alt="usuario" width="30">
                  </a>
              </section>
          </nav>
      </header>
    `;
  }
}

// COMPONENTE DEL FOOTER
class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
          <div class="f-suscripcion">
              <h2>¡No te pierdas de nada!</h2>
              <p>Hey! Suscribite a nuestro newsletter para enterarte de todo antes que nadie. Que no se corte!</p>

              <form action="/procesar-datos" method="POST">
                  <div class="divForm">
                      <input placeholder="Ingresá tu mail" type="email" id="mail" name="mail" required="">
                      <button id="Enviar" type="submit">Enviar</button>
                  </div>
              </form>
          </div>

          <div class="f-Menu">
              <div class="f-section">
                  <h2 class="f-titulos">Nosotros</h2>
                  <ul>
                      <li><a href="/pages/contacto.html">Sobre FlyNow</a></li>
                      <li><a href="#faq-section">Preguntas frecuentes</a></li>
                      <li><a href="/pages/condiciones.html">Terminos y condiciones</a></li>
                  </ul>
              </div>
              <div class="f-section">
                  <h2 class="f-titulos">Mapa del sitio</h2>
                  <ul>
                      <li><a href="/index.html">Inicio</a></li>
                      <li><a href="/pages/contacto.html">Contacto</a></li>
                      <li><a href="/pages/resultados.html">Vuelos</a></li>
                      <li><a href="/pages/ofertas.html">Ofertas</a></li>
                  </ul>
              </div>
              <div class="f-section">
                  <h2 class="f-titulos">Redes</h2>
                  <ul class="f-redes">
                      <li><a href="https://www.instagram.com"><img class="iconoRedes" src="/images/redes/instagram.png" alt="instagram"></a></li>
                      <li><a href="https://www.facebook.com/"><img class="iconoRedes" src="/images/redes/facebook.png" alt="facebook"></a></li>
                      <li><a href="https://x.com/"><img class="iconoRedes" src="/images/redes/x.png" alt="X ex Twitter"></a></li>
                  </ul>
              </div>
              <div class="f-section">
                  <img class="f-logo" src="/images/logo.png" alt="FlyNow">
              </div>
          </div>
          <div class="f-Derechos">
              <p>Copyright © 2010-2026 FlyNow S.A. Todos los derechos reservados.</p>
          </div>
      </footer>
    `;
  }
}

// Registramos los componentes en el navegador
customElements.define('mi-header', MiHeader);
customElements.define('mi-footer', MiFooter);

// ─── LOGOUT ──────────────────────────────────────────────────
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'btn-cerrar-sesion') {
        e.preventDefault();
        localStorage.removeItem('usuarioLogueado');
        sessionStorage.removeItem('redirigirDespuesLogin');
        window.location.href = '/index.html';
    }
});

// ─── MOSTRAR NOMBRE DEL USUARIO EN EL HEADER ─────────────────
document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const summary = document.querySelector('.iniciar-sesion summary');
    if (summary) {
        summary.textContent = usuario ? `¡Hola, ${usuario.nombre.split(' ')[0]}!` : '¡Hola!';
    }
});