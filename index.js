
//variables de juego con scope global
let numberOfCells = 30
let chooser = []
let actualChoosed
let secretNumber = getRandomInt()
console.log(secretNumber)
const message = document.querySelector('.message');
let body = document.querySelector('body')
let tablero





//crear cuadrícula
function filltablero() {
    let header = document.createElement('div')
    header.setAttribute('class', 'header')
    tablero = document.createElement('div')
    tablero.setAttribute('id', 'tablero')

    //generación de celdas
    for (let i = 1; i <= numberOfCells; i++) {
        let cell = document.createElement('div')
        cell.setAttribute('id', i)
        cell.classList.add('number')
        cell.innerText = `${i}`

        //Insertar la celda al tablero
        tablero.appendChild(cell)
    }

    //Insertar el tablero en el contenedor para que aparezca
    container.appendChild(tablero)
}

//Añade un chismoso que detecta cuando hacemos "Click"
filltablero()
let allCells = document.querySelectorAll('.number')
allCells.forEach((celdas, i) => {
    celdas.addEventListener('click', function () {
        /* handleClickOnCelss  */
        console.log('click', i + 1)
        actualChoosed = i + 1
        console.log(actualChoosed)
        testNum(celdas)
    })
})

//Hacemos que ordenador escoja un número aleatorio
function getRandomInt() {
    return Math.ceil(Math.random() * 30);
}
function handleEndGame() {
    let winnerScreen = document.createElement("div")
    winnerScreen.setAttribute("id", "win")
    winnerScreen.innerHTML = 
    `
        <h1>YOU WIN!!!</h1>
        <button id="restart">RESTART</button>
    `
    container.removeChild(tablero)
    body.insertBefore(winnerScreen, container)
    body.classList.add('relative')

}
//Hacemos que el usuario compare su número con el escogido con el ordenador
function testNum(item) {
    let result;
    if (actualChoosed === secretNumber) {
        item.classList.add('Winner');
        if (message && message.textContent !== undefined) {
            message.textContent = "Felicidades";
        } else {
            console.error("El elemento `message` no está correctamente definido.");
        }
        // Asegúrate de que handleEndGame esté definido y no cause errores
        if (typeof handleEndGame === 'function') {
            handleEndGame();
        } else {
            console.error("La función `handleEndGame` no está definida o no es una función.");
        }
    } else {
        item.classList.add("lost")
    }
    return result;
}