// ==========================================
// LIMINAL AI 0.4
// ==========================================


// ---------------- MEMORY ----------------

let memory = JSON.parse(localStorage.getItem("liminalMemory")) || {};

function saveMemory() {
    localStorage.setItem("liminalMemory", JSON.stringify(memory));
}


// ---------------- THINK ----------------

function think(text) {

    text = text.toLowerCase().trim();


    // TIME

    if (
        text.includes("what time is it") ||
        text === "time" ||
        text.includes("current time")
    ) {

        const now = new Date();

        return "The current time is " +
            now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }) + ".";
    }


    // DATE

    if (
        text.includes("what is the date") ||
        text.includes("what's the date") ||
        text === "date"
    ) {

        const now = new Date();

        return "Today is " +
            now.toLocaleDateString([], {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }) + ".";
    }


    // GREETINGS

    if (text === "hello" || text === "hi") {
        return "Hello!";
    }

    if (text === "hey") {
        return "Hey there!";
    }


    // BASIC QUESTIONS

    if (text.includes("how are you")) {
        return "I'm doing great!";
    }

    if (text.includes("what is your name")) {
        return "I'm Liminal AI.";
    }

    if (text.includes("who made you")) {
        return "I was created by Jacobo.";
    }


    // JOKES

    if (text.includes("tell me a joke")) {

        const jokes = [
            "Why did the computer go to the doctor? Because it had a virus.",
            "Why was the computer cold? It left its Windows open.",
            "What do computers eat? Microchips!",
            "Why did the programmer quit his job? He didn't get arrays."
        ];

        return jokes[Math.floor(Math.random() * jokes.length)];
    }


    // REMEMBER THAT

    if (text.startsWith("remember that ")) {

        const information = text.substring(14).trim();

        const parts = information.split(" is ");

        if (parts.length >= 2) {

            let key = parts[0].trim();

            if (key.startsWith("my ")) {
                key = key.substring(3);
            }

            const value = parts.slice(1).join(" is ").trim();

            memory[key] = value;

            saveMemory();

            return "I'll remember that your " +
                key + " is " + value + ".";
        }

        return "Try saying: remember that my favorite color is yellow.";
    }


    // NATURAL MEMORY

    if (
        text.startsWith("my ") &&
        text.includes(" is ")
    ) {

        const parts = text.split(" is ");

        let key = parts[0].substring(3).trim();

        const value = parts.slice(1).join(" is ").trim();

        memory[key] = value;

        saveMemory();

        return "Got it. I'll remember that your " +
            key + " is " + value + ".";
    }


    // I AM MEMORY

    if (text.startsWith("i am ")) {

        const value = text.substring(5);

        memory["identity"] = value;

        saveMemory();

        return "Got it. I'll remember that you are " +
            value + ".";
    }


    // LOCATION MEMORY

    if (text.startsWith("i live in ")) {

        const value = text.substring(10);

        memory["location"] = value;

        saveMemory();

        return "Got it. I'll remember that you live in " +
            value + ".";
    }


    // ASK MEMORY

    if (
        text.startsWith("what is my ") ||
        text.startsWith("what's my ")
    ) {

        let key;

        if (text.startsWith("what is my ")) {
            key = text.substring(11);
        } else {
            key = text.substring(10);
        }

        if (memory[key]) {
            return "Your " + key + " is " + memory[key] + ".";
        }

        return "I don't remember your " + key + " yet.";
    }


    // FORGET

    if (text.startsWith("forget my ")) {

        const key = text.substring(10);

        delete memory[key];

        saveMemory();

        return "Okay, I forgot your " + key + ".";
    }


    // SHOW MEMORY

    if (
        text === "what do you remember" ||
        text === "show my memories"
    ) {

        const keys = Object.keys(memory);

        if (keys.length === 0) {
            return "I don't remember anything yet.";
        }

        let response = "Here's what I remember:<br><br>";

        keys.forEach(function(key) {

            response +=
                "• " + key + " = " + memory[key] + "<br>";

        });

        return response;
    }


    // MATH

    if (text.match(/^[0-9+\-*/().\s]+$/)) {

        try {

            const answer = Function(
                '"use strict"; return (' + text + ')'
            )();

            return "The answer is " + answer + ".";

        } catch {

            return "I couldn't calculate that.";
        }
    }


    return "I don't know how to answer that yet.";
}



// ---------------- SEND MESSAGE ----------------

function sendMessage() {

    const input = document.getElementById("userInput");
    const messages = document.getElementById("messages");

    const text = input.value.trim();


    if (text === "") {
        return;
    }


    // USER

    const userMessage = document.createElement("div");

    userMessage.className = "user";

    userMessage.textContent = text;

    messages.appendChild(userMessage);



    // AI

    const aiMessage = document.createElement("div");

    aiMessage.className = "ai";

    aiMessage.innerHTML = think(text);

    messages.appendChild(aiMessage);



    input.value = "";

    messages.scrollTop = messages.scrollHeight;

}



// ---------------- ENTER KEY ----------------

document
.getElementById("userInput")
.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});



// ---------------- CLEAR CHAT ----------------

function clearChat() {

    document.getElementById("messages").innerHTML = `
        <div class="ai">
            Hello! I'm Liminal AI.
        </div>
    `;

}