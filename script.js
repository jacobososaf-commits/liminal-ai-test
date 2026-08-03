console.log("Liminal AI loaded!");

const messages = document.getElementById("messages");

const learnReplies = [
    "Thanks! I'll remember that.",
    "Interesting! I've learned something new.",
    "Got it! I'll keep that in mind.",
    "Thanks for teaching me!"
];

// the rest of your code continues here...
const messages = document.getElementById("messages");
const learnReplies = [
    "Thanks! I'll remember that.",
    "Interesting! I've learned something new.",
    "Got it! I'll keep that in mind.",
    "Thanks for teaching me!"
];
let knowledge = JSON.parse(localStorage.getItem("knowledge")) || {
    "hello": "Hello!",
    "how are you": "I'm doing great!",
    "what is your name": "I'm Liminal AI.",
    "goodbye": "Goodbye!"
};

let learning = false;
let lastQuestion = "";

function saveKnowledge(){
    localStorage.setItem("knowledge", JSON.stringify(knowledge));
}

function addMessage(text, sender){

    let div = document.createElement("div");

    div.className = sender;

  let now = new Date();

let time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
});

div.innerHTML = `
    ${text}
    <div class="time">${time}</div>
`;
    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

function sendMessage(){

    let input = document.getElementById("userInput");

    let text = input.value.trim().toLowerCase();

    if(text=="") return;

    addMessage(text,"user");

    input.value="";

    if(learning){

        knowledge[lastQuestion]=text;

        saveKnowledge();

        learning=false;

       let reply = learnReplies[Math.floor(Math.random() * learnReplies.length)];

addMessage(reply, "ai");

        return;

    }

    let reply = think(text);

    setTimeout(function(){

        addMessage(reply,"ai");

    },500);

}

function think(text){

    if(knowledge[text]){

        return knowledge[text];

    }

    lastQuestion=text;

    learning=true;

    return "I don't know that yet. Can you teach me?";

}
document.getElementById("userInput").addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        sendMessage();

    }

});
function clearMemory(){

    if(confirm("Delete everything Liminal AI has learned?")){

        localStorage.removeItem("knowledge");

        knowledge = {
            "hello":"Hello!",
            "how are you":"I'm doing great!",
            "what is your name":"I'm Liminal AI."
        };

        addMessage("Memory cleared.","ai");

    }

}