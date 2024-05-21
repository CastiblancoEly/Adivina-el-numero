
//variables de juego con scope global
let numberOfCells = 30
let chooser = []
let actualChoosed
let attemps = 0
let secretNumber 
let randomMessage = ['Lo estás haciendo bien', 'Well done', 'Buen trabajo', 'Dabuti']
let message
let body = document.querySelector('body')
let tablero
let buttonRestart
let winnerScreen
let attempsDiv
let windowStart



//crear cuadrícula
function filltablero() {
    secretNumber = getRandomInt()
    console.log(secretNumber)

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


    attempsDiv = document.createElement('div')
    attempsDiv.innerHTML = `<h3>Número de intentos: ${attemps}</h3>`


    //Insertar el tablero en el contenedor para que aparezca
    container.appendChild(tablero)
    container.appendChild(attempsDiv)

    //Añade un chismoso que detecta cuando hacemos "Click"
    let allCells = document.querySelectorAll('.number')
    console.log(allCells)
    allCells.forEach((celdas, i) => {
        celdas.addEventListener('click', function () {
            /* handleClickOnCelss  */
            console.log('click', i + 1)
            actualChoosed = i + 1
            console.log(actualChoosed)
            testNum(celdas)
        })
    })
}


//Hacemos que ordenador escoja un número aleatorio
function getRandomInt() {
    return Math.ceil(Math.random() * 30);
}
function handleEndGame() {
    winnerScreen = document.createElement("div")
    winnerScreen.setAttribute("id", "win")
    winnerScreen.innerHTML = 
    `

        <button id="restart" class="btn">RESTART</button>
    `
    container.removeChild(tablero)
    body.insertBefore(winnerScreen, container)
    body.classList.add('relative')
    restart()

}
//Hacemos que el usuario compare su número con el escogido con el ordenador

function testNum(item) {
    let result;
    if (actualChoosed === secretNumber) {
        container.removeChild(attempsDiv)
        attemps = 0
        item.classList.add('Winner');
        // Asegúrate de que handleEndGame esté definido y no cause errores
        if (typeof handleEndGame === 'function') {
            handleEndGame();
        } else {
            
        }
    } else {
        item.classList.add("lost")
        message = document.createElement('h2')
        message.innerText = randomMessage[Math.floor(Math.random() * randomMessage.length)]
        console.log(message)
        attemps++
        attempsDiv.innerHTML = `<h3>Número de intentos: ${attemps}</h3>`
    }
    return result;
}

function restart() {
    buttonRestart = document.querySelector('#restart')
    console.log (buttonRestart)
    buttonRestart.addEventListener('click', function () {
        body.removeChild(winnerScreen)
        startGame ()
    })
}

function startGame() {
    windowStart = document.createElement("div")
    windowStart.setAttribute("id", "start")
    windowStart.innerHTML =
        `

        <button id="btnStart" class="btn">START</button>
    `
    body.insertBefore(windowStart, container)
    let buttonStart = document.querySelector("#btnStart")
    buttonStart.addEventListener('click', function () {
        body.removeChild(windowStart)
        filltablero()
    })
}

window.onload = function(){
    startGame()
}



