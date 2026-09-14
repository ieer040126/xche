document.addEventListener('DOMContentLoaded', function() {
    const timeDisplay = document.getElementById('time-display');
    const datePart = document.getElementById('date-part');
    const timePart = document.getElementById('time-part');
    
    function updateTime() {
        const now = new Date();
        
        // 格式化日期 (YYYY-MM-DD)
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        
        // 格式化时间 (HH:MM:SS)
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // 更新显示
        datePart.textContent = dateString;
        timePart.textContent = timeString;
    }
    
    // 初始更新时间
    updateTime();
    
    // 每秒更新一次时间
    setInterval(updateTime, 1000);
});