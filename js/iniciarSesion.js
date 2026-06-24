const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", (e)=>{
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("contrasenia").value;
  let errores = "";

  if(!validarEmail(email))
    errores = "email invalido ";

  if(!validarContrasenia(password))
    errores += "La contraseña debe tener al menos 6 caracteres";

  if(errores !== ""){
        mensaje.textContent = errores; 
        mensaje.style.color ="red";
        return;
    }    
  
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existeUsuario = usuarios.find(u => u.email === email);
  if(!existeUsuario){
    mensaje.textContent ="cuenta inexistente";
    mensaje.style.color="red";
    return;
  }

  if(existeUsuario.password !== password){
    mensaje.textContent = "Contraseña incorrecta";
    mensaje.style.color = "red";
    return;
  }

  localStorage.setItem("usuarioLogueado", JSON.stringify(existeUsuario));

mensaje.textContent = "Inicio de sesión exitoso";
mensaje.style.color = "green";

setTimeout(() => {
    window.location.href = "../index.html";
}, 1500);

})

function validarEmail(email){
    return  email.includes("@") && email.includes(".");
}

function validarContrasenia(password){
    return password.length >= 6;
}