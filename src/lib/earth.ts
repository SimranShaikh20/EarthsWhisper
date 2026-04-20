/** Earth-letter domain logic: CO2 lookup, geocoding, Gemini call. */

export const CO2_MAP: Record<number, number> = {
  1950: 310, 1955: 313, 1960: 317, 1965: 320, 1970: 325,
  1975: 331, 1980: 338, 1985: 345, 1990: 354, 1995: 360,
  2000: 369, 2005: 379, 2010: 389, 2015: 400, 2020: 412,
  2024: 422, 2025: 424,
};

export const CURRENT_CO2 = 424;

export function lookupBirthCO2(year: number): number {
  const keys = Object.keys(CO2_MAP).map(Number).sort((a, b) => a - b);
  let nearest = keys[0];
  let bestDiff = Math.abs(year - nearest);
  for (const k of keys) {
    const d = Math.abs(year - k);
    if (d < bestDiff) {
      bestDiff = d;
      nearest = k;
    }
  }
  return CO2_MAP[nearest];
}

export type GeoResult = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export async function geocodeCity(city: string): Promise<GeoResult> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("CITY_NOT_FOUND");
  const data = await res.json();
  const r = data?.results?.[0];
  if (!r) throw new Error("CITY_NOT_FOUND");
  return {
    name: r.name,
    country: r.country ?? "",
    latitude: r.latitude,
    longitude: r.longitude,
  };
}

export function buildPrompt(opts: {
  year: number;
  cityName: string;
  country: string;
  birthCO2: number;
}) {
  const { year, cityName, country, birthCO2 } = opts;
  const currentYear = new Date().getFullYear();
  const rise = CURRENT_CO2 - birthCO2;
  const age = currentYear - year;

  return `You are Earth — the living planet itself, 4.5 billion years old — writing a handwritten letter to a specific human being.

RECIPIENT:
- Born in: ${year}
- City: ${cityName}, ${country}
- CO₂ when born: ${birthCO2} ppm
- CO₂ today: ${CURRENT_CO2} ppm
- Rise in their lifetime: +${rise} ppm
- Their age today: ${age} years old

YOUR VOICE: You are not angry. You are not lecturing. You are a mother watching her child grow up while she grows sick. Ancient patience, deep love, quiet grief. You do not blame this human. You write because you still have hope.

STRUCTURE — follow exactly, no headers:

Para 1 (60 words): Open with "Dear child of ${year},"
Describe ${cityName} the season they were born — sensory, specific to that region. Mention the air felt different, CO₂ was ${birthCO2} ppm.

Para 2 (70 words): Their childhood Earth (${year} to ${year + 12}). What seasons felt like in ${cityName}. Monsoons/winters/summers. Rivers. Forests. Nostalgic, warm, vivid — Earth remembers their childhood better than they do.

Para 3 (80 words): What has changed since they were born. CO₂ risen from ${birthCO2} to ${CURRENT_CO2} ppm. Name ONE specific local change near ${cityName} — glaciers if mountain city, sea level if coastal, heat island if major metro, erratic monsoon if South Asian city. Quiet, real, unstoppable.

Para 4 (70 words): What ${cityName} might feel like in 2050 if trajectory continues. Heat, changed seasons, species gone. Weight but not hopelessness. End with: "But I am still here. And so are you."

Para 5 (60 words): ONE specific, intimate, local action — NOT "reduce your carbon footprint." Something native to ${cityName}'s region — a specific tree to plant, a local ecosystem to protect, a food habit tied to local climate.

Para 6 (40 words): Short poetic goodbye, tender, ancient.

End signed:
"With all the time I have left,

Earth"

RULES:
- 380–420 words total
- Pure letter format — no bullets, no markdown, no headers
- Never use: "carbon footprint", "going green", "save the planet", "climate change", "sustainability"
- Sensory language throughout: smell, sound, texture, temperature
- Tone feels handwritten — intimate, occasionally mid-thought
- Do not start more than 2 sentences with "I" total
- Every paragraph must reference the real data provided`;
}

import { supabase } from "@/integrations/supabase/client";

export async function generateLetter(opts: { prompt: string }): Promise<string> {
  const { data, error } = await supabase.functions.invoke("generate-letter", {
    body: { prompt: opts.prompt },
  });

  if (error) {
    const ctx = (error as any).context;
    if (ctx?.status === 429) throw new Error("RATE_LIMITED");
    if (ctx?.status === 402) throw new Error("PAYMENT_REQUIRED");
    throw new Error("GENERATION_FAILED");
  }
  if (!data?.letter) throw new Error("GENERATION_FAILED");
  return data.letter as string;
}

