//cuando se carga la ventena en navegador
window.addEventListener('load',iniciarJuego);

function iniciarJuego(){
    //display para que no sea vea los ataques al inicio
    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    seccionSeleccionarAtaque.style.display = 'none';
    //no quiero que al inicio aparesca reiniciar
    let seccionReiniciar = document.getElementById('boton-reiniciar');
    seccionReiniciar.style.display = 'none';

    let botonMascotaJugador = document.querySelector('#boton-mascota');
    botonMascotaJugador.addEventListener('click',seleccionarMascotaJugador);

    let botonReiniciarJuego = document.querySelector('#boton-reiniciar');
    botonReiniciarJuego.addEventListener('click',reiniciarJuego);

    //seleccionar ataques de acuerdo a los botones html
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra);
}

function seleccionarMascotaJugador(){
    //display para que no se vea la seleccion de jugador
    let seccionSeleccionarJugador = document.getElementById('seleccionar-mascota');
    seccionSeleccionarJugador.style.display = 'none';
    //display para que se vea los ataques al seleccionar el jugador
    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    seccionSeleccionarAtaque.style.display = 'flex';

    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');

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
    let spanMascotaEnemiga = document.getElementById('mascota-enemigo');
    let seleccionAleatorio = aleatorio(1,3);
    if (seleccionAleatorio == 1) {
        spanMascotaEnemiga.innerText = 'Hipodoge';
    }else if (seleccionAleatorio == 2) {
        spanMascotaEnemiga.innerText = 'Capipepo';
    }else
        spanMascotaEnemiga.innerText = 'Ratigueya';

}

//INICIO DEL COMBATE
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

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
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

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
    let sectioMensaje = document.getElementById('resultado');
    let ataqueDelJugador = document.getElementById('ataques-del-jugador');
    let ataqueDelEnemigo = document.getElementById('ataques-del-enemigo');

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
    let sectioMensaje = document.getElementById('resultado');

    sectioMensaje.innerText = resultadoFinal;

    //PARA AGREGAR EL DISABLE A LOS PODERES UNA VES TERMINADO
    //Llamamos otra ves a las variables de los botones porque arriba esta en un scope local
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.disabled = true;
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.disabled = true;
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.disabled = true;
    //PARA que aparesca el boton reiniciar
    let seccionReiniciar = document.getElementById('boton-reiniciar');
    seccionReiniciar.style.display = 'block';
    
}

//funcion de reiniciar Juego
function reiniciarJuego(){
    location.reload();
}

