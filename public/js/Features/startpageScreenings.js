export function initStartpageScreenings() {
  const container = document.querySelector("#screenings");
  if (!container) return;

  renderLoading(container);
  loadScreenings(container);
}

function renderLoading(container) {
  container.innerHTML = `
  <div class="loading"></div>
  <div class="loading"></div>
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
  const formattedDate = new Date(yyyyMmDd + "T00:00:00");
  return formattedDate.toLocaleDateString("sv-SE", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(iso) {
  const formattedTime = new Date(iso);
  return formattedTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderScreeningItem(screening) {
  const title = screening.movie?.title ?? "Okänd film";
  const time = formatTime(screening.startsAt);
  const poster = screening.movie?.poster || "";

  const posterHtml = poster
    ? `<img class="screening-poster" src="${poster}" alt="${escapeHtml(title)} poster" loading="lazy">`
    : `<div class="screening-poster screening-poster--placeholder"></div>`;

  const roomHtml = screening.room
    ? `<div class="screening-room">${escapeHtml(screening.room)}</div>`
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

async function loadScreenings(container) {
  try {
    const res = await fetch("/api/screenings?days=5&limit=10");
    if (!res.ok) throw new Error("Api error");

    const data = await res.json();
    if (!data.days?.length) {
      container.innerHTML = renderEmptyState();
      return;
    }
    container.innerHTML = data.days.map(renderDayCard).join("");
  } catch (error) {
    container.innerHTML = renderErrorState();
  }
}

function renderDayCard(day) {
  const dateLabel = formatDate(day.date);

  const itemsHtml = (day.screenings ?? [])
    .map((screening) => renderScreeningItem(screening))
    .join("");

  return `
    <article class="day-card">
      <h3 class="day-card__title">Dag <span>${escapeHtml(dateLabel)}</span></h3>
      ${itemsHtml}
    </article>
  `;
}
