const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Add message to chat window
function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Get timetable for a day
function getTimetable(day) {
  const timetable = collegeData.timetables.S3.ECE_A[day];
  if (!timetable) {
    return `No timetable found for ${day}.`;
  }
  let response = `Timetable for ${day}:\n`;
  timetable.forEach(entry => {
    if (entry.periods) {
      response += `Periods ${entry.periods}: ${entry.subject}`;
      if (entry.batch1 && entry.batch2) {
        response += ` (Batch 1: ${entry.batch1}, Batch 2: ${entry.batch2})`;
      }
    } else if (entry.period) {
      response += `Period ${entry.period}: ${entry.subject}`;
    }
    response += '\n';
  });
  return response.trim();
}

// Process user message and respond
function processMessage(msg) {
  msg = msg.toLowerCase();

  // Timetable query
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  for (const day of days) {
    if (msg.includes(day)) {
      return getTimetable(day.charAt(0).toUpperCase() + day.slice(1));
    }
  }

  // HOD queries
  if (msg.includes("hod") || msg.includes("head of department")) {
    if (msg.includes("ece")) return `HOD of ECE: ${collegeData.hods.ECE}`;
    if (msg.includes("cse")) return `HOD of CSE: ${collegeData.hods.CSE}`;
    if (msg.includes("eee")) return `HOD of EEE: ${collegeData.hods.EEE}`;
    return "Please specify the department (ECE, CSE, or EEE) to know the HOD.";
  }

  // Academic calendar queries
  if (msg.includes("academic calendar") || msg.includes("events")) {
    let eventsList = collegeData.academic_calendar
      .filter(e => e.semesters.includes("S3"))
      .map(e => `${e.date} (${e.day}): ${e.event}`)
      .join('\n');
    return `Upcoming academic events for S3:\n${eventsList}`;
  }

  // Exam dates queries
  if (msg.includes("exam") || msg.includes("examination") || msg.includes("test")) {
    let examsList = collegeData.exam_dates
      .filter(e => e.semesters.includes("S3"))
      .map(e => {
        if (e.start_date) return `${e.exam} starts on ${e.start_date}`;
        if (e.last_date) return `${e.exam} to be completed by ${e.last_date}`;
        return e.exam;
      })
      .join('\n');
    return `Upcoming exams for S3:\n${examsList}`;
  }

  return "Hey! Feel free to ask me anything about your timetable, HODs, exams, or college events. What’s on your mind?";
}

// Event listeners for sending messages
sendBtn.addEventListener("click", () => {
  const msg = userInput.value.trim();
  if (!msg) return;
  addMessage(msg, "user");
  userInput.value = "";
  const reply = processMessage(msg);
  addMessage(reply, "bot");
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendBtn.click();
  }
});
