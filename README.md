# 🌍 Earth's Last Letter

> *"The planet writes you a personal letter — from your birth year to 2050."*
---

## What Is This?

**Earth's Last Letter** is an AI-powered web app where Earth — the planet itself — writes you a deeply personal, poetic letter based on the year you were born and the city you grew up in.

Every letter is unique. Every letter is grounded in **real climate data**. Every letter is written as if Earth is an ailing parent writing to a child it loves but is slowly losing the strength to sustain.

You enter your city and birth year. Earth remembers the rest.

---

## ✨ Features

- 🌿 **Hyper-personalized letters** — Every output is unique to your exact city + birth year combination. No two letters are the same.
- 📊 **Real climate data** — CO₂ levels at your birth year (Mauna Loa historical data), current CO₂ levels, temperature anomaly data from Open-Meteo, and city-specific climate context.
- 🗺️ **City-aware AI** — The letter references actual local phenomena: Mumbai's monsoons, London's changing winters, Delhi's heat islands, coastal sea-level changes — not generic "the planet is warming" language.
- ✉️ **Beautiful letter UI** — Aged parchment design, typewriter reveal animation, postmark stamp with your city and birth year.
- 📋 **One-click sharing** — Copy your letter or share directly to X (Twitter) with a pre-filled message.
- 📱 **Fully responsive** — Works on mobile, tablet, and desktop.

---

## 🚀 Live Demo

👉 **[Try it here → your-app-url.vercel.app](https://your-app-url.vercel.app)**

**Sample inputs to try:**
| City | Birth Year | What to expect |
|------|-----------|----------------|
| Mumbai | 1995 | Monsoon memories, Arabian Sea warming, heat island crisis |
| London | 1988 | Changing seasons, Thames flooding, oak forests |
| New York | 2000 | Hurricane patterns, Hudson River, coastal erosion |
| Delhi | 1990 | Air quality history, Yamuna river, extreme heat |

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React + Vite | Fast, modern, no build complexity |
| Styling | Tailwind CSS | Rapid UI without fighting CSS |
| AI | Google Gemini 2.0 Flash | Best creative writing quality, free tier available |
| Climate Data | Open-Meteo API | Free, no API key needed, historical + current data |
| CO₂ Data | Mauna Loa historical dataset | Hardcoded from real NOAA measurements |
| Geocoding | Open-Meteo Geocoding API | Free city → lat/lon lookup |
| Deployment | Vercel | Free, instant, global CDN |

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- A free Google Gemini API key → [Get one here](https://aistudio.google.com/app/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/SimranShaikh20/EarthsWhisper.git
cd earths-last-letter

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Environment Variables (optional)

If you want to pre-fill the Gemini API key instead of users entering it:

```env
VITE_GEMINI_API_KEY=your_key_here
```

> ⚠️ Only do this if you're running a private instance. For public apps, users should provide their own key.

---

## 🏗️ Project Structure

```
earths-last-letter/
├── src/
│   ├── App.jsx              # Main app component
│   ├── components/
│   │   ├── InputCard.jsx    # City + year + API key form
│   │   ├── LoadingState.jsx # Animated loading with rotating messages
│   │   ├── DataPills.jsx    # CO₂ data badges
│   │   ├── LetterDisplay.jsx # Parchment letter with typewriter effect
│   │   └── ActionButtons.jsx # Copy, share, reset
│   ├── utils/
│   │   ├── gemini.js        # Gemini API call + prompt builder
│   │   ├── geocoding.js     # Open-Meteo geocoding
│   │   └── climate.js       # CO₂ data map + calculations
│   └── main.jsx
├── public/
├── index.html
├── vercel.json
├── package.json
└── README.md
```

---

## 🧠 How It Works

```
User Input (city + year)
        ↓
Open-Meteo Geocoding API
→ converts city name to coordinates + country
        ↓
CO₂ Data Lookup
→ historical Mauna Loa readings matched to birth year
        ↓
Prompt Builder
→ assembles 6-paragraph structured prompt with all real data
        ↓
Google Gemini 2.0 Flash
→ generates personalized, emotionally grounded letter
        ↓
Typewriter Reveal Animation
→ letter appears character by character on parchment card
```

---

## 📊 Real Data Sources

| Data Point | Source | Notes |
|-----------|--------|-------|
| CO₂ at birth year | NOAA Mauna Loa Observatory | Measurements from 1950 onwards |
| CO₂ today | NOAA 2025 reading | 424 ppm |
| Temperature anomaly | Open-Meteo Climate API | Historical gridded data |
| City coordinates | Open-Meteo Geocoding | Free, no auth required |
| City-specific climate context | Gemini's knowledge | Monsoons, sea level, local ecosystems |

---

## 🎨 Design Decisions

**Why dark navy + forest green?**
The color palette mirrors looking at Earth from space at night — the deep dark of the cosmos, the green pulse of life. It makes the parchment letter "pop" as if it's the only warm light in the dark.

**Why parchment for the letter?**
A letter from a 4.5 billion year old planet should feel ancient. The warm cream texture, the handwriting-style signature, the postmark stamp — all signal that what you're reading is not an AI output. It's correspondence.

**Why typewriter animation?**
Earth writes slowly. The reveal animation makes users *wait* and *read* — not skim. It forces the emotional weight of each paragraph to land.

**Why no "carbon footprint" or "sustainability" language?**
These words have been so overused they've lost meaning. The prompt explicitly bans them, forcing Gemini to find fresh, sensory, specific language instead.

---

## 🌱 Why This Matters

Most climate apps show you graphs. Numbers. Percentages.

This app shows you that the year you were born, the air had **60+ fewer parts per million of CO₂** than it does today. It shows you that Earth remembers the monsoon that arrived the summer you turned seven. It shows you the specific tree that used to line your city's streets and is now retreating northward.

Data doesn't move people. Stories do.

**Earth's Last Letter turns data into story.**

---



## 🤝 Contributing

This was built as a weekend challenge project. If you want to extend it:

- Add more climate APIs (air quality via OpenAQ, wildfire data, flood risk)
- Support multiple languages (Earth speaks every language)
- Add a "letter gallery" where people can share their letters publicly
- Generate an image/poster version of the letter for social sharing
- Add historical photos of the user's city from their birth year

PRs welcome.

---

## 📄 License

MIT — use it, extend it, share it.

---

## 🙏 Acknowledgments

- Real CO₂ data from [NOAA's Mauna Loa Observatory](https://gml.noaa.gov/ccgg/trends/)
- Climate data from [Open-Meteo](https://open-meteo.com/) — completely free and open
- Letter generation by [Google Gemini](https://deepmind.google/technologies/gemini/)
- Built with love for Earth, which still has time

---

*"With all the time I have left, Earth"*