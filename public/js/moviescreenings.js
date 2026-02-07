document.addEventListener("DOMContentLoaded", async () => {
  const movieId = document.body.dataset.movieId;
  if (!movieId) return;

  const dateSelect = document.getElementById("dateSelect");
  const timeSelect = document.getElementById("timeSelect");
  const selectedRoom = document.getElementById("selectedRoom");

  if (!dateSelect || !timeSelect || !selectedRoom) {
    console.error("Saknar HTML-element för biljett-rutan");
    return;
  }

  const res = await fetch(`/api/movies/${movieId}/screenings`);

if (!res.ok) {
  console.error("API error:", await res.text());
  return;
}

const screenings = await res.json();


  const byDate = {};
  screenings.forEach(s => {
    const date = s.start_time.split("T")[0];
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(s);
  });

  Object.keys(byDate).forEach(date => {
    const opt = document.createElement("option");
    opt.value = date;
    opt.textContent = new Date(date).toLocaleDateString("sv-SE", {
      weekday: "long",
      day: "numeric",
      month: "short"
    });
    dateSelect.appendChild(opt);
  });

  dateSelect.addEventListener("change", () => {
    timeSelect.innerHTML = "";
    selectedRoom.textContent = "";

    const selectedDate = dateSelect.value;
    if (!selectedDate) return;

    byDate[selectedDate].forEach(s => {
      const time = new Date(s.start_time).toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit"
      });

      const btn = document.createElement("button");
      btn.className = "time-btn";
      btn.textContent = time;

      btn.addEventListener("click", () => {
        document.querySelectorAll(".time-btn")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        selectedRoom.textContent = `Salong: ${s.room}`;
      });

      timeSelect.appendChild(btn);
    });
  });
});
