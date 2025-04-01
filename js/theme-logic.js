(function() {
    
    function applyInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        
        document.documentElement.className = initialTheme;
    }

    
    applyInitialTheme();

    function applyTheme(isDarkMode) {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');
        updateThemeIcon(isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    function updateThemeIcon(isDarkMode) {
        const themeIcon = document.getElementById('theme-toggle');
        if (themeIcon) {
            themeIcon.src = isDarkMode ? 'image/sun-icon.svg' : 'image/moon-icon.svg';
        }
    }

    function getCurrentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });

    
    window.themeManager = {
        toggleTheme: function() {
            const newTheme = getCurrentTheme() === 'light' ? 'dark' : 'light';
            applyTheme(newTheme === 'dark');
            return newTheme;
        },
        currentTheme: getCurrentTheme
    };
})();