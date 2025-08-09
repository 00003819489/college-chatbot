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

function getTimetable(day, batch = "ECE_A") {
  // Normalize day string - first letter uppercase rest lowercase
  const normDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();

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

function processInput(text) {
  const msg = text.toLowerCase().trim();

  // Default batch
  let batch = "ECE_A";
  if (msg.includes("csb")) batch = "CSB";

  // Days array
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  // Check for day query
  for (const day of days) {
    if (msg.includes(day)) {
      // If user asks for timing specifically
      if (msg.includes("time") || msg.includes("timing")) {
        const normDay = day.charAt(0).toUpperCase() + day.slice(1);
        const timetable = collegeData.timetables.S3[batch][normDay];
        if (!timetable)
          return `No timetable found for ${normDay} in ${batch}.`;

        let timings = timetable
          .map(
            (entry) =>
              `${entry.periods || entry.period || ""}: ${entry.time || "N/A"}`
          )
          .join("\n");
        return `<strong>⏰ Timings for ${normDay} (${batch}):</strong><br><pre>${timings}</pre>`;
      }
      // Regular timetable
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

