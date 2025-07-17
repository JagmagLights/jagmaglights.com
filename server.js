const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
app.use(express.json());

// Serve static widget file
app.use("/", express.static(path.join(__dirname, "public")));

// Endpoint to proxy chat requests
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const threadRes = await axios.post(
      "https://api.openai.com/v1/threads",
      {},
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    const threadId = threadRes.data.id;
    await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      { role: "user", content: message },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    const runRes = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      { assistant_id: process.env.ASSISTANT_ID },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    // Poll until complete
    let status;
    do {
      await new Promise((r) => setTimeout(r, 500));
      status = await axios.get(
        `https://api.openai.com/v1/threads/${threadId}/runs/${runRes.data.id}`,
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
      );
    } while (status.data.status !== "completed");
    // Fetch reply
    const msgs = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    const last = msgs.data.data[0].content.pop().text.value;
    res.json({ reply: last });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Chat failed" });
  }
});

// Basic health check
app.get("/", (req, res) => res.send("Jagmag Chatbot backend is running"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
