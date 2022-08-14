//cuando se carga la ventena en navegador
window.addEventListener('load',iniciarJuego);

//VARIABLES
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const seccionReiniciar = document.getElementById('boton-reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciarJuego = document.getElementById('boton-reiniciar');

const seccionSeleccionarJugador = document.getElementById('seleccionar-mascota');

const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemiga = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectioMensaje = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataques-del-jugador');
const ataqueDelEnemigo = document.getElementById('ataques-del-enemigo');


//INICIO DEL COMBATE (variables)
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;

let mokepones = [];

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;

let mascotaJugador;

let opcionDeMokepones;
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
let ataquesMokepon;
let ataquesMokeponEnemigo;
const contenedorAtaques = document.getElementById('contenedorAtaques');
let botonFuego; 
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let ataqueJugador = [];
let ataqueEnemigo = [];

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}
let hipodoge = new Mokepon("Hipodoge",'img/mokepons_mokepon_hipodoge_attack.png',5);
let capipepo = new Mokepon("Capipepo",'img/mokepons_mokepon_capipepo_attack.png',5);
let ratigueya = new Mokepon("Ratigueya",'img/mokepons_mokepon_ratigueya_attack.png',5);

hipodoge.ataques.push(
    { nombre:'💧', id:'boton-agua' },
    { nombre:'💧', id:'boton-agua' },
    { nombre:'💧', id:'boton-agua' },
    { nombre:'🔥', id:'boton-fuego' },
    { nombre:'🌱', id:'boton-tierra' },
)
capipepo.ataques.push(
    { nombre:'🌱', id:'boton-tierra' },
    { nombre:'🌱', id:'boton-tierra' },
    { nombre:'🌱', id:'boton-tierra' },
    { nombre:'🔥', id:'boton-fuego' },
    { nombre:'💧', id:'boton-agua' },
)
ratigueya.ataques.push(
    { nombre:'🔥', id:'boton-fuego' },
    { nombre:'🔥', id:'boton-fuego' },
    { nombre:'🔥', id:'boton-fuego' },
    { nombre:'💧', id:'boton-agua' },
    { nombre:'🌱', id:'boton-tierra' },
)

mokepones.push(hipodoge,capipepo,ratigueya);
//console.table(mokepones);


function iniciarJuego(){
    seccionSeleccionarAtaque.style.display = 'none';
    seccionReiniciar.style.display = 'none';

    mokepones.forEach((mokepon) =>{
        opcionDeMokepones = `
            <input type="radio" name="mascotas" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre} >
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipodoge = document.getElementById('Hipodoge');  
        inputCapipepo = document.getElementById('Capipepo') ;
        inputRatigueya = document.getElementById('Ratigueya') ;
    })

    botonMascotaJugador.addEventListener('click',seleccionarMascotaJugador);
    botonReiniciarJuego.addEventListener('click',reiniciarJuego);
}

function seleccionarMascotaJugador(){
    //display para que no se vea la seleccion de jugador
    seccionSeleccionarJugador.style.display = 'none';
    //display para que se vea los ataques al seleccionar el jugador
    seccionSeleccionarAtaque.style.display = 'flex';

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerText = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    }else if (inputCapipepo.checked) {
        spanMascotaJugador.innerText = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    }else if (inputRatigueya.checked) {
        spanMascotaJugador.innerText = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    }else{
        alert('ELIGE UNA OPCION');
    }

    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques ;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon=`
            <button id=${ataque.id} class="boton-del-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon;
    })

    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.BAtaque');
}

function secuenciaAtaques(){
    botones.forEach((boton) => {
        boton.addEventListener('click',(e) => {
            //el metodo target.textContent lo encontramos en la consola con console.log
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }else {
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo();
        })
    })
}

//NUMERO ALEATORIO
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo(){
    let seleccionAleatorio = aleatorio(0,mokepones.length-1);  
    spanMascotaEnemiga.innerHTML = mokepones[seleccionAleatorio].nombre;
    ataquesMokeponEnemigo = mokepones[seleccionAleatorio].ataques;
    secuenciaAtaques();
}

function ataqueAleatorioEnemigo(){

    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1);
    if (ataqueAleatorio == 0 || ataqueAleatorio==1) {
        ataqueEnemigo.push('FUEGO');
    }else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA');
    }else{
        ataqueEnemigo.push('TIERRA');
    }  
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea(){
    if (ataqueJugador.length == 5) {
        combateResultado();
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combateResultado(){
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            crearMensaje("EMPATE");
            victoriasJugador++
            victoriasEnemigo++
            spanVidasJugador.innerHTML = victoriasJugador;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        } else if (ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador;
        }else if (ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador;
        }else {
            indexAmbosOponentes(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
    revisarVictorias();
}

function revisarVictorias(){
    if (victoriasJugador == victoriasEnemigo ) {
        crearMensajeFinal('ESTO FUE UN EMPATE');
    }else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('FELICITACIONES, GANASTE 😁');
    } else{
        crearMensajeFinal('SUERTE PARA LA OTRA, PERDISTE 😥');
    }
}

//Mensaje para ver quien gano cada ronda
function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectioMensaje.innerHTML=resultado;
    nuevoAtaqueDelJugador.innerHTML=indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML=indexAtaqueEnemigo;

    //colocamos el parrafo creado dentro del mensaje
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
  
}

//Mensaje final de juego
function crearMensajeFinal(resultadoFinal){
    sectioMensaje.innerText = resultadoFinal;
    //PARA que aparesca el boton reiniciar 
    seccionReiniciar.style.display = 'block';  
}

//funcion de reiniciar Juego
function reiniciarJuego(){
    location.reload();
}

