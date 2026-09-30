const chatbotToggle = document.getElementById("chatbotToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");

const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

const conversation = [];

chatbotToggle.addEventListener("click", () => {
    chatWindow.classList.add("active");

    setTimeout(() => {
        chatInput.focus();
    }, 200);
});

chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active");
});

function addMessage(text, sender) {
    const message = document.createElement("div");

    message.classList.add(
        "message",
        sender === "user" ? "user-message" : "bot-message"
    );

    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    bubble.textContent = text;

    message.appendChild(bubble);
    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    const message = document.createElement("div");
    message.id = "typingMessage";
    message.classList.add("message", "bot-message");

    message.innerHTML = `
        <div class="message-bubble typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById("typingMessage");

    if (typing) {
        typing.remove();
    }
}

async function sendMessage() {
    const userMessage = chatInput.value.trim();

    if (!userMessage) {
        return;
    }

    addMessage(userMessage, "user");
    chatInput.value = "";
    sendButton.disabled = true;
    chatInput.disabled = true;
    showTyping();

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: userMessage,
                history: conversation,
            }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.error || `Chat API Error: ${response.status}`);
        }

        const botReply = data.reply;

        if (!botReply) {
            throw new Error("Gemini returned an empty response.");
        }

        conversation.push({ role: "user", text: userMessage });
        conversation.push({ role: "model", text: botReply });

        hideTyping();
        addMessage(botReply, "bot");
    } catch (error) {
        console.error("Chatbot Error:", error);
        hideTyping();
        addMessage(
            "Sorry, I couldn't connect to Gemini right now. Please try again.",
            "bot"
        );
    }

    sendButton.disabled = false;
    chatInput.disabled = false;
    chatInput.focus();
}

sendButton.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});
