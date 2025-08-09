document.addEventListener("DOMContentLoaded", () => {
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
      let periodLabel = "";
      if (entry.periods) periodLabel = `Periods: ${entry.periods}`;
      else if (entry.period) periodLabel = `Period: ${entry.period}`;

      let subject = entry.subject || "Unknown Subject";
      if (entry.batch1 && entry.batch2)
        subject += `<br><small><em>${entry.batch1} / ${entry.batch2}</em></small>`;

      html += `<tr><td>${periodLabel}</td><td>${subject}</td><td>${entry.time}</td></tr>`;
    });
    html += "</tbody></table>";
    return html;
  }

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
      .map((entry) => {
        const periodLabel = entry.periods
          ? `Periods: ${entry.periods}`
          : entry.period
          ? `Period: ${entry.period}`
          : "";
        const subject = entry.subject || "Unknown Subject";
        const time = entry.time || "N/A";
        return `${periodLabel} — ${subject} — ${time}`;
      })
      .join("\n");
    return `<strong>⏰ Timings for ${normDay} (${batch}):</strong><br><pre>${timings}</pre>`;
  }

  function processInput(text) {
    const msg = text.toLowerCase().trim();

    let batch = "ECE_A";
    if (msg.includes("csb")) batch = "CSB";

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

    for (const day of days) {
      if (msg.includes(day)) {
        if (msg.includes("time") || msg.includes("timing")) {
          return getTimings(day, batch);
        }
        return getTimetable(day, batch);
      }
    }

    if (msg.includes("hod")) {
      if (msg.includes("ece")) return `HOD of ECE: ${collegeData.hods.ECE}`;
      if (msg.includes("cse")) return `HOD of CSE: ${collegeData.hods.CSE}`;
      if (msg.includes("eee")) return `HOD of EEE: ${collegeData.hods.EEE}`;
      return "Please specify the department for HOD info (ECE, CSE, EEE).";
    }

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
    }, 400);
  }

  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Welcome message
  addMessage(
    "Hi! Ask me about your timetable (e.g., 'Monday timetable', 'Wednesday timing csb'), HODs or academic calendar.",
    "bot"
  );
});
