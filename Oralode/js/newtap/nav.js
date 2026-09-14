document.addEventListener('DOMContentLoaded', function() {
    // 获取所有搜索引擎图标
    const engineIcons = document.querySelectorAll('#engine-select img');
    
    // 为每个图标添加点击事件监听器
    engineIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // 移除所有图标的选中状态
            engineIcons.forEach(img => img.classList.remove('selected'));
            
            // 为当前点击的图标添加选中状态
            this.classList.add('selected');
            
            // 这里可以添加实际的搜索引擎切换逻辑
            console.log('选择了搜索引擎:', this.alt);
        });
    });
    
    // 默认选择Bing（第一个图标）
    if (engineIcons.length > 0) {
        engineIcons[0].classList.add('selected');
    }
});