const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(msg, sender, isHTML = false) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  if (isHTML) div.innerHTML = msg;
  else div.textContent = msg;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function formatTimetable(timetable) {
  let html = `<table>
    <thead><tr><th>Period(s)</th><th>Subject</th><th>Time</th></tr></thead><tbody>`;
  timetable.forEach((entry) => {
    const periods = entry.periods || entry.period || "";
    let subject = entry.subject;
    if (entry.batch1 && entry.batch2)
      subject += `<br><small><em>${entry.batch1} / ${entry.batch2}</em></small>`;
    html += `<tr><td>${periods}</td><td>${subject}</td><td>${entry.time}</td></tr>`;
  });
  html += "</tbody></table>";
  return html;
}

// Normalize day input to match keys: First letter uppercase rest lowercase
function normalizeDay(day) {
  day = day.trim().toLowerCase();
  return day.charAt(0).toUpperCase() + day.slice(1);
}

function getTimetable(day, batch = "ECE_A") {
  const normDay = normalizeDay(day);

  if (
    !collegeData.timetables.S3 ||
    !collegeData.timetables.S3[batch] ||
    !collegeData.timetables.S3[batch][normDay]
  ) {
    return `No timetable found for ${normDay} in ${batch}.`;
  }
  const timetable = collegeData.timetables.S3[batch][normDay];
  return `<strong>📅 Timetable for ${normDay} (${batch}):</strong>${formatTimetable(
    timetable
  )}`;
}

function getTimings(day, batch = "ECE_A") {
  const normDay = normalizeDay(day);
  if (
    !collegeData.timetables.S3 ||
    !collegeData.timetables.S3[batch] ||
    !collegeData.timetables.S3[batch][normDay]
  ) {
    return `No timings found for ${normDay} in ${batch}.`;
  }
  const timetable = collegeData.timetables.S3[batch][normDay];
  let timings = timetable
    .map(
      (entry) =>
        `${entry.periods || entry.period || ""}: ${entry.time || "N/A"}`
    )
    .join("\n");
  return `<strong>⏰ Timings for ${normDay} (${batch}):</strong><br><pre>${timings}</pre>`;
}

function processInput(text) {
  const msg = text.toLowerCase().trim();

  // Determine batch: default ECE_A, or CSB if mentioned
  let batch = "ECE_A";
  if (msg.includes("csb")) batch = "CSB";

  // Days array for matching
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  // Check if any day is mentioned in the input
  for (const day of days) {
    if (msg.includes(day)) {
      // Check if user wants timings specifically
      if (msg.includes("time") || msg.includes("timing")) {
        return getTimings(day, batch);
      }
      // Otherwise, show timetable
      return getTimetable(day, batch);
    }
  }

  // HOD queries
  if (msg.includes("hod")) {
    if (msg.includes("ece")) return `HOD of ECE: ${collegeData.hods.ECE}`;
    if (msg.includes("cse")) return `HOD of CSE: ${collegeData.hods.CSE}`;
    if (msg.includes("eee")) return `HOD of EEE: ${collegeData.hods.EEE}`;
    return "Please specify the department for HOD info (ECE, CSE, EEE).";
  }

  // Academic calendar query
  if (msg.includes("academic calendar") || msg.includes("calendar")) {
    const events = collegeData.academic_calendar?.Odd_Semester_2025;
    if (!events) return "No academic calendar data available.";
    let list = events
      .map(
        (ev) =>
          `<li><b>${ev.date} (${ev.day.substring(0, 3)})</b>: ${ev.event}</li>`
      )
      .join("");
    return `<strong>📅 Academic Calendar Events:</strong><ul>${list}</ul>`;
  }

  return "Sorry, I didn't understand that. Try asking about your timetable, HOD, or academic calendar.";
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = processInput(text);
    addMessage(reply, "bot", true);
  }, 500);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
