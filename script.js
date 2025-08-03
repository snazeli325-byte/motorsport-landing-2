// ===== ЯЗЫК =====
const langToggle = document.getElementById("lang-toggle");
const langEn = document.getElementById("lang-en");
const langRu = document.getElementById("lang-ru");

function setLanguage(lang) {
  if (lang === "ru") {
    langRu.style.display = "block";
    langEn.style.display = "none";
  } else {
    langEn.style.display = "block";
    langRu.style.display = "none";
  }
  langToggle.textContent = "🇬🇧 English / Русский 🇷🇺";
  localStorage.setItem("lang", lang);
}

const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);

langToggle.addEventListener("click", () => {
  const currentLang = localStorage.getItem("lang") || "en";
  const newLang = currentLang === "en" ? "ru" : "en";
  setLanguage(newLang);
});

// ===== ОБРАТНЫЙ ОТСЧЁТ =====
function startCountdown(targetDate) {
  const daysEls = document.querySelectorAll("#days");
  const hoursEls = document.querySelectorAll("#hours");
  const minutesEls = document.querySelectorAll("#minutes");
  const secondsEls = document.querySelectorAll("#seconds");
  const timerEls = document.querySelectorAll("#timer");

  function updateTimer() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      timerEls.forEach(el => el.textContent = "Race Started!");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEls.forEach(el => el.textContent = String(days).padStart(2, '0'));
    hoursEls.forEach(el => el.textContent = String(hours).padStart(2, '0'));
    minutesEls.forEach(el => el.textContent = String(minutes).padStart(2, '0'));
    secondsEls.forEach(el => el.textContent = String(seconds).padStart(2, '0'));
  }

  updateTimer();
  const interval = setInterval(updateTimer, 1000);
}

const nextRaceDate = new Date(2025, 7, 10, 18, 0, 0); // 10 августа 2025 18:00
startCountdown(nextRaceDate);

// ===== ФОРМА РЕГИСТРАЦИИ =====
const eventForm = document.getElementById("eventForm");
if (eventForm) {
  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Собираем данные формы
    const formData = new FormData(eventForm);
    const data = Object.fromEntries(formData.entries());

    // Валидация (можно расширить)
    if (!data.name || !data.email || !data.event || !data.language) {
      alert("Please fill all fields.");
      return;
    }

    // Просто пока что выводим в консоль
    console.log("Registration Data:", data);
    alert("Thank you for registering, " + data.name + "!");

    eventForm.reset();
  });
}
