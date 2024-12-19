/*TEMPORIZADORES
    setTimeOut(funcion, tiempo en ms)
    setInterval(funcion, tiempo en ms)*/

/*DECLARACION DE LA VARIABLE QUE GUARDARA EL IDENTIFICADOR DEL TEMPORIZADOR
let identificadorIntervaloDeTiempo;

DECLARACION DEL INTERVAL --> ESTE REPETIRA LA FUNCION QUE LE PASAMOS POR PARAMTETRO PASADO EL TIEMPO INDICADO
function repetirCadaSegundo() {
  identificadorIntervaloDeTiempo = setInterval(mandarMensaje, 1);
}
A DIFERENCIA DEL setTimeOut(), EL CUAL SE ENCARGA DE EJECUTAR LA FUNCION PASADA POR PARAMETRO DESPUES DE X TIEMPO,
NO SE REPITE DE MANERA AUTOMATICA

FUNCION QUE SE EJECUTARA CON EL TEMPORIZADOR
function mandarMensaje() {
  console.log("Ha pasado 1 segundo.")
  -- ESTO SE UTILIZA PARA DETENER EL TEMPORIZADOR
  clearInterval(identificadorIntervaloDeTiempo);
  clearTimeOut(nombreTemporizador)
}*/

let idTemporizador; // Variable para almacenar el temporizador
let contador = 0; // Contador en centésimas de segundo 
let corriendo = false; // Para evitar múltiples temporizadores activos

// Elementos del DOM
const pantalla = document.querySelector("#pantallaContainer");
const hora = document.querySelector("#horas");
const min = document.querySelector("#minutos");
const seg = document.querySelector("#segundos");
const cent = document.querySelector("#centesimas");
const valorBtn = document.querySelectorAll(".btn");

valorBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
        const botonDado = boton.textContent;
        if (botonDado === "RESET") {
            resetCronometro();
        } else if (botonDado === "START") {
            iniciarCronometro();
        } else if (botonDado === "STOP") {
            detenerCronometro();
        }
    });
});

function iniciarCronometro() {
    if (!corriendo) {
        corriendo = true;
        idTemporizador = setInterval(actualizarPantalla, 10); // Actualización cada 10 ms
    }
}

function detenerCronometro() {
    corriendo = false;
    clearInterval(idTemporizador);
}

function resetCronometro() {
    detenerCronometro();
    contador = 0;
    actualizarPantalla(); 
}

function actualizarPantalla() {
    contador++;
    const horas = Math.floor(contador / 360000); 
    const minutos = Math.floor((contador % 360000) / 6000); 
    const segundos = Math.floor((contador % 6000) / 100); 
    const centesimas = contador % 100;
    pantalla.textContent = `${formatear(horas)}:${formatear(minutos)}:${formatear(segundos)}:${formatear(centesimas)}`;
}

function formatear(numero) {
    return numero.toString().padStart(2, "0");
}

resetCronometro();
