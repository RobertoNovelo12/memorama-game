let player1Score = 0;
let player2Score = 0;
let startTime;


export function startTimer() {
    startTime = Date.now();
}

export function updateSoloStats() {
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    localStorage.setItem("bestTime", elapsedTime);
    console.log(`Tiempo final: ${elapsedTime} segundos`);
}


export function updatePlayerScore() {
    if (localStorage.getItem("isTwoPlayers") === "true") {
        if (currentPlayer === 1) {
            player1Score++;
        } else {
            player2Score++;
        }
        console.log(`Puntaje - Jugador 1: ${player1Score}, Jugador 2: ${player2Score}`);
    }
}