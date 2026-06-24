const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", (e) =>{
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;
    let errores = "";
    if(!validarNombreCompleto(nombre))
        errores += "nombre invalido. debe tener entre 9 y 40 caracteres";
        
    if(!validarEmail(email))
        errores += " email invalido ";

    let errorPass = validarContrasenia(password, confirmar);

    if (errorPass !== "") 
        errores += errorPass;

    if(!validarCheckbox())
        errores += "se debe aceptar terminos y condiciones ";

    if(errores !== ""){
        mensaje.textContent = errores; 
        mensaje.style.color ="red";
        return;
    }    
        const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre,
        email: email,
        password: password,
        reservas: []
        };

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const existe = usuarios.find(u => u.email === email);
        if (existe) {
        mensaje.textContent = "Ese email ya está registrado ";
        mensaje.style.color ="red";
        return;
        }
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mensaje.textContent ="registro exitoso ";
        mensaje.style.color = "green";

        setTimeout(() => {
        window.location.href = "../index.html";
        }, 1500)   
})

function validarCheckbox (){
    const terminos = document.getElementById("terminos").checked;
    if(terminos)
        return true;
    else
        return false;
}

function validarNombreCompleto(nombre){
    if(nombre.length >= 9 && nombre.length < 40)
        return true;
    else
        return false;
}

function validarEmail(email){
    if(email.includes("@") && email.includes("."))
        return true;
    else
        return false;
}

function validarContrasenia(password, confirmar) {
    if (password.length < 6) {
        return " La contraseña debe tener al menos 6 caracteres";
    }

    if (password !== confirmar) {
        return " Las contraseñas no coinciden";
    }

    return "";
}
