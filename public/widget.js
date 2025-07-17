// public/widget.js
(function() {
  // 1️⃣ Create chat container (hidden by default)
  const chatContainer = document.createElement('div');
  chatContainer.id = 'jagmag-widget-container';
  Object.assign(chatContainer.style, {
    position: 'fixed', bottom: '100px', right: '20px',
    width: '360px', height: '500px',
    background: '#fff', border: '1px solid #e0e0e0',
    borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    display: 'none', zIndex: '10000', overflow: 'hidden'
  });

  // 2️⃣ Close button inside chat
  const closeBtn = document.createElement('button');
  closeBtn.innerText = '×';
  Object.assign(closeBtn.style, {
    position: 'absolute', top: '8px', right: '12px',
    background: 'transparent', border: 'none',
    fontSize: '1.5rem', cursor: 'pointer', zIndex: '10001'
  });
  closeBtn.onclick = () => chatContainer.style.display = 'none';
  chatContainer.appendChild(closeBtn);

  // 3️⃣ Iframe pointing to your backend chat UI route
  const iframe = document.createElement('iframe');
  iframe.src = '/chat-widget';  // See note below
  iframe.style = 'width:100%;height:100%;border:none;';
  chatContainer.appendChild(iframe);

  // 4️⃣ Add container to page
  document.body.appendChild(chatContainer);

  // 5️⃣ Expose open/close methods
  window.JagmagWidget = {
    open: () => chatContainer.style.display = 'block',
    close: () => chatContainer.style.display = 'none'
  };
})();
