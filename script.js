function addMessage(message, sender, isHTML = false) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  if (isHTML) msgDiv.innerHTML = message;
  else msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function formatTimetableTable(timetable) {
  let html = `<table>
    <thead><tr><th>Period(s)</th><th>Subject</th><th>Time</th></tr></thead><tbody>`;
  timetable.forEach(entry => {
    let periods = entry.periods || entry.period || "";
    let subject = entry.subject;
    // If lab with batches info, show both batches separated
    if (entry.batch1 && entry.batch2) {
      subject += `<br/><small><em>${entry.batch1} / ${entry.batch2}</em></small>`;
    }
    let time = entry.time || "-";
    html += `<tr><td>${periods}</td><td>${subject}</td><td>${time}</td></tr>`;
  });
  html += `</tbody></table>`;
  return html;
}

function getTimetable(day, batch = "ECE_A") {
  const timetable = collegeData.timetables.S3[batch][day];
  if (!timetable) {
    return `No timetable found for ${day} in ${batch}.`;
  }
  return `<strong>📅 Timetable for ${day} (${batch}):</strong>${formatTimetableTable(timetable)}`;
}

function getTimings(day, batch = "ECE_A") {
  const timetable = collegeData.timetables.S3[batch][day];
  if (!timetable) {
    return `No timetable found for ${day} in ${batch}.`;
  }
  let html = `<strong>⏰ Period timings for ${day} (${batch}):</strong><ul>`;
  timetable.forEach(entry => {
    const periods = entry.periods || entry.period || "";
    html += `<li><strong>${periods}</strong>: ${entry.time || "Timing not available"}</li>`;
  });
  html += "</ul>";
  return html;
}

function getHOD(dept) {
  const hod = collegeData.hods[dept];
  if (!hod) return `Sorry, I don't have HOD info for ${dept}.`;
  return `<strong>Head of Department - ${dept}:</strong> ${hod}`;
}

function getAcademicEvents() {
  const events = collegeData.academic_calendar.Odd_Semester_2025;
  let html = `<strong>📅 Upcoming Academic Events:</strong><ul>`;
  events.forEach(ev => {
    html += `<li><strong>${ev.date} (${ev.day.substring(0, 3)})</strong>: ${ev.event}</li>`;
  });
  html += "</ul>";
  return html;
}

function getExamDates() {
  // Placeholder if exam_dates is empty
  return "Exam dates are not available yet.";
}

function processMessage(msg) {
  msg = msg.toLowerCase();

  // Batch detection: Default to ECE_A
  let batch = "ECE_A";
  if (msg.includes("csb")) batch = "CSB";
  else if (msg.includes("ece a") || msg.includes("eca")) batch = "ECE_A";

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  if (msg.includes("timing") || msg.includes("time slots") || msg.includes("period times")) {
    for (const day of days) {
      if (msg.includes(day)) {
        return getTimings(day.charAt(0).toUpperCase() + day.slice(1), batch);
      }
    }
  }

  for (const day of days) {
    if (msg.includes(day)) {
      return getTimetable(day.charAt(0).toUpperCase() + day.slice(1), batch);
    }
  }

  if (msg.includes("hod")) {
    if (msg.includes("ece")) return getHOD("ECE");
    if (msg.includes("cse") || msg.includes("cs")) return getHOD("CSE");
    if (msg.includes("eee")) return getHOD("EEE");
    return "Please specify department (ECE, CSE, EEE) for HOD info.";
  }

  if (msg.includes("academic") || msg.includes("calendar") || msg.includes("events")) {
    return getAcademicEvents();
  }

  if (msg.includes("exam")) {
    return getExamDates();
  }

  return "Hi! Ask me about your timetable (ECE_A or CSB), HODs, academic calendar, or exams. How can I help?";
}

function sendMessage() {
  const inputBox = document.getElementById("user-input");
  const userText = inputBox.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  inputBox.value = "";

  setTimeout(() => {
    const reply = processMessage(userText);
    // If reply contains HTML tags, send as HTML, else plain text
    const isHTML = /<\/?[a-z][\s\S]*>/i.test(reply);
    addMessage(reply, "bot", isHTML);
  }, 500);
}

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
