// Fetch daily content from backend
async function getDailyContent() {
  try {
    const res = await fetch("http://localhost:3000/api/daily-content", {
      method: "POST"
    });

    return await res.json();
  }
  catch (err) {
    console.error("AI content error:", err);
    return null;
  }
}

// Explain button popup
async function explainAI(text) {
  try {
    const res = await fetch("http://localhost:3000/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    return (await res.json()).content;
  }
  catch {
    return "Error loading details.";
  }
}
