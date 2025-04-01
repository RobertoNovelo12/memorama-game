import { startGame } from "./game-manager.js";
import "./buttons-logic.js";
import "./theme-logic.js";

document.addEventListener("DOMContentLoaded", () => {
    const onePlayerBtn = document.getElementById("one-player");
    const twoPlayersBtn = document.getElementById("two-players");

    if (!localStorage.getItem("isTwoPlayers")) {
        localStorage.setItem("isTwoPlayers", "false");
    }

    onePlayerBtn.addEventListener("click", () => {
        localStorage.setItem("isTwoPlayers", "false");
        startGame(false);
    });

    twoPlayersBtn.addEventListener("click", () => {
        localStorage.setItem("isTwoPlayers", "true");
        startGame(true);
    });
});