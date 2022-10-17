//Selectores
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none"
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");

var palabras = ["ALURA","ORACLE","ONE","JAVASCRIPT","HTML"];
var tablero = document.getElementById("horca").getContext("2d");
var palabraSecreta = "";
var letras = [];
var errores = 8;
var palabraCorrecta = "";
let letrasIncorrectas = [];
let numeroDeErrores = 8;
let letraElegida = [];

//eventos

// captura el id "iniciar-juego" en el click y direcciona el program al método que inicia el juego
document.getElementById("iniciar-juego").onclick = () => {
    IniciarJuego();
}

// captura el id "btn-guardar", guarda la palabra agregada y inicia el juego
document.getElementById("btn-guardar").onclick = () => {
    guardarPalabra();
   
  }
  
  //actualiza la pantalla cuando el usuario hace click en el botón "nuevo juego"
  btnNuevoJuego.addEventListener("click", function () {
    location.reload();
  });
  
  //actualiza la pantalla cuando el usuario hace click en el botón "salir"
  btnSalir.addEventListener("click", function () {
    location.reload();
  });
  
  //actualiza la pantalla cuando el usuario hace click en el botón "cancelar"
  btnCancelar.addEventListener("click", function () {
    location.reload();
  });
  

//Palabra secreta 
function escojerPalabraSecreta(){
    let palabra = palabras[Math.floor(Math.random()*palabras.length)];
    palabraSecreta = palabra;
    console.log(palabraSecreta);
}

function comprobarLetra(key){
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false
    
  }
  else {
    letras.push(key)
    return true
  }
}

function anadirLetraIncorrecta(letra){
    if (palabraSecreta.indexOf(letra) <= 0) {
        errores -= 1;
        console.log(errores);
      }  
}

function anadirLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase()
}
  

function verificarFinJuego(letra) {
    //verifica si la letra ha sido incluida en el array de  las letras correctas o incorrectas
   if(letraElegida.length < palabraSecreta.length) { 
      //incluye las letras ya digitadas en el array
      letrasIncorrectas.push(letra);
      
  
      //verifica si el usuario cometio el numero maximo de errores
      if (letrasIncorrectas.length > numeroDeErrores) {
        perdiste()
      }
      else if(letraElegida.length < palabraSecreta.length) {
        anadirLetraIncorrecta(letra)
        escribirLetraIncorrecta(letra, errores)
      }
    }
   } 

//Verifica si el usuario ha ganado
function verificarVencedor(letra) {
    letraElegida.push(letra.toUpperCase());
    if (letraElegida.length == palabraSecreta.length) {
      ganaste()
    }
}

//impide que teclas como shift y otras, sean consideradas errores y sean escritas
function verificarLetra(keyCode) {
    if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
      return true;
    } else {
      return false;
    }
  }

//haz con que los botones de la pantalla de home desaparezcan y los de la de agregar palabra aparezcan
function ensenarPantallaDeAgregarPalabra() {
    document.getElementById("div-desaparece").style.display = 'none';
    document.getElementById("agregar-palabra").style.display = "block";
}


// guarda la palabra que el usuario quiere agregar
function guardarPalabra() {
  
    //captura lo que el usuario ha digitado
    let nuevaPalabra = document.getElementById('input-nueva-palabra').value;
  
    // incluye la palabra que el usuario digito en el array de las palabras a ser sorteadas
    if(nuevaPalabra !== ""){
      palabras.push(nuevaPalabra.toUpperCase());
      alert('La palabra fue guardada')
      
    
      // pantalla de agregar palabra desaparece
      document.getElementById("agregar-palabra").style.display = "none";
      IniciarJuego();
    }
    else{
      alert("Ninguna palabra ha sido digitada")
    }
  
  }
  


//iniciar juego
function IniciarJuego(){

    document.getElementById("div-desaparece").style.display="none";
    

    escojerPalabraSecreta();
    dibujarCanvas();
    dibujarLinea();

    // hace con que los botones de nuevo juego e salir aparezcan
  document.getElementById("btn-nuevo-juego").style.display = "block"
  document.getElementById("btn-salir").style.display = "block"

// captura la letra que el usuario escribió
document.onkeydown = (e) => {
    // pone la letra en letra mayuscula
    let letra = e.key.toUpperCase()
    //verifica si el usuario todavia no ha perdido
    if (letrasIncorrectas.length <= numeroDeErrores) {
      if (!comprobarLetra(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          anadirLetraCorrecta(palabraSecreta.indexOf(letra))
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escribirLetraCorrecta(i)
              verificarVencedor(letra)

            }
          }

        }
        // si el usuario cometió más errores de los que son permitidos, 
        //llama las funciones que dibujan el ahorcado y exhibe el mensaje de fin de juego
        else {
          if (!comprobarLetra(e.key) && !verificarVencedor(letra)) return
          dibujarAhorcado(errores)
          verificarFinJuego(letra)
        }
      }
    }
    else {
      alert('Has superado el límite de letras incorrectas')
    }

  };
}