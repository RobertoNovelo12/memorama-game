let player1Score = 0;
let player2Score = 0;
let startTime = 0;
let currentPlayer = 1;
let gameStatsVisible = false;
let statsInterval = null;
let timerStarted = false;

function clearStatsInterval() {
    if (statsInterval) {
        clearInterval(statsInterval);
        statsInterval = null;
    }
}

export function toggleStats(show) {
    gameStatsVisible = show;
    const statsContainer = document.getElementById('game-stats');
    if (statsContainer) {
        statsContainer.style.display = show ? 'flex' : 'none';
    }
}

function updateStatsDisplay() {
    const isTwoPlayers = localStorage.getItem("isTwoPlayers") === "true";
    const player1Stats = document.getElementById('player1-stats');
    const player2Stats = document.getElementById('player2-stats');
    const timerDisplay = document.getElementById('timer');
    const turnDisplay = document.getElementById('turn-display');

    if (isTwoPlayers) {
        if (player1Stats) player1Stats.textContent = `Jugador 1: ${player1Score} pts`;
        if (player2Stats) player2Stats.textContent = `Jugador 2: ${player2Score} pts`;
        if (timerDisplay) timerDisplay.textContent = '';
        
        if (turnDisplay) {
            turnDisplay.innerHTML = `
                <div class="player-turn ${currentPlayer === 1 ? 'active' : ''}">Jugador 1</div>
                <div class="vs">VS</div>
                <div class="player-turn ${currentPlayer === 2 ? 'active' : ''}">Jugador 2</div>
            `;
        }
    } else {
        if (timerStarted) {
            const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
            if (timerDisplay) timerDisplay.textContent = `Tiempo: ${elapsedTime}s`;
        }
        if (player1Stats) player1Stats.textContent = '';
        if (player2Stats) player2Stats.textContent = '';
        if (turnDisplay) turnDisplay.innerHTML = '<div class="solo-player">Modo 1 Jugador</div>';
    }
}

export function startTimer() {
    if (!timerStarted) {
        clearStatsInterval();
        startTime = Date.now();
        timerStarted = true;
        toggleStats(true);
        statsInterval = setInterval(updateStatsDisplay, 100);
    }
}

export function updateSoloStats() {
    updateStatsDisplay();
}

export function updatePlayerScore() {
    if (currentPlayer === 1) {
        player1Score++;
    } else {
        player2Score++;
    }
    updateStatsDisplay();
}

export function switchTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateStatsDisplay();
}

export function initStats() {
    clearStatsInterval();
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    timerStarted = false;
    startTime = Date.now();
    toggleStats(true);
    updateStatsDisplay();
}

export function resetStats() {
    clearStatsInterval();
    timerStarted = false;
    toggleStats(false);
}

export { player1Score, player2Score, startTime };