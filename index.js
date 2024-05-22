// Variables globales
let numberOfCells = 30; // Número de celdas en la cuadrícula
let actualChoosed; // Número actualmente seleccionado
let attemps = 0; // Contador de intentos
let secretNumber; // Número secreto que el jugador debe adivinar
let maxAttempts; // Número máximo de intentos permitidos
let randomMessage = ['Lo estas haciendo bien ', 'Ya casi']; // Mensajes aleatorios para alentar al jugador (no se muestran)
let body = document.querySelector('body'); // Selección del elemento body
let container = document.getElementById('container'); // Selección del contenedor principal

// Crear la cuadrícula
function fillTablero() {
    // Obtener un número secreto aleatorio
    secretNumber = getRandomInt();
    console.log(secretNumber); // Imprimir el número secreto en la consola 

    // Crear el tablero
    let tablero = document.createElement('div');
    tablero.setAttribute('id', 'tablero');

    // Crear las celdas numeradas
    for (let i = 1; i <= numberOfCells; i++) {
        let cell = document.createElement('div');
        cell.setAttribute('id', i);
        cell.classList.add('number');
        cell.innerText = `${i}`;
        tablero.appendChild(cell);
    }

    // Crear el div para mostrar los intentos
    let attempsDiv = document.createElement('div');
    attempsDiv.innerHTML = `<h1>Número de intentos: ${attemps} / ${maxAttempts}</h1>`;

    // Añadir el tablero y el div de intentos al contenedor
    container.appendChild(tablero);
    container.appendChild(attempsDiv);

    // Obtener el elemento de audio
    const sonidoClic = document.getElementById("sonido-clic");

    // Añadir evento de clic a cada celda
    document.querySelectorAll('.number').forEach((celdas, i) => {
        celdas.addEventListener('click', function () {
            actualChoosed = i + 1;
            sonidoClic.currentTime = 0; // Reiniciar el audio al inicio
            sonidoClic.play(); // Reproducir el sonido de clic
            testNum(celdas, attempsDiv); // Comprobar el número seleccionado
        });
    });
}

// Obtener un número aleatorio entre 1 y 30
function getRandomInt() {
    return Math.ceil(Math.random() * 30);
}

// Manejar el final del juego
function handleEndGame(winner) {
    // Crear la pantalla de fin de juego
    let endScreen = document.createElement("div");
    endScreen.setAttribute("id", "end-screen");
    endScreen.classList.add(winner ? "win" : "lose"); // Añadir clase 'win' o 'lose' según el resultado
    endScreen.innerHTML = `
        <button id="restart" class="btn">RESTART</button>
    `;

    // Limpiar el contenedor y mostrar la pantalla de fin de juego
    container.innerHTML = '';
    body.appendChild(endScreen);

    // Añadir evento de clic al botón de reinicio
    document.getElementById('restart').addEventListener('click', function () {
        body.removeChild(endScreen);
        startGame(); // Reiniciar el juego
    });
}

// Comparar el número seleccionado con el número secreto
function testNum(item, attempsDiv) {
    if (actualChoosed === secretNumber) {
        // Si el número es correcto
        attemps = 0; // Reiniciar el contador de intentos
        item.classList.add('Winner'); // Marcar la celda ganadora
        handleEndGame(true); // Manejar el fin del juego como victoria
    } else {
        // Si el número es incorrecto
        item.classList.add("lost"); // Marcar la celda como incorrecta
        attemps++; // Incrementar el contador de intentos
        attempsDiv.innerHTML = `<h1>Número de intentos: ${attemps} / ${maxAttempts}</h1>`;
        if (attemps >= maxAttempts) {
            handleEndGame(false); // Manejar el fin del juego como derrota si se alcanzan los intentos máximos
        }
    }
}

// Iniciar el juego
function startGame() {
    // Reiniciar el contador de intentos
    attemps = 0;

    // Crear la pantalla de inicio
    let startScreen = document.createElement("div");
    startScreen.setAttribute("id", "start");
    startScreen.innerHTML = `
        <h1>Selecciona el nivel de dificultad:</h1>
        <select id="difficulty" class="btn">
            <option value="low">Fácil</option>
            <option value="high">Difícil</option>
        </select>
        <button id="btnStart" class="btn">START</button>
    `;

    // Añadir la pantalla de inicio al body
    body.appendChild(startScreen);

    // Añadir evento de clic al botón de inicio
    document.getElementById('btnStart').addEventListener('click', function () {
        let difficulty = document.getElementById('difficulty').value;
        maxAttempts = difficulty === 'low' ? 15 : 5; // Establecer el número máximo de intentos según la dificultad
        body.removeChild(startScreen); // Quitar la pantalla de inicio
        fillTablero(); // Llenar el tablero
    });
}

// Iniciar el juego al cargar la página
window.onload = function () {
    startGame();
}