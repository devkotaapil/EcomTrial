// Load styles
const style = document.createElement("style");
style.type = "text/css";
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Reddit+Sans:ital,wght@0,200..900;1,200..900&display=swap');
    #bugs::-webkit-scrollbar {
        display: none;
    }
    #bugs, #bugs * {
        font-family: 'Reddit Sans', sans-serif;
    }
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
`;
document.head.appendChild(style);

// Wait for DOM load
document.addEventListener("DOMContentLoaded", function () {

    // Create main chatbot container
    const chatbot = document.createElement("div");
    chatbot.id = "bugs";
    Object.assign(chatbot.style, {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "space-between",
        background: "#ffffff",
        padding: "10px",
        height: "600px",
        width: "400px",
        outline: "1px solid #e5e5e5",
        zIndex: 999,
        borderRadius: "10px",
        fontFamily: "'Reddit Sans'",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        opacity: 1,
        transition: "opacity 0.3s ease"
    });

    // Header
    const header = document.createElement("div");
    header.id = "header";
    Object.assign(header.style, {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    });

    const headerLeft = document.createElement("div");
    Object.assign(headerLeft.style, {
        display: "flex",
        alignItems: "center",
        gap: "15px"
    });
    const logo = document.createElement("img");
    logo.id = "opener";
    logo.src = "logo.png";
    logo.alt = "Ai Assist Logo";
    logo.height = 40;
    logo.width = 40;
    logo.style.borderRadius = "10px";
    const title = document.createElement("span");
    title.textContent = "Ai Assist";

    headerLeft.appendChild(logo);
    headerLeft.appendChild(title);

    const closeBtn = document.createElement("div");
    closeBtn.id = "close";
    closeBtn.style.cursor = "pointer";
    closeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x">
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
    </svg>
`;


    header.appendChild(headerLeft);
    header.appendChild(closeBtn);
    chatbot.appendChild(header);

    // Chat body
    const chatBody = document.createElement("div");
    chatBody.id = "chatBody";
    Object.assign(chatBody.style, {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        flex: 1,
        overflowY: "auto"
    });

    // Initial help div
    const helpDiv = document.createElement("div");
    helpDiv.id = "help";
    Object.assign(helpDiv.style, {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "10px"
    });
    const helpImg = document.createElement("img");
    helpImg.src = "logo.png";
    helpImg.alt = "ChatLeaf Logo";
    helpImg.height = 60;
    helpImg.width = 60;
    helpImg.style.borderRadius = "10px";
    const helpText = document.createElement("span");
    helpText.style.fontSize = "small";
    helpText.style.color = "#737373";
    helpText.textContent = "Are you looking for something? I can search the entire site in seconds.";
    helpDiv.appendChild(helpImg);
    helpDiv.appendChild(helpText);

    chatBody.appendChild(helpDiv);
    chatbot.appendChild(chatBody);

    // Bottom bar
    const bottomBar = document.createElement("div");
    bottomBar.id = "bottomBar";
    Object.assign(bottomBar.style, {
        background: "#ececec",
        borderRadius: "5px",
        padding: "10px"
    });

    const chatForm = document.createElement("form");
    chatForm.id = "chatForm";
    Object.assign(chatForm.style, {
        display: "flex",
        alignItems: "end"
    });

    const promptInput = document.createElement("textarea");
    promptInput.id = "prompt";
    promptInput.placeholder = "Ask me anything";
    promptInput.maxLength = 250;
    Object.assign(promptInput.style, {
        height: "100px",
        flex: 1,
        fontFamily: "'Reddit Sans'",
        outline: "none",
        border: "none",
        background: "transparent",
        width: "100%",
        resize: "none"
    });

    const sendBtn = document.createElement("button");
    sendBtn.type = "submit";
    Object.assign(sendBtn.style, {
        height: "40px",
        width: "40px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        border: "none",
        padding: "10px",
        borderRadius: "100%",
        outline: "1px solid #e5e5e5"
    });
    sendBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#737373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
        <path d="M6 12h16" />
    </svg>`;

    chatForm.appendChild(promptInput);
    chatForm.appendChild(sendBtn);
    bottomBar.appendChild(chatForm);
    chatbot.appendChild(bottomBar);

    // Floating opener
    const openerFloating = document.createElement("img");
    openerFloating.id = "openerFloating";
    openerFloating.src = "logo.png";
    openerFloating.alt = "Open Chatbot";
    Object.assign(openerFloating.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        height: "60px",
        width: "60px",
        borderRadius: "10px",
        cursor: "pointer",
        zIndex: 1000,
        display: "none",
        opacity: 0,
        transition: "opacity 0.3s ease"
    });

    // Append everything to body
    document.body.appendChild(chatbot);
    document.body.appendChild(openerFloating);

    // ===== CHAT LOGIC =====
    const chat = [];

    // Avatars
    const userAvatar = '<div style="height:40px;width:40px;display:flex;align-items:center;justify-content:center;background:#ece5fe;border-radius:10px;"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg></div>';
    const systemAvatar = '<img src="logo.png" alt="Ai Assist Logo" style="height:40px;width:40px;border-radius:10px;">';

    // Render a message with fade animation
    function renderMessage(msg, delay = 0) {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "flex-start";
        wrapper.style.gap = "10px";
        wrapper.style.opacity = 0;
        wrapper.style.transition = "opacity 0.3s ease";

        if (msg.type === "user") wrapper.style.flexDirection = "row-reverse";

        const avatarDiv = document.createElement("div");
        avatarDiv.innerHTML = msg.type === "user" ? userAvatar : systemAvatar;

        const messageDiv = document.createElement("div");
        messageDiv.style.padding = "10px";
        messageDiv.style.borderRadius = "10px";
        messageDiv.style.maxWidth = "70%";
        messageDiv.style.background = msg.type === "user" ? "#f1f1f1" : "#ece5fe";
        messageDiv.innerHTML = `<p style="margin:0;font-size:small;">${msg.message}</p>`;

        wrapper.appendChild(avatarDiv);
        wrapper.appendChild(messageDiv);

        setTimeout(() => {
            chatBody.appendChild(wrapper);
            chatBody.scrollTop = chatBody.scrollHeight;
            setTimeout(() => wrapper.style.opacity = 1, 10);
        }, delay);
    }

    // Form submit
    chatForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const text = promptInput.value.trim();
        if (!text) return;

        if (helpDiv) helpDiv.remove(); // remove help if first message

        chat.push({ type: "user", message: text });
        renderMessage(chat[chat.length - 1]);

        promptInput.value = "";

        // Simulated system response with 1s animation delay
        setTimeout(() => {
            const sysMsg = { type: "system", message: "System says: " + text.split("").reverse().join("") };
            chat.push(sysMsg);
            renderMessage(sysMsg);
        }, 1000);
    });

    promptInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event("submit"));
        }
    });

    // Hide/show chatbot
    closeBtn.addEventListener("click", () => {
        chatbot.style.opacity = 0;
        setTimeout(() => {
            chatbot.style.display = "none";
            openerFloating.style.display = "block";
            setTimeout(() => openerFloating.style.opacity = 1, 10);
        }, 300);
    });

    openerFloating.addEventListener("click", () => {
        openerFloating.style.opacity = 0;
        setTimeout(() => {
            openerFloating.style.display = "none";
            chatbot.style.display = "flex";
            setTimeout(() => chatbot.style.opacity = 1, 10);
        }, 300);
    });

});

// Detect and wrap URLs in a system message
function autoLinkSystemMessages() {
    const systemMessages = document.querySelectorAll("#chatBody div div p");
    systemMessages.forEach(p => {
        if (p.dataset.linkified) return;
        if (p.parentElement.style.background === "rgb(236, 229, 254)" || p.parentElement.style.background === "#ece5fe") {
            // simple regex for URLs
            const urlRegex = /(\b(https?:\/\/|www\.|[a-z0-9.-]+\.[a-z]{2,})([^\s<]*)\b)/gi;
            p.innerHTML = p.innerHTML.replace(urlRegex, (url) => {
                let href = url;
                if (!/^https?:\/\//i.test(url)) href = 'http://' + url;
                return `<a href="${href}" target="_blank" style="color:#007bff;text-decoration:underline;">${url}</a>`;
            });
            // mark as processed
            p.dataset.linkified = "true";
        }
    });
}

// Call this after rendering a system message
setInterval(autoLinkSystemMessages, 300); // runs every 300ms to catch new messages
