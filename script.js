const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function processMessage(msg) {
  // Your existing processing logic here
  return "You said: " + msg; // Temporary echo for testing
}

// On clicking Send button
sendBtn.addEventListener("click", () => {
  const msg = userInput.value.trim();
  if (!msg) return;
  addMessage(msg, "user");
  userInput.value = "";
  const reply = processMessage(msg);
  addMessage(reply, "bot");
});

// On pressing Enter key inside input
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();  // prevent form submission if inside a form
    sendBtn.click();
  }
});
