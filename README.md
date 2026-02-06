# Kino-hemsida# kino-3.0

Här finns sidan deployad:
https://kino-3-0.onrender.com/

För att visa sidan korrekt behöver du en API-nyckel. Ansök om den här:

https://www.omdbapi.com/apikey.aspx

Ni lägger sen er nyckel i filen .env

MIRO-BRÄDA
https://miro.com/welcomeonboard/azJYLzhqdHhhQTM1aHpCZ2hISmpzeWtoNjVVOUM2cVJ3cEZ0b[…]BS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=364815024703

MöTESANTECKNINGAR

26-01-27

Delade upp uppgifterna, kom överrens om att skriva sina egna kort i trello kopplat till sina uppgifter.
Pratade förhållningsergler i projketet som vi ska hålla oss till.
Bokade in nästa möte där vi skulle gå igenom hela API-grejen.

26-01-29
Kevin magsjuk och kunde därav inte delta i mötet idag.

Gjorde routes till dom nya API:erna.
gjorde en "mental-image" på miro hur APIerna ska vara uppdelade.
Skapade dessa mappar.
Gjorde wireframe av hur desigenen ska se ut i Miro.

26-01-30
Vi har i gruppen kommit fram till hur vi ska gå till väga med "Designa API".
Vi har kommit fram med en mall för endpoint och beskrivningar, finns i miro.
Gått igenom en del designval för projektet. Designval för hur betyg och knappar ska se ut.

26-02-02
Christoffer migrän och kunde därav inte delta i mötet idag.
Standup möte, uppföljning hur alla ligger till.
Diskussion som CMS som tog vidare till nästa möte.

26-02-03
Idag tog vi beslut hur vi ska göra med CMS och APIet.
Vi har tagit bort en regel från vårt arbetssätt. Regeln där en person granskade koden och en annan testade det. Från och med nu ska en och samma person granska och testa PR.

26-02-03
Lenson och Kevin var frånvarande.
Vi har stämt av i gruppen hur det går för alla. Sedan har vi diskuterat hur vi skriver dokumentationen för vårt REST API så att det är kort men koncist.

26-02-06
Alla närvarande. Slutfix samt ändrat buildkommando för sass till npm run build.
Pratat igenom API dokumentationen. 
Gått igenom några PR och frågetecken om uppgifter. Kollat så att befintliga funktioner fungerar.


### API Documentation

## Screenings:

`GET /api/screenings`

Example request:

`GET /api/screenings?days=5&limit=10`

Returns upcoming screenings for the start page, grouped by day.

## Query parameters (optional)

- days (number)  
  Number of calendar days forward from today to include.  
  Default: 5  
  Max: 5 (values above 5 will be clamped down to 5)

- limit (number)  
  Maximum number of screenings returned in total.  
  Default: 10  
  Max: 10 (values above 10 will be clamped down to 10)

## Notes

- Only screenings with start_time >= current time are included
- Only screenings within the next five calendar days (including today) are included
- Screenings are sorted by start_time ascending before grouping and limiting
- Screenings are grouped by date (YYYY-MM-DD)
- A maximum of 10 screenings is returned in total
- Screenings are not cut in the middle of a day:
  - only full days are included as long as the total number of screenings does not exceed the limit
- Special case:
  - if the first day alone contains more than 10 screenings, 10 screenings from that day are returned

## Response

Success (200)  
Content-Type: application/json

### Response body (JSON)

```json
{
  "days": [
    {
      "date": "2026-02-06",
      "screenings": [
        {
          "id": 42,
          "startsAt": "2026-02-06T18:00:00.000Z",
          "room": "Salong A",
          "movie": {
            "id": 7,
            "title": "Movie title",
            "poster": "/uploads/poster.jpg"
          }
        }
      ]
    }
  ],
  "total": 1
}

Field types

- days (array)
  List of day objects

- date (string)
  Date in format YYYY-MM-DD

- screenings (array)
  List of screening objects for the given day

- id (number)
  Screening id

- startsAt (string | null)
  ISO 8601 datetime string

- room (string | null)
  Cinema room

- movie (object | null)
  - id (number)
    Movie id
  - title (string)
    Movie title
  - poster (string)
    Poster image URL

- total (number)
  Total number of screenings returned across all days (after applying limit)

Error (500)

Content-Type: application/json

{
  "error": "Could not load screenings"
}
```

# Movie Rating API

Resurs som används för att hämta ett genomsnittligt betyg för en specifik film baserat på ID.

## Request Format
* **Metod:** `GET`
* **Endpoint:** `/api/movies/:id/rating`

---

## Logik för beräkning
Systemet väljer automatiskt datakälla baserat på antalet verifierade recensioner i biografens CMS:

* **Lokalt betyg:** Om filmen har **5 eller fler** verifierade recensioner används genomsnittet av dessa.
* **IMDb-betyg:** Om filmen har **färre än 5** verifierade recensioner hämtas istället filmens officiella betyg från IMDb.

---

## Response Format
Vid ett lyckat anrop returneras ett JSON-objekt enligt följande form:

```json
{
  "rating": 3.4,
  "source": "local"
}
```

---

## Response Statuskoder

* **200 OK** – **Betyg kunde hämtas.** Anropet lyckades och det beräknade betyget returnerades korrekt.
* **400 Bad Request** – **Ogiltigt Movie-ID.** ID-parametern saknas, har fel format eller är inte ett giltigt nummer.
* **500 Internal Server Error** – **Betyg kunde inte beräknas.** Ett oväntat fel uppstod på servern eller vid kommunikation med externa tjänster (Strapi/OMDb).
