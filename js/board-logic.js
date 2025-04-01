import { 
    initStats, 
    switchTurn, 
    updatePlayerScore, 
    updateSoloStats,
    startTimer
} from './statistic-logic.js';

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
const images = [
    "🍎", "🍌", "🍒", "🍉", "🍇", "🍊", "🥝", "🍍",
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
    "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱",
    "🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑",
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍",
    "🌞", "🌝", "🌚", "🌕", "🌖", "🌗", "🌘", "🌑"
];

function getRandomEmojis() {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
}

export function initializeGame() {
    const board = document.getElementById("board");
    if (!board) return;
    
    board.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    
    initStats();
    
    const gameEmojis = getRandomEmojis();
    const shuffledImages = [...gameEmojis, ...gameEmojis].sort(() => Math.random() - 0.5);
    
    shuffledImages.forEach((image, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.image = image;
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-back">❔</div>
                <div class="card-face card-front">${image}</div>
            </div>
        `;
        
        card.addEventListener("click", handleCardClick);
        board.appendChild(card);
        cards.push(card);
    });
}

function handleCardClick() {
    const isTwoPlayers = localStorage.getItem("isTwoPlayers") === "true";
    
    
    if (!isTwoPlayers && cards.filter(c => c.classList.contains("flipped")).length === 0) {
        startTimer();
    }
    
    if (flippedCards.length >= 2 || 
        this.classList.contains("matched") || 
        this.classList.contains("flipped")) {
        return;
    }
    
    this.classList.add("flipped");
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 700);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;
    const isTwoPlayers = localStorage.getItem("isTwoPlayers") === "true";
    
    if (isMatch) {
        card1.classList.add("matched", "correct-match");
        card2.classList.add("matched", "correct-match");
        matchedPairs++;
        
        if (isTwoPlayers) {
            updatePlayerScore();
        } else {
            updateSoloStats();
        }
        
        flippedCards = [];
        
        if (matchedPairs === 8) {
            setTimeout(endGame, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
            if (isTwoPlayers) {
                switchTurn();
            }
        }, 700);
    }
}

function endGame() {
    let message;
    if (localStorage.getItem("isTwoPlayers") === "true") {
        message = `¡Juego terminado!\nJugador 1: ${player1Score} puntos\nJugador 2: ${player2Score} puntos`;
    } else {
        const time = ((Date.now() - startTime) / 1000).toFixed(2);
        message = `¡Juego terminado!\nTiempo: ${time} segundos`;
    }
    
    alert(message);
    resetGame();
}

export function resetGame() {
    resetStats();
    initializeGame();
}