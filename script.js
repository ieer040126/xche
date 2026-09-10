// ========== 待办事项 逻辑 ==========
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tip = document.getElementById('tip');
const list = document.getElementById('taskList');
const leftCount = document.getElementById('leftCount');

// 数据源：{ text: 内容, done: 是否完成 }
let tasks = [];

// 渲染列表 + 更新"未完成"计数
function render() {
  list.innerHTML = '';

  // 列表为空时显示占位提示
  if (tasks.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = '暂无待办，添加一个吧～';
    list.appendChild(li);
  }

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    // 待办内容
    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = task.text;

    // "完成"按钮：点击切换完成状态（完成项用删除线表示）
    const finishBtn = document.createElement('button');
    finishBtn.className = 'btn finish-btn';
    finishBtn.textContent = task.done ? '撤销' : '完成';
    finishBtn.addEventListener('click', () => {
      task.done = !task.done;
      render();
    });

    // "×"按钮：移除对应项目
    const delBtn = document.createElement('button');
    delBtn.className = 'btn del-btn';
    delBtn.textContent = '×';
    delBtn.title = '删除';
    delBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      render();
    });

    li.appendChild(span);
    li.appendChild(finishBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  // 实时显示未完成数量
  leftCount.textContent = tasks.filter(t => !t.done).length;
}

// 新增待办：非空才能新增，新增后清空输入框；为空则显示提示且不新增
function addTask() {
  const text = input.value.trim();
  if (!text) {
    tip.classList.add('show');
    input.focus();
    return;
  }
  tip.classList.remove('show');
  tasks.push({ text: text, done: false });
  input.value = '';
  input.focus();
  render();
}

// 事件绑定
addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();           // 回车也能添加
  if (tip.classList.contains('show')) tip.classList.remove('show');
});

// 初始渲染
render();
