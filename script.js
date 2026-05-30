const titleInput = document.querySelector("#titleInput");
const startDateInput = document.querySelector("#startDateInput");
const targetDaysInput = document.querySelector("#targetDaysInput");
const eveningRuleInput = document.querySelector("#eveningRuleInput");
const encourageInput = document.querySelector("#encourageInput");
const generateButton = document.querySelector("#generateButton");
const printButton = document.querySelector("#printButton");
const sheetTitle = document.querySelector("#sheetTitle");
const goalText = document.querySelector("#goalText");
const ruleText = document.querySelector("#ruleText");
const encourageText = document.querySelector("#encourageText");
const daysGrid = document.querySelector("#daysGrid");

const weekdayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDisplayDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()} ${weekdayNames[date.getDay()]}`;
}

function createLine(label, extraClass = "") {
  const line = document.createElement("div");
  line.className = `write-line ${extraClass}`.trim();
  line.innerHTML = `<span>${label}</span><span></span>`;
  return line;
}

function createDayCard(index, date) {
  const card = document.createElement("article");
  card.className = "day-card";

  const header = document.createElement("header");
  header.innerHTML = `
    <span class="day-number">第 ${index + 1} 天</span>
    <span class="day-date">${formatDisplayDate(date)}</span>
  `;

  const fields = document.createElement("div");
  fields.className = "day-fields";

  fields.appendChild(createLine("体重：", ""));
  fields.appendChild(createLine("最后进食：", ""));

  const status = document.createElement("div");
  status.className = "status-row full-row";
  status.innerHTML = `
    <span>状态：</span>
    <span class="status-mark status-good">○</span><span>良好</span>
    <span class="status-mark status-okay">△</span><span>守住</span>
    <span class="status-mark status-miss">×</span><span>失控</span>
  `;

  const evening = document.createElement("div");
  evening.className = "checkbox-row full-row";
  evening.innerHTML = `
    <span>20:00 后进食：</span>
    <span class="box"></span><span>否</span>
    <span class="box"></span><span>是</span>
  `;

  fields.appendChild(status);
  fields.appendChild(evening);
  fields.appendChild(createLine("备注：", "full-row"));

  card.appendChild(header);
  card.appendChild(fields);
  return card;
}

function renderSheet() {
  const title = titleInput.value.trim() || "14 天饮食控制打卡表";
  const targetDays = Math.min(14, Math.max(1, Number(targetDaysInput.value) || 10));
  const eveningRule = eveningRuleInput.value.trim() || "20:00 后尽量不进食";
  const encourage = encourageInput.value.trim() || "今天填上去，就是在赢。";
  const startDate = parseLocalDate(startDateInput.value);

  sheetTitle.textContent = title;
  goalText.textContent = `至少 ${targetDays} 天达到 ○ 或 △`;
  ruleText.textContent = eveningRule;
  encourageText.textContent = encourage;
  targetDaysInput.value = targetDays;

  daysGrid.replaceChildren();
  for (let index = 0; index < 14; index += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    daysGrid.appendChild(createDayCard(index, date));
  }
}

startDateInput.value = toDateInputValue(new Date());
renderSheet();

generateButton.addEventListener("click", renderSheet);
printButton.addEventListener("click", () => {
  renderSheet();
  window.print();
});

[titleInput, startDateInput, targetDaysInput, eveningRuleInput, encourageInput].forEach((input) => {
  input.addEventListener("change", renderSheet);
});
