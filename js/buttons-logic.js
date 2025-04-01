document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.getElementById("reset-game");
    const instructionsButton = document.getElementById("go-to-instructions");
    const themeToggle = document.getElementById("theme-toggle");
    const backButton = document.getElementById("back-button");

    
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            import('./board-logic.js').then(module => {
                module.resetGame();
            });
        });
    }

    
    if (instructionsButton) {
        instructionsButton.addEventListener("click", () => {
            window.location.href = "instructions.html";
        });
    }

    
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = document.documentElement.classList.contains("dark");
            document.documentElement.classList.toggle("dark", !isDark);
            document.documentElement.classList.toggle("light", isDark);
            
            localStorage.setItem("theme", isDark ? "light" : "dark");
            
            themeToggle.src = isDark ? "image/moon-icon.svg" : "image/sun-icon.svg";
        });
    }

    
    if (backButton) {
        backButton.addEventListener("click", () => {
            import('./game-manager.js').then(module => {
                module.stopGame();
            });
        });
    }
});