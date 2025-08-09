// This handles user message and chatbot response
function addMessage(message, sender) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getTimetable(day, batch = "ECE_A") {
  const timetable = collegeData.timetables.S3[batch][day];
  if (!timetable) {
    return `No timetable found for ${day} in ${batch}.`;
  }
  let response = `Timetable for ${day} (${batch}):\n`;
  timetable.forEach(entry => {
    if (entry.periods) {
      response += `Periods ${entry.periods}: ${entry.subject}`;
      if (entry.time) response += ` (${entry.time})`;
    } else if (entry.period) {
      response += `Period ${entry.period}: ${entry.subject}`;
      if (entry.time) response += ` (${entry.time})`;
    }
    response += '\n';
  });
  return response.trim();
}

function getHOD(dept) {
  return collegeData.hods[dept] || `Sorry, I don't have HOD info for ${dept}.`;
}

function getAcademicEvents() {
  const events = collegeData.academic_calendar.Odd_Semester_2025;
  let response = "Upcoming Academic Events:\n";
  events.forEach(ev => {
    response += `${ev.date} (${ev.day}): ${ev.event}\n`;
  });
  return response;
}

function processMessage(msg) {
  msg = msg.toLowerCase();

  // Batch detection: Default to ECE_A
  let batch = "ECE_A";
  if (msg.includes("csb")) batch = "CSB";
  else if (msg.includes("ece a") || msg.includes("eca")) batch = "ECE_A";

  // Timetable query for days
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  for (const day of days) {
    if (msg.includes(day)) {
      return getTimetable(day.charAt(0).toUpperCase() + day.slice(1), batch);
    }
  }

  // HOD queries
  if (msg.includes("hod")) {
    if (msg.includes("ece")) return getHOD("ECE");
    if (msg.includes("cse") || msg.includes("cs")) return getHOD("CSE");
    if (msg.includes("eee")) return getHOD("EEE");
    return "Please specify department (ECE, CSE, EEE) for HOD info.";
  }

  // Academic calendar query
  if (msg.includes("academic") || msg.includes("calendar") || msg.includes("events")) {
    return getAcademicEvents();
  }

  // Exam dates query (empty for now)
  if (msg.includes("exam")) {
    return "Exam dates are not available yet.";
  }

  // Default reply
  return "Hi! Ask me about your timetable (ECE_A or CSB), HODs, academic calendar, or exams. How can I help?";
}

function sendMessage() {
  const inputBox = document.getElementById("user-input");
  const userText = inputBox.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  inputBox.value = "";

  // Simulate bot typing delay
  setTimeout(() => {
    const reply = processMessage(userText);
    addMessage(reply, "bot");
  }, 500);
}

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
