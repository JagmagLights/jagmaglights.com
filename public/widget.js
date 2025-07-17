
<style>
  #jagmag-launcher {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
  }

  .jagmag-bubble {
    background-color: #ffffff;
    border: 2px solid #F1CF54;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .jagmag-bubble img {
    width: 32px;
    height: 32px;
  }

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
    font-family: "Poppins", sans-serif;
    font-size: 0.9rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;
  }

  .jagmag-options a img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  #jagmag-chat-frame {
    position: fixed;
    bottom: 100px;
    right: 24px;
    width: 360px;
    height: 500px;
    border-radius: 16px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
    display: none;
    z-index: 9999;
  }

  #jagmag-minimize {
    position: absolute;
    top: 10px;
    right: 16px;
    font-size: 1rem;
    cursor: pointer;
    background: none;
    border: none;
    color: #000;
  }
</style>

<div id="jagmag-launcher">
  <div class="jagmag-options" id="jagmag-options">
    <a href="https://wa.me/917251000007?text=Hi+Jagmag+Lights" target="_blank">
      <img src="https://cdn.shopify.com/s/files/1/0876/6137/9869/files/Whatsapp_SVG.svg?v=1722281734" alt="WhatsApp"> WhatsApp
    </a>
    <a href="javascript:void(0);" onclick="toggleJagmagChat()">
      <img src="https://cdn.shopify.com/s/files/1/0876/6137/9869/files/Ai-chatbot.png?v=1752777342" alt="Chatbot"> Chat with AI
    </a>
  </div>
  <div class="jagmag-bubble" onclick="toggleJagmagOptions()">
    <img src="https://cdn.shopify.com/s/files/1/0876/6137/9869/files/Ai-chatbot.png?v=1752777342" alt="Assistant">
  </div>
</div>

<iframe
  id="jagmag-chat-frame"
  src="https://jagmaglights-com.vercel.app/"
  frameborder="0"
></iframe>

<script>
  const options = document.getElementById("jagmag-options");
  const frame = document.getElementById("jagmag-chat-frame");

  function toggleJagmagOptions() {
    options.style.display = options.style.display === "flex" ? "none" : "flex";
  }

  function toggleJagmagChat() {
    frame.style.display = "block";
    options.style.display = "none";
  }

  document.addEventListener("click", (e) => {
    if (e.target.id === "jagmag-minimize") {
      frame.style.display = "none";
    }
  });
</script>

