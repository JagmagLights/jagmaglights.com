(() => {
  const bubble = document.createElement("div");
  bubble.style = `
    position: fixed; bottom: 24px; right: 24px;
    width: 56px; height: 56px; border-radius: 50%;
    background: #FFC000; cursor: pointer; z-index:9999;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 2px 8px rgba(0,0,0,0.2);
  `;
  bubble.innerHTML = `<svg width="24" height="24"><circle cx="12" cy="12" r="10" fill="white"/></svg>`;
  document.body.appendChild(bubble);

  const chatBox = document.createElement("div");
  chatBox.style = `
    position: fixed; bottom: 90px; right: 24px;
    width: 320px; max-height: 400px; background: white;
    border-radius: 8px; box-shadow:0 2px 12px rgba(0,0,0,0.2);
    display:none; flex-direction:column; overflow:hidden; z-index:9999;
  `;
  chatBox.innerHTML = `
    <div style="padding:12px; background:#FFC000; color:#000; font-weight:bold;">
      Jagmag Bot
    </div>
    <div id="jagmag-messages" style="flex:1; padding:12px; overflow:auto;"></div>
    <div style="display:flex; border-top:1px solid #eee;">
      <input id="jagmag-input" style="flex:1; border:none; padding:8px;" placeholder="Type a message..." />
      <button id="jagmag-send" style="border:none; padding:8px 12px; background:#FFC000; cursor:pointer;">
        Send
      </button>
    </div>`;
  document.body.appendChild(chatBox);

  bubble.onclick = () => {
    bubble.style.display = "none";
    chatBox.style.display = "flex";
    addMessage("bot", "Hi 👋 I’m Jagmag Bot. How can I help you with lighting today?");
  };
  document.getElementById("jagmag-send").onclick = async () => {
    const input = document.getElementById("jagmag-input");
    const text = input.value.trim();
    if (!text) return;
    addMessage("user", text);
    input.value = "";
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    addMessage("bot", data.reply || "Sorry, something went wrong.");
  };

  function addMessage(sender, text) {
    const container = document.getElementById("jagmag-messages");
    const msg = document.createElement("div");
    msg.style = sender === "bot"
      ? "margin:8px 0; text-align:left;"
      : "margin:8px 0; text-align:right;";
    msg.textContent = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }
})();
