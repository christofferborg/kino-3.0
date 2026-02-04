document.addEventListener("DOMContentLoaded", () => {
  initStartpageScreenings();
});

async function initStartpageScreenings() {
  const root = document.querySelector("#screenings");
  if (!root) return;

  root.innerHTML = `
    <div class="skeleton"></div>
    <div class="skeleton"></div>
  `;

  try {
    const res = await fetch("/api/screenings?upcoming=true&days=5&limit=10");
    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    if (!data.days?.length) {
      root.innerHTML = renderEmptyState();
      return;
    }

    root.innerHTML = data.days.map(renderDayCard).join("");
  } catch (e) {
    root.innerHTML = renderErrorState();
  }
}

function renderDayCard(day) {
  const dateLabel = formatDate(day.date);

  const itemsHtml = (day.screenings ?? [])
    .map((s) => renderScreeningItem(s))
    .join("");

  return `
    <article class="day-card">
      <h3 class="day-card__title">Dag <span>${escapeHtml(dateLabel)}</span></h3>
      ${itemsHtml}
    </article>
  `;
}

function renderScreeningItem(s) {
  const title = s.movie?.title ?? "Okänd film";
  const time = formatTime(s.startsAt);

  const poster = s.movie?.poster || "";
  const posterHtml = poster
    ? `<img class="screening-poster" src="${poster}" alt="${escapeHtml(title)} poster" loading="lazy">`
    : `<div class="screening-poster screening-poster--placeholder"></div>`;

  const roomHtml = s.room
    ? `<div class="screening-room">${escapeHtml(s.room)}</div>`
    : "";

  return `
    <div class="screening-item">
      ${posterHtml}
      <div class="screening-meta">
        <div class="screening-time">${escapeHtml(time)}</div>
        <div class="screening-title">${escapeHtml(title)}</div>
        ${roomHtml}
      </div>
    </div>
  `;
}

function renderEmptyState() {
  return `
    <div class="state">
      <h3 class="state__title">Inga kommande visningar just nu</h3>
      <p class="state__text">Kolla gärna igen senare – vi uppdaterar löpande.</p>
    </div>
  `;
}

function renderErrorState() {
  return `
    <div class="state state--error">
      <h3 class="state__title">Kunde inte ladda visningar</h3>
      <p class="state__text">Försök igen om en stund.</p>
    </div>
  `;
}

function formatDate(yyyyMmDd) {
  const d = new Date(yyyyMmDd + "T00:00:00");
  return d.toLocaleDateString("sv-SE", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
