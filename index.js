/*Autor="Antony Inga Atunga" */
/*Es la variable en donde se registran todas las caracteristicas y subcaracteristicas con sus conceptos */
var caracteristicas = [{
    nombre: "ADECUACION FUNCIONAL",
    identificador: "001",
    texto: "proporcionar funciones que satisfacen las necesidades declaradas e implícitas, cuando el producto se usa en las condiciones especificadas",
    isElegido: false
}, {
    nombre: "EFICIENCIA Y DESEMPEÑO",
    identificador: "002",
    isElegido: false,
    texto: "representa el desempeño relativo a la cantidad de recursos utilizados bajo determinadas condiciones."
},
{
    nombre: "COMPATIBILIDAD",
    identificador: "003",
    isElegido: false,
    texto: "capacidad de dos o más sistemas o componentes para intercambiar información y/o llevar a cabo sus funciones requeridas "
}, {
    nombre: "USABILIDAD",
    identificador: "004",
    isElegido: false,
    texto: "Capacidad del producto software para ser entendido, aprendido, usado y resultar atractivo para el usuario"
},
{
    nombre: "FIABILIDAD",
    identificador: "005",
    isElegido: false,
    texto: "Capacidad de un sistema o componente para desempeñar  las funciones especificadas, cuando se usa bajo unas condiciones y periodo de tiempo determinados"
},
{
    nombre: "SEGURIDAD",
    identificador: "006",
    isElegido: false,
    texto: "Capacidad de protección de la información y los datos de manera que personas o sistemas no autorizados no puedan leerlos o modificarlos"
},
{
    nombre: "MANTENIBILIDAD",
    identificador: "007",
    isElegido: false,
    texto: "Esta característica representa la capacidad del producto software para ser modificado efectiva y eficientemente"
},
{
    nombre: "PORTABILIDAD",
    identificador: "008",
    isElegido: false,
    texto: "Esta característica representa la capacidad del producto software para ser modificado efectiva y eficientemente"
}]
var template_carta = `<div class="card hoverable subCaracteristica">

<div class="front">

</div>
<div class="back">

</div>
Este es una carta
</div>`;
var template_letra = `<div class="caja">
                        
</div>`;

var letras = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ",
    "Z", "X", "C", "V", "B", "N", "M"];
var icon = $("i#icon");
var colores = ["#69f0ae", "#69f0ae", "#18ffff", "#b388ff", "#ff8a80", "#ea80fc ", "#b0bec5", "#ffe57f"];
var teclado = $(".teclado");
var palabra = "";
var random;
var boton = $("a.button")
var contadorArray = 0;
var contadorFallidas = 0;
var numeroFallidas = 8
$(document).ready(function () {
    letras.forEach(letra => {
        creacionTeclado(letra)
    })
    creacionPalabra()
    EventoClickLetras()
    eventoClickBoton();
})
function eventoClickBoton() {
    $("a.button").on("click", function () {
        creacionPalabra();
        EventoClickLetras();
        cambiarBackground()
    })
    boton.prop('disabled', false)
}
function cambiarBackground() {
    $("div.template").css("background", "")
}
function EventoClickLetras() {
    let isIgual = false;
    let contador = 0;

    $(".template").on("click", function () {
        let letraClick = $(this);
        $("span.letraBuscada").each((index, elemento) => {
            if (letraClick.text().trim() === $(elemento).attr("data-letra").trim()) {
                isIgual = true;

                $(elemento).text(letraClick.text())
                contador++
                BlurClick(letraClick)
                return;
            }
        })

        cambiarImagenAhorcado(isIgual)
        ComprovacionLetras(contador)
        letraClick.css("backgroundColor", isIgual ? "green" : "red");
        isIgual = false;
    })
}
function cambiarImagenAhorcado(isIgual) {
    if (!isIgual) {
        contadorFallidas++;
        if (contadorFallidas == numeroFallidas) {
            culminacionJuego();
        }
        $("span.fallos").text(contadorFallidas).css("visibility","visible")
        $("img#imagen").attr("src", "https://thelinch.github.io/juegoAhorcado/img/ahorcado_" + contadorFallidas + ".PNG")

    }
}
function culminacionJuego() {
    $(".template").off()
    alert("ya no hay mas chance")
}
function ComprovacionLetras(contador) {
    console.log(contador)
    if (caracteristicas[random].nombre.length == contador) {
        console.log("es igual")
        boton.removeAttr("disabled")
    }
}
function BlurClick(elemento) {
    $(elemento).off()
}
function creacionPalabra() {
    let buscado = true;

    $("div.palabra").html("")
    do {
        random = Math.floor(Math.random() * caracteristicas.length);
        console.log(random)
        if (contadorArray == caracteristicas.length) {
            alert("ya no hy mas eventos")
            $("div.palabra").html("")
            eventoFelizidad();
            return;
        }
        if (!caracteristicas[random].isElegido) {
            buscado = false;
            contadorArray++;
            caracteristicas[random].isElegido = true;
            palabra = caracteristicas[random].nombre;
        }

    } while (buscado)
    console.log(palabra)
    for (let i = 1; i <= caracteristicas[random].nombre.length; i++) {
        let template_letra = `<div class="caja">
           <span data-letra="${caracteristicas[random].nombre.charAt(i - 1)}" class="letraBuscada"></span>             
    </div>`;
        $(template_letra).appendTo(".palabra")
    }
}
function eventoFelizidad() {

}
function creacionTeclado(letra) {
    let letra_template = `<div class="template">
    <p class="letra">${letra}</p>
    </div>`
    teclado.append(letra_template)

}

