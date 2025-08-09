const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Function to add message to chat box
function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to get timetable for a day
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

// Function to process user message
function processMessage(msg) {
  msg = msg.toLowerCase();

  // Check for day keywords
  const days = ["monday","tuesday","wednesday","thursday","friday"];
  for (const day of days) {
    if (msg.includes(day)) {
      return getTimetable(day.charAt(0).toUpperCase() + day.slice(1));
    }
  }

  return "Sorry, I can only provide timetable info by day (e.g., ask 'What's my timetable on Tuesday?').";
}

// Event listeners
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
    sendBtn.click();
  }
});

