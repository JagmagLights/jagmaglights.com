// public/widget.js
(function(){
  // 1) Load the Assistants embed library
  const lib = document.createElement('script');
  lib.src = 'https://cdn.jsdelivr.net/npm/@openai/assistants-js@latest';
  lib.onload = initializeJagmag;
  document.head.appendChild(lib);

  function initializeJagmag() {
    // 2) Create overlay backdrop
    const backdrop = document.createElement('div');
    Object.assign(backdrop.style, {
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.4)',
      display: 'none', zIndex: 10001
    });
    document.body.appendChild(backdrop);

    // 3) Create chat container
    const chat = document.createElement('div');
    Object.assign(chat.style, {
      position: 'fixed',
      bottom: '20px', right: '20px',
      width: '360px', height: '500px',
      background: '#fff', borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      overflow: 'hidden', display: 'none', zIndex: 10002
    });
    document.body.appendChild(chat);

    // 4) Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerText = '×';
    Object.assign(closeBtn.style, {
      position: 'absolute', top: '8px', right: '12px',
      background: 'transparent', border: 'none',
      fontSize: '1.5rem', cursor: 'pointer'
    });
    closeBtn.onclick = () => {
      chat.style.display = 'none';
      backdrop.style.display = 'none';
    };
    chat.appendChild(closeBtn);

    // 5) Target element for embed
    const root = document.createElement('div');
    root.id = 'assistant-root';
    Object.assign(root.style, {
      position: 'absolute', top: '0', left: '0',
      width: '100%', height: '100%'
    });
    chat.appendChild(root);

    // 6) Initialize the assistant
    Assistants.embed({
      assistantId: "asst_L4plcsTUXegliBe0CNoFUfI3",
      projectKey: process.env.OPENAI_API_KEY || '', // handled on server side
      targetElement: root
    });

    // 7) Expose open method
    window.JagmagWidget = {
      open: () => {
        backdrop.style.display = 'block';
        chat.style.display = 'block';
      }
    };
  }
})();
