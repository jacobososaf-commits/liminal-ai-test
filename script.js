console.log("Liminal AI loaded!");

const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

const learnReplies = [
    "Thanks! I'll remember that.",
    "Interesting! I've learned something new.",
    "Got it! I'll keep that in mind.",
    "Thanks for teaching me!"
];

// Load saved knowledge
let knowledge = JSON.parse(localStorage.getItem("knowledge"));

if (!knowledge) {
    knowledge = {
        "hello": "Hello!",
        "hi": "Hello!",
        "hey": "Hey there!",
        "how are you": "I'm doing great!",
        "what is your name": "I'm Liminal AI.",
        "who made you": "I was created by Jacobo."
    };
}

let learning = false;
let lastQuestion = "";

// Save knowledge
function saveKnowledge() {
    localStorage.setItem("knowledge", JSON.stringify(knowledge));
}

// Add a message to the chat
function addMessage(text, sender) {

    const div = document.createElement("div");
    div.className = sender;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    div.innerHTML = `
        <div>${text}</div>
        <div class="time">${time}</div>
    `;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

// AI thinking
function think(text) {

    text = text.toLowerCase().trim();

    if (knowledge[text]) {
        return knowledge[text];
    }

    learning = true;
    lastQuestion = text;

    return "I don't know that yet. Can you teach me?";
}

// Send message
function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    if (learning) {

        knowledge[lastQuestion] = text;

        saveKnowledge();

        learning = false;

        const reply =
            learnReplies[Math.floor(Math.random() * learnReplies.length)];

        setTimeout(() => {
            addMessage(reply, "ai");
        }, 500);

        return;
    }

    setTimeout(() => {

        const reply = think(text);

        addMessage(reply, "ai");

    }, 500);
}

// Enter key
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});

// Clear memory
function clearMemory() {

    if (!confirm("Delete everything Liminal AI has learned?"))
        return;

    localStorage.removeItem("knowledge");

    knowledge = {
        "hello": "Hello!",
        "hi": "Hello!",
        "hey": "Hey there!",
        "how are you": "I'm doing great!",
        "what is your name": "I'm Liminal AI.",
        "who made you": "I was created by Jacobo."
    };

    addMessage("Memory cleared successfully.", "ai");
}

console.log("Liminal AI is ready!");