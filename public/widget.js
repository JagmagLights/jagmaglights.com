<!-- Jagmag Lights Chat Launcher & Chatbox -->
<style>
  :root {
    --jag-primary: #FFC000;
    --jag-secondary: #F1CF54;
    --jag-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
               Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  /* Launcher */
  #jagmag-launcher {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 10000;
    font-family: var(--jag-font);
  }
  .jagmag-bubble {
    background-color: #ffffff;
    border: 2px solid var(--jag-secondary);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s;
  }
  .jagmag-bubble:hover { transform: scale(1.1); }
  .jagmag-bubble img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  /* Option menu */
  .jagmag-options {
    position: absolute;
    bottom: 70px;
    right: 0;
    display: none;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
  }
  .jagmag-options a {
    display: flex;
    align-items: center;
    background-color: #FAFAFA;
    color: #000;
    padding: 8px 12px;
    border-radius: 12px;
    text-decoration: none;
    font-size: 0.9rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    transition: background 0.2s, transform 0.2s;
  }
  .jagmag-options a:hover {
    background-color: var(--jag-secondary);
    transform: translateY(-2px);
  }
  .jagmag-options img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    object-fit: contain;
  }

  /* Chat iframe container */
  .jag-chat-container {
    position: fixed;
    bottom: 100px;
    right: 24px;
    width: 360px;
    height: 500px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    display: none;
    z-index: 9999;
    overflow: hidden;
  }
  .jag-close-chat {
    position: absolute;
    top: 8px;
    right: 12px;
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #333;
    z-index: 10;
  }
  .jag-chat-frame {
    width: 100%;
    height: 100%;
    border: none;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .jag-chat-container {
      width: 90vw;
      height: 80vh;
      right: 5vw;
      bottom: 80px;
    }
  }
</style>

<div id="jagmag-launcher">
  <div class="jagmag-options" id="jagmag-options">
    <a href="https://wa.me/917251000007?text=Hi+Jagmag+Lights" target="_blank">
      <img src="https://cdn.shopify.com/s/files/1/0876/6137/9869/files/Whatsapp_SVG.svg?v=1722281734"
           alt="WhatsApp" width="20" height="20">
      Talk on WhatsApp
    </a>
    <a href="javascript:void(0);" onclick="openJagmagAI()">
      <img src="https://cdn.shopify.com/s/files/1/0876/6137/9869/files/Ai-chatbot.png?v=1752777342"
           alt="AI Chatbot" width="20" height="20">
      Chat with AI
    </a>
  </div>
  <div class="jagmag-bubble" onclick="toggleJagmagOptions()">
    <img src="https://cdn.shopify.com/s/files/1/0876/6137/9869/files/Ai-chatbot.png?v=1752777342"
         alt="Open chat" width="32" height="32">
  </div>
</div>

<div class="jag-chat-container" id="jag-chatbox">
  <button class="jag-close-chat" onclick="toggleJagmagChat(false)">&times;</button>
  <iframe class="jag-chat-frame"
          src="https://jagmaglights-com.vercel.app/widget.html"
          title="Jagmag AI Chat"></iframe>
</div>

<script>
  const optionsMenu = document.getElementById('jagmag-options');
  const chatBox = document.getElementById('jag-chatbox');

  function toggleJagmagOptions() {
    optionsMenu.style.display = optionsMenu.style.display === 'flex' ? 'none' : 'flex';
  }

  function openJagmagAI() {
    // Hide the options and show chat directly
    optionsMenu.style.display = 'none';
    toggleJagmagChat(true);
  }

  function toggleJagmagChat(show) {
    chatBox.style.display = show ? 'block' : 'none';
  }

  // Also close if iframe sends a postMessage
  window.addEventListener('message', e => {
    if (e.data === 'MINIMIZE_CHAT') toggleJagmagChat(false);
  });
</script>
