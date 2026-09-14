document.addEventListener('DOMContentLoaded', function() {
    // 计时器变量
    let timerInterval = null;
    let timerSeconds = 0;
    let isTimerRunning = false;
    
    // 倒计时变量
    let countdownInterval = null;
    let countdownSeconds = 0;
    let isCountdownRunning = false;
    
    // 获取DOM元素
    const timerDisplay = document.getElementById('timer-display');
    const countdownDisplay = document.getElementById('countdown-display');
    const timerStartBtn = document.getElementById('timer-start');
    const timerResetBtn = document.getElementById('timer-reset');
    const countdownSetBtn = document.getElementById('countdown-set');
    const countdownStartBtn = document.getElementById('countdown-start');
    const countdownResetBtn = document.getElementById('countdown-reset');
    const countdownHoursInput = document.getElementById('countdown-hours');
    const countdownMinutesInput = document.getElementById('countdown-minutes');
    const countdownSecondsInput = document.getElementById('countdown-seconds');
    
    // 格式化时间显示 (HH:MM:SS)
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // 更新计时器显示
    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(timerSeconds);
    }
    
    // 更新倒计时显示
    function updateCountdownDisplay() {
        countdownDisplay.textContent = formatTime(countdownSeconds);
    }
    
    // 计时器功能
    function startTimer() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            timerStartBtn.textContent = '暂停';
            timerInterval = setInterval(() => {
                timerSeconds++;
                updateTimerDisplay();
            }, 1000);
        } else {
            isTimerRunning = false;
            timerStartBtn.textContent = '开始';
            clearInterval(timerInterval);
        }
    }
    
    function resetTimer() {
        isTimerRunning = false;
        timerStartBtn.textContent = '开始';
        clearInterval(timerInterval);
        timerSeconds = 0;
        updateTimerDisplay();
    }
    
    // 倒计时功能
    function setCountdown() {
        const hours = parseInt(countdownHoursInput.value) || 0;
        const minutes = parseInt(countdownMinutesInput.value) || 0;
        const seconds = parseInt(countdownSecondsInput.value) || 0;
        countdownSeconds = hours * 3600 + minutes * 60 + seconds;
        
        if (countdownSeconds <= 0) {
            countdownSeconds = 0;
        }
        
        updateCountdownDisplay();
    }
    
    function startCountdown() {
        if (countdownSeconds <= 0) {
            alert('请先设置倒计时时间');
            return;
        }
        
        if (!isCountdownRunning) {
            isCountdownRunning = true;
            countdownStartBtn.textContent = '暂停';
            countdownInterval = setInterval(() => {
                countdownSeconds--;
                updateCountdownDisplay();
                
                if (countdownSeconds <= 0) {
                    clearInterval(countdownInterval);
                    isCountdownRunning = false;
                    countdownStartBtn.textContent = '开始';
                    // 倒计时结束提醒
                    alert('倒计时结束！');
                }
            }, 1000);
        } else {
            isCountdownRunning = false;
            countdownStartBtn.textContent = '开始';
            clearInterval(countdownInterval);
        }
    }
    
    function resetCountdown() {
        isCountdownRunning = false;
        countdownStartBtn.textContent = '开始';
        clearInterval(countdownInterval);
        setCountdown(); // 重置为设置的时间
    }
    
    // 绑定事件监听器
    timerStartBtn.addEventListener('click', startTimer);
    timerResetBtn.addEventListener('click', resetTimer);
    countdownSetBtn.addEventListener('click', setCountdown);
    countdownStartBtn.addEventListener('click', startCountdown);
    countdownResetBtn.addEventListener('click', resetCountdown);
    
    // 初始化显示
    updateTimerDisplay();
    updateCountdownDisplay();
});