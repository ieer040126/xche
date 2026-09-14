document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const quickAccessGrid = document.getElementById('quick-access-grid');
    const addSiteButton = document.getElementById('add-site-button');
    const addSiteModal = document.getElementById('add-site-modal');
    const closeModal = document.getElementById('close-modal');
    const addSiteForm = document.getElementById('add-site-form');
    
    // 默认网站列表
    let quickAccessSites = [
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'YouTube', url: 'https://youtube.com' },
        { name: 'Gmail', url: 'https://mail.google.com' },
        { name: 'Twitter', url: 'https://twitter.com' }
    ];
    
    // 从localStorage加载网站列表
    function loadSites() {
        const savedSites = localStorage.getItem('quickAccessSites');
        if (savedSites) {
            quickAccessSites = JSON.parse(savedSites);
        }
    }
    
    // 保存网站列表到localStorage
    function saveSites() {
        localStorage.setItem('quickAccessSites', JSON.stringify(quickAccessSites));
    }
    
    // 渲染快捷访问网站
    function renderSites() {
        quickAccessGrid.innerHTML = '';
        
        quickAccessSites.forEach((site, index) => {
            const siteElement = document.createElement('div');
            siteElement.className = 'quick-access-item';
            siteElement.innerHTML = `
                <div class="quick-access-favicon">
                    ${getInitials(site.name)}
                </div>
                <div class="quick-access-name">${site.name}</div>
            `;
            
            // 添加点击事件打开网站
            siteElement.addEventListener('click', () => {
                window.open(site.url, '_blank');
            });
            
            // 添加右键删除功能
            siteElement.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (confirm(`确定要删除 "${site.name}" 吗？`)) {
                    quickAccessSites.splice(index, 1);
                    saveSites();
                    renderSites();
                }
            });
            
            quickAccessGrid.appendChild(siteElement);
        });
    }
    
    // 获取网站名称的首字母
    function getInitials(name) {
        return name.charAt(0).toUpperCase();
    }
    
    // 显示添加网站模态框
    function showModal() {
        addSiteModal.style.display = 'block';
    }
    
    // 隐藏添加网站模态框
    function hideModal() {
        addSiteModal.style.display = 'none';
    }
    
    // 添加新网站
    function addSite(name, url) {
        // 确保URL包含协议
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        quickAccessSites.push({ name, url });
        saveSites();
        renderSites();
    }
    
    // 事件监听器
    addSiteButton.addEventListener('click', showModal);
    
    closeModal.addEventListener('click', hideModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === addSiteModal) {
            hideModal();
        }
    });
    
    addSiteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const siteName = document.getElementById('site-name').value.trim();
        const siteUrl = document.getElementById('site-url').value.trim();
        
        if (siteName && siteUrl) {
            addSite(siteName, siteUrl);
            addSiteForm.reset();
            hideModal();
        }
    });
    
    // 初始化
    loadSites();
    renderSites();
});