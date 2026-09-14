document.addEventListener('DOMContentLoaded', function() {
    // 获取主题切换按钮
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // 检查本地存储中是否有保存的主题设置
    const savedTheme = localStorage.getItem('theme');
    
    // 如果有保存的主题设置，则应用它，否则默认使用浅色主题
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // 默认使用浅色主题
        document.body.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }
    
    // 为主题切换按钮添加点击事件监听器
    themeToggle.addEventListener('click', function() {
        // 获取当前主题
        const currentTheme = document.body.getAttribute('data-theme');
        
        // 切换主题
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        }
    });
    
    // 更新主题图标
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '◑'; // 实心圆表示深色主题
        } else {
            themeIcon.textContent = '◐'; // 半圆表示浅色主题
        }
    }
});