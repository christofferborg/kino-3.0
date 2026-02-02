const BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";

export async function fetchScreeningsFromCMS() {
  const url = `${BASE}/screenings?populate=movie&pagination[pageSize]=200`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`CMS error: ${res.status}`);
  }

  return res.json(); // { data, meta }
}
