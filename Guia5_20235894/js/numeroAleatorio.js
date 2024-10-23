const numeroAleatorio = Math.floor(Math.random()*25) +1;

const numeroIntentos = 3;

let Intentos = 1;

function generarNumeroAleatorio(){
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");

    if (Intentos <= numeroIntentos){
        let numero = prompt(
            `¿Qué numero se ha generado (Intento ${Intentos})?`
        );
        
        if (numero == numeroAleatorio){
            mensaje = `¡Es sorprendente, pudiste adivinar el numero oculto (${numeroAleatorio}). Refresque la página para volver a jugar.`;
        } else if (Intentos == numeroIntentos){
            mensaje = `Su numero de intentos ha terminado. El número oculto era: ${numeroAleatorio}. Refresque la pagina para volver a jugar.`
        } else if (numero > numeroAleatorio){
            mensaje = `El numero ${numero} es mayor al esperado. Vuelve a intentar. Quedan ${numeroIntentos - Intentos} intentos.`
        } else if (numero < numeroAleatorio){
            mensaje = `El numero ${numero} es menor al esperado. Vuelve a intentar. Quedan ${numeroIntentos - Intentos} intentos.`
        }else{
            mensaje = `Vuelve a intentar. Quedan ${numeroIntentos - Intentos} intentos.`
        }

        Intentos++;
    } else{
        mensaje= `Su numero de intentos ha terminado. El número oculto era: ${numeroAleatorio}. Refresque la pagina para volver a jugar.`
    }

    parrafo.innerHTML = mensaje;
}