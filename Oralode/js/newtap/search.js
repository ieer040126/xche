document.addEventListener('DOMContentLoaded', function() {
    // 获取搜索表单和输入框
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    // 搜索引擎URL映射
    const searchEngines = {
        'Bing': 'https://www.bing.com/search?q=',
        'Bilibili': 'https://search.bilibili.com/all?keyword=',
        'Google': 'https://www.google.com/search?q=',
        'DuckDuckGo': 'https://duckduckgo.com/?q=',
        'Baidu': 'https://www.baidu.com/s?wd=',
        'Sougo': 'https://www.sogou.com/web?query='
    };
    
    // 获取当前选中的搜索引擎
    function getCurrentSearchEngine() {
        const selectedIcon = document.querySelector('#engine-select img.selected');
        if (selectedIcon) {
            return selectedIcon.alt;
        }
        // 默认返回Bing
        return 'Bing';
    }
    
    // 更新搜索表单的提交事件
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const query = searchInput.value.trim();
        if (query) {
            const currentEngine = getCurrentSearchEngine();
            const searchUrl = searchEngines[currentEngine] + encodeURIComponent(query);
            window.open(searchUrl, '_blank');
        }
    });
    
    // 监听搜索引擎图标的变化
    const engineIcons = document.querySelectorAll('#engine-select img');
    engineIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // 当搜索引擎图标被点击时，可以在这里添加额外的逻辑
            console.log('搜索引擎已更改为:', this.alt);
        });
    });
});