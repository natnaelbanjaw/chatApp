// const moment = require('moment');

document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    const clientsTotal = document.getElementById("clients-total");
    const messageContainer = document.getElementById("message-container");
    const nameInput = document.getElementById("name-input");
    const messageForm = document.getElementById("message-form");
    const messageInput = document.getElementById("message-input");

const messageTone = new Audio("/messageTone.mp3")

    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessage();
    });

    socket.on("clients-total", (data) => {
        clientsTotal.innerText = `Total clients: ${data}`;
    });

    function sendMessage() {
        if (messageInput.value === " ") return;
        // console.log(messageInput.value);
        const data = {
            name: nameInput.value,
            message: messageInput.value,
            dateTime: new Date()
        };

        socket.emit("message", data);

        addMessagetoUI(true, data);
        messageInput.value = " ";
    }

    socket.on("chat-Message", (data) => {
        // console.log(data);
messageTone.play();

        addMessagetoUI(false, data);
    });

    function addMessagetoUI(isOwnMessage, data) {
        clearFeedback();
        // console.log(data);
        const element = `
            <li class="${isOwnMessage ? "message-right" : "message-left"}">
                <p class="message">
        ${ data.message }            
        <span>${data.name} |${(data.dateTime)}</span>
                </p>
            </li>
        `;

        messageContainer.innerHTML += element;

        scrollToBottom()
    }

    
function scrollToBottom(){
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

 messageInput.addEventListener("focus", (e)=>{
socket.emit("feedback", { 
    feedback: `✍️ ${ nameInput.value} is typing a message`,
})
 })

 messageInput.addEventListener("keypress", (e)=>{
    socket.emit("feedback", { 
        feedback: `✍️ ${ nameInput.value} is typing a message`,
    })
 })

 messageInput.addEventListener("blur", (e)=>{
    socket.emit("feedback", { 
        feedback: ` `,
    }) 
 })

socket.on("feedback", (data) => {
    clearFeedback(); // Clear any existing feedback messages

    const feedbackElement = document.createElement("li");
    feedbackElement.classList.add("message-feedback");
    feedbackElement.innerHTML = `
        <p class="feedback" id="feedback">
            ${data.feedback}
        </p>
    `;

    messageContainer.appendChild(feedbackElement); // Add the feedback message to the container
});

    function clearFeedback() {
        document.querySelectorAll("li.message-feedback").forEach(element => {
            element.parentNode.removeChild(element);
        });
    }

});
