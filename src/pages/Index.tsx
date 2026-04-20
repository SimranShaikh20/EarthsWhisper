import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ParticleField from "@/components/ParticleField";
import LoadingEarth from "@/components/LoadingEarth";
import Letter from "@/components/Letter";
import {
  buildPrompt,
  CURRENT_CO2,
  generateLetter,
  geocodeCity,
  lookupBirthCO2,
} from "@/lib/earth";

type Result = {
  letter: string;
  city: string;
  country: string;
  year: number;
  birthCO2: number;
};

const Index = () => {
  const { toast } = useToast();
  const [city, setCity] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const yearNum = Number(year);
    if (!city.trim()) return setError("Please enter a city.");
    if (!yearNum || yearNum < 1950 || yearNum > 2010)
      return setError("Birth year must be between 1950 and 2010.");

    setLoading(true);
    setResult(null);
    try {
      const geo = await geocodeCity(city.trim());
      const birthCO2 = lookupBirthCO2(yearNum);
      const prompt = buildPrompt({
        year: yearNum,
        cityName: geo.name,
        country: geo.country,
        birthCO2,
      });
      const letter = await generateLetter({ prompt });
      setResult({
        letter,
        city: geo.name,
        country: geo.country,
        year: yearNum,
        birthCO2,
      });
    } catch (err) {
      const msg = (err as Error).message;
      if (msg === "CITY_NOT_FOUND") {
        setError("We couldn't find that city — try a nearby major city.");
      } else if (msg === "RATE_LIMITED") {
        setError("Earth is overwhelmed by letters right now. Please wait a moment and try again.");
      } else if (msg === "PAYMENT_REQUIRED") {
        setError("AI credits exhausted. Add credits in your Lovable workspace settings.");
      } else {
        setError("Earth couldn't finish the letter. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  const copyLetter = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.letter);
    toast({ title: "Letter copied", description: "Earth's words are on your clipboard." });
  };

  const shareOnX = () => {
    if (!result) return;
    const text = `Earth just wrote me a personal letter about ${result.city} and growing up in ${result.year}. This hit different. 🌍 ${window.location.origin} #EarthDay #EarthsLastLetter`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const rise = result ? CURRENT_CO2 - result.birthCO2 : 0;

  return (
    <>
      <ParticleField />

      <main className="min-h-screen px-4 py-12 sm:py-20">
        {/* Hero */}
        <header className="max-w-3xl mx-auto text-center mb-12 animate-fade-in-up">
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(142 55% 60%), hsl(160 45% 45%))" }}
            >
              Earth's Last Letter
            </span>{" "}
            <span aria-hidden>🌍</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground italic font-serif max-w-xl mx-auto">
            The planet writes you a personal letter — from your birth year to 2050.
          </p>
        </header>

        {/* Form / Loading / Result */}
        <section className="max-w-[560px] mx-auto" aria-live="polite">
          {!result && !loading && (
            <Card className="p-6 sm:p-8 backdrop-blur-sm bg-card/80 border-border/60 animate-fade-in-up">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="city">Your city</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai, London, New York..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="address-level2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Your birth year</Label>
                  <Input
                    id="year"
                    type="number"
                    min={1950}
                    max={2010}
                    placeholder="1995"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base font-semibold btn-glow bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  ✉️ Read Earth's Letter to Me
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Free to use • Powered by real climate data
                </p>
              </form>
            </Card>
          )}

          {loading && (
            <Card className="p-6 sm:p-8 backdrop-blur-sm bg-card/80 border-border/60">
              <LoadingEarth />
            </Card>
          )}
        </section>

        {/* Result */}
        {result && !loading && (
          <section className="mt-10 space-y-6">
            {/* Data pills */}
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up">
              <Pill label={`🌿 CO₂ when born: ${result.birthCO2} ppm`} />
              <Pill label={`🌡️ CO₂ today: ${CURRENT_CO2} ppm`} />
              <Pill label={`📈 Rise in your lifetime: +${rise} ppm`} accent />
            </div>

            <Letter
              text={result.letter}
              cityName={result.city}
              country={result.country}
              year={result.year}
            />

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto pt-2 pb-12 animate-fade-in-up">
              <Button variant="secondary" onClick={copyLetter}>📋 Copy Letter</Button>
              <Button variant="outline" onClick={reset}>🔁 Write Another</Button>
              <Button
                onClick={shareOnX}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                🐦 Share on X
              </Button>
            </div>
          </section>
        )}

        <footer className="text-center text-xs text-muted-foreground pt-12 pb-4">
          Made with grief & hope · Earth Day
        </footer>
      </main>
    </>
  );
};

const Pill = ({ label, accent = false }: { label: string; accent?: boolean }) => (
  <span
    className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm border backdrop-blur-sm ${
      accent
        ? "bg-accent/15 border-accent/40 text-accent"
        : "bg-primary/10 border-primary/30 text-primary-glow"
    }`}
  >
    {label}
  </span>
);

export default Index;
