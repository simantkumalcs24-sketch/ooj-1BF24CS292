// Sidebar toggle
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuBtn = document.getElementById('menuBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    menuBtn.onclick = () => { sidebar.classList.toggle('active'); overlay.classList.toggle('active'); };
    overlay.onclick = () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); };
    logoutBtn.onclick = () => {
  window.location.href = "loginpage.html";
};


    // Greeting
    const hr = new Date().getHours();
    const greeting = document.getElementById("daily-greeting");
    if (hr < 12) greeting.textContent = "☀️ Good morning, ready to start your day with knowledge?";
    else if (hr < 18) greeting.textContent = "🌤️ Good afternoon, keep your curiosity alive!";
    else greeting.textContent = "🌙 Good evening, a great time to learn before rest.";

    // Quotes
    const quotes = [
      "“An investment in knowledge pays the best interest.” — Benjamin Franklin",
      "“The beautiful thing about learning is that no one can take it away from you.” — B.B. King",
      "“Education is the passport to the future.” — Malcolm X",
      "“Learning never exhausts the mind.” — Leonardo da Vinci",
      "“The expert in anything was once a beginner.” — Helen Hayes"
    ];

    let qi = 0;
    const quoteBox = document.getElementById("quote-box");
    setInterval(() => {
      qi = (qi + 1) % quotes.length;
      quoteBox.textContent = quotes[qi];
    }, 8000);


/* ==========================================
      FETCH FROM BACKEND (NO API KEY HERE)
==========================================*/
async function getDailyContent() {
  try {
    const res = await fetch("http://localhost:3000/api/daily");
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Backend error:", err);
    return null;
  }
}


/* ==========================================
        LOAD FROM CACHE OR FETCH
==========================================*/
async function loadDailyContent() {
  const cache = localStorage.getItem("dailyAI");

  // If cached data exists → show it first (fast)
  if (cache) {
    try {
      const c = JSON.parse(cache);
      document.getElementById("ai-daily-word").textContent = c.word;
      document.getElementById("ai-random-fact").textContent = c.fact;
      document.getElementById("ai-tech-tip").textContent = c.tech;
      document.getElementById("ai-motivation").textContent = c.genre;
      return;
    } catch {}
  }

  // If no cache → show loading + fetch
  await refreshDailyContent();
}

/* ==========================================
         REFRESH DAILY CONTENT (Button)
==========================================*/
async function refreshDailyContent() {
  // Loading state
  document.getElementById("ai-daily-word").textContent = "Loading...";
  document.getElementById("ai-random-fact").textContent = "Loading...";
  document.getElementById("ai-tech-tip").textContent = "Loading...";
  document.getElementById("ai-motivation").textContent = "Loading...";

  const data = await getDailyContent();

  if (!data) {
    document.getElementById("ai-daily-word").textContent = "Error";
    document.getElementById("ai-random-fact").textContent = "Error";
    document.getElementById("ai-tech-tip").textContent = "Error";
    document.getElementById("ai-motivation").textContent = "Error";
    alert("❌ Could not fetch AI content. Check backend.");
    return;
  }

  // Update UI
  document.getElementById("ai-daily-word").textContent = data.word;
  document.getElementById("ai-random-fact").textContent = data.fact;
  document.getElementById("ai-tech-tip").textContent = data.tech;
  document.getElementById("ai-motivation").textContent = data.genre;

  // Save to cache
  localStorage.setItem("dailyAI", JSON.stringify(data));

  alert("✨ Daily content refreshed!");
}


/* ==========================================
              MODALS + AI EXPLAINER
==========================================*/
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

async function explainAI(text) {
  try {
    const res = await fetch("http://localhost:3000/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    return data.explanation ?? "Error.";
  } catch {
    return "Error loading explanation.";
  }
}

async function learnMoreAboutWord() {
  openModal("wordModal");
  wordModalContent.textContent = await explainAI(
    document.getElementById("ai-daily-word").textContent
  );
}

async function learnMoreAboutFact() {
  openModal("factModal");
  factModalContent.textContent = await explainAI(
    document.getElementById("ai-random-fact").textContent
  );
}

async function learnMoreTech() {
  openModal("techModal");
  techModalContent.textContent = await explainAI(
    document.getElementById("ai-tech-tip").textContent
  );
}

async function learnMoreGenre() {
  openModal("genreModal");
  genreModalContent.textContent = await explainAI(
    document.getElementById("ai-motivation").textContent
  );
}


/* ==========================================
          RUN ON PAGE LOAD
==========================================*/
loadDailyContent();
