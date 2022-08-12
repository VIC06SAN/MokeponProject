//cuando se carga la ventena en navegador
window.addEventListener('load',iniciarJuego);

//VARIABLES
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const seccionReiniciar = document.getElementById('boton-reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciarJuego = document.getElementById('boton-reiniciar');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');

const seccionSeleccionarJugador = document.getElementById('seleccionar-mascota');
const inputHipodoge = document.getElementById('hipodoge');
const inputCapipepo = document.getElementById('capipepo');
const inputRatigueya = document.getElementById('ratigueya');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemiga = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectioMensaje = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataques-del-jugador');
const ataqueDelEnemigo = document.getElementById('ataques-del-enemigo');


//INICIO DEL COMBATE (variables)
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego(){
    seccionSeleccionarAtaque.style.display = 'none';
    seccionReiniciar.style.display = 'none';

    botonMascotaJugador.addEventListener('click',seleccionarMascotaJugador);
    botonReiniciarJuego.addEventListener('click',reiniciarJuego);

    //seleccionar ataques de acuerdo a los botones html
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
}

function seleccionarMascotaJugador(){
    //display para que no se vea la seleccion de jugador
   
    seccionSeleccionarJugador.style.display = 'none';
    //display para que se vea los ataques al seleccionar el jugador
    
    seccionSeleccionarAtaque.style.display = 'flex';

    

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerText = 'Hipodoge';
    }else if (inputCapipepo.checked) {
        spanMascotaJugador.innerText = 'Capipepo';
    }else if (inputRatigueya.checked) {
        spanMascotaJugador.innerText = 'Ratigueya';
    }else{
        alert('ELIGE UNA OPCION');
    }
    seleccionarMascotaEnemigo();
}

//NUMERO ALEATORIO
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo(){
    let seleccionAleatorio = aleatorio(1,3);
    if (seleccionAleatorio == 1) {
        spanMascotaEnemiga.innerText = 'Hipodoge';
    }else if (seleccionAleatorio == 2) {
        spanMascotaEnemiga.innerText = 'Capipepo';
    }else
        spanMascotaEnemiga.innerText = 'Ratigueya';

}


function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();  
}
function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3);
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO';
    }else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA';
    }else{
        ataqueEnemigo = 'TIERRA';
    }  
    combateResultado();
}

function combateResultado(){
    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE");
      } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerText = vidasEnemigo;
      } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerText = vidasEnemigo;
      } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerText = vidasEnemigo;
      } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerText = vidasJugador;
      }

    revisarVidas();
}

function revisarVidas(){
    if (vidasEnemigo == 0) {
        crearMensajeFinal('FELICITACIONES, GANASTE 😁');
    }else if (vidasJugador == 0) {
        crearMensajeFinal('SUERTE PARA LA OTRA, PERDISTE 😥');
    } 
}

//Mensaje para ver quien gano cada ronda
function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectioMensaje.innerHTML=resultado;
    nuevoAtaqueDelJugador.innerHTML=ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML=ataqueEnemigo;

    //colocamos el parrafo creado dentro del mensaje
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
  
}

//Mensaje final de juego
function crearMensajeFinal(resultadoFinal){
    sectioMensaje.innerText = resultadoFinal;
  
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    //PARA que aparesca el boton reiniciar 
    seccionReiniciar.style.display = 'block';  
}

//funcion de reiniciar Juego
function reiniciarJuego(){
    location.reload();
}

