const messages = document.getElementById("messages");

function addMessage(text, sender){

    let div = document.createElement("div");

    div.className = sender;

    div.innerHTML = text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

function sendMessage(){

    let input = document.getElementById("userInput");

    let text = input.value.trim();

    if(text == "") return;

    addMessage(text,"user");

    input.value="";

    let reply = think(text);

    setTimeout(function(){

        addMessage(reply,"ai");

    },500);

}

function think(text){

    text = text.toLowerCase();

    if(text=="hello")
        return "Hello!";

    if(text=="how are you")
        return "I'm doing great!";

    if(text=="what is your name")
        return "I'm Liminal AI.";

    return "I don't know the answer yet.";
}