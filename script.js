
const defaultTasks = [
  { text: "💧 喝水 2000cc", done: false },
  { text: "🛏 睡滿 8 小時", done: false },
  { text: "💊 吃維他命", done: false },
  { text: "🏃‍♀️ 運動一下", done: false },
  { text: "🧖‍♀️ 敷面膜", done: false },
  { text: "😽 擦乳液", done: false }
];

let tasks = JSON.parse(localStorage.getItem("tasks")) || defaultTasks;

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  let doneCount = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });
    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(checkbox);
    li.appendChild(span);
    list.appendChild(li);
    if (task.done) doneCount++;
  });

  const progress = document.getElementById("progress-bar");
  progress.style.width = `${(doneCount / tasks.length) * 100}%`;
}

document.getElementById("add-task").addEventListener("click", () => {
  const text = prompt("輸入新的任務內容：");
  if (text) {
    tasks.push({ text, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
});

renderTasks();
