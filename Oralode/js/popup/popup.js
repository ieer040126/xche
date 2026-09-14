document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const openNewTabButton = document.getElementById('open-new-tab');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const timeDisplay = document.getElementById('time-display');
  const datePart = document.getElementById('date-part');
  const timePart = document.getElementById('time-part');
  const quickAccessGrid = document.getElementById('quick-access-grid');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  // 默认网站列表
  const defaultSites = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'Gmail', url: 'https://mail.google.com' },
    { name: 'Twitter', url: 'https://twitter.com' }
  ];
  
  // 更新时间显示
  function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    datePart.textContent = `${year}/${month}/${day}`;
    timePart.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  // 获取网站名称的首字母
  function getInitials(name) {
    return name.charAt(0).toUpperCase();
  }
  
  // 渲染快捷访问网站
  function renderQuickAccessSites() {
    // 从localStorage加载网站列表
    let quickAccessSites = defaultSites;
    const savedSites = localStorage.getItem('quickAccessSites');
    if (savedSites) {
      quickAccessSites = JSON.parse(savedSites);
    }
    
    quickAccessGrid.innerHTML = '';
    
    // 只显示前4个网站以适应popup界面
    const displaySites = quickAccessSites.slice(0, 4);
    
    displaySites.forEach((site) => {
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
        chrome.tabs.create({url: site.url});
      });
      
      quickAccessGrid.appendChild(siteElement);
    });
  }
  
  // 更新主题图标
  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.textContent = '◑'; // 实心圆表示深色主题
    } else {
      themeIcon.textContent = '◐'; // 半圆表示浅色主题
    }
  }
  
  // 应用主题
  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  }
  
  // 初始化主题
  function initTheme() {
    // 检查本地存储中是否有保存的主题设置
    const savedTheme = localStorage.getItem('theme');
    
    // 如果有保存的主题设置，则应用它，否则默认使用浅色主题
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // 默认使用浅色主题
      applyTheme('light');
    }
  }
  
  // 切换主题
  function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  // 事件监听器
  openNewTabButton.addEventListener('click', function() {
    chrome.tabs.create({url: 'chrome://newtab'});
  });
  
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      // 使用默认搜索引擎（Bing）进行搜索
      chrome.tabs.create({url: `https://www.bing.com/search?q=${encodeURIComponent(query)}`});
    }
  });
  
  themeToggle.addEventListener('click', toggleTheme);
  
  // 初始化
  updateTime();
  renderQuickAccessSites();
  initTheme();
  
  // 每秒更新时间
  setInterval(updateTime, 1000);
});