import { resetStats } from './statistic-logic.js';
import { initializeGame } from './board-logic.js';

let gameActive = false;

export function stopGame() {
    gameActive = false;
    resetStats();
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("game-container").classList.add("hidden");
    
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.style.display = 'none';
    }
    
    document.getElementById("board").innerHTML = "";
}

export function startGame(isTwoPlayers) {
    gameActive = true;
    document.getElementById("start-screen").style.display = "none";
    const gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "block";
    gameContainer.classList.remove("hidden");
    
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.style.display = 'flex';
    }
    
    initializeGame();
}