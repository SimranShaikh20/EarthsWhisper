import { useEffect, useState } from "react";

const MESSAGES = [
  "Earth is remembering your city...",
  "Searching through 4.5 billion years of memory...",
  "Weaving real climate data into your letter...",
  "Almost ready — Earth writes slowly, carefully...",
];

const LoadingEarth = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % MESSAGES.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 py-16">
      <div className="relative">
        <div
          className="h-32 w-32 rounded-full animate-pulse-slow"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, hsl(142 60% 55%) 0%, hsl(160 50% 30%) 45%, hsl(210 60% 12%) 100%)",
            boxShadow:
              "0 0 60px hsl(142 60% 50% / 0.5), inset -10px -10px 30px hsl(210 60% 5% / 0.6)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full animate-spin-slow opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, hsl(142 60% 60% / 0.4) 25%, transparent 50%, hsl(36 70% 60% / 0.3) 75%, transparent 100%)",
          }}
        />
      </div>
      <p className="font-serif italic text-lg text-primary-glow animate-shimmer-text text-center max-w-sm">
        {MESSAGES[i]}
      </p>
    </div>
  );
};

export default LoadingEarth;
