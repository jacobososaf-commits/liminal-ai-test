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

function think(text) {

    text = text.toLowerCase().trim();

    // Time
    if (
        text.includes("what time is it") ||
        text.includes("time") ||
        text.includes("current time")
    ) {
        const now = new Date();

        return "The current time is " +
            now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }) + ".";
    }

    // Date
    if (
        text.includes("what is today's date") ||
        text.includes("what day is it") ||
        text.includes("date")
    ) {
        const now = new Date();

        return "Today is " +
            now.toLocaleDateString();
    }

    // Jokes
    if (
        text.includes("tell me a joke") ||
        text.includes("joke") ||
        text.includes("make me laugh")
    ) {

        const jokes = [
            "Why did the computer get cold? Because it left its Windows open!",
            "Why do programmers prefer dark mode? Because light attracts bugs.",
            "Why was the math book sad? It had too many problems.",
            "Why did the robot go on vacation? It needed to recharge.",
            "I would tell you a UDP joke, but you might not get it.",
            "Why don't skeletons fight each other? They don't have the guts.",
            "Why was the JavaScript developer broke? Because he kept using null."
        ];

        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Greetings
    if (
        text === "hello" ||
        text === "hi" ||
        text === "hey"
    ) {
        return "Hello! How can I help you today?";
    }

    // Learned knowledge
    if (knowledge[text]) {
        return knowledge[text];
    }

    // Learn new things
    lastQuestion = text;
    learning = true;

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