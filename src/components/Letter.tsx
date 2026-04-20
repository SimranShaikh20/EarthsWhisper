import { useEffect, useState } from "react";

type Props = {
  text: string;
  cityName: string;
  country: string;
  year: number;
};

/** Typewriter-reveal letter on aged parchment. */
const Letter = ({ text, cityName, country, year }: Props) => {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    setRevealed(0);
    if (!text) return;
    let i = 0;
    const step = Math.max(1, Math.round(text.length / 600)); // ~600 ticks
    const id = setInterval(() => {
      i += step * 3;
      if (i >= text.length) {
        setRevealed(text.length);
        clearInterval(id);
      } else {
        setRevealed(i);
      }
    }, 16);
    return () => clearInterval(id);
  }, [text]);

  const visible = text.slice(0, revealed);

  // Split signature from body if present
  const signatureMatch = visible.match(/With all the time I have left,?\s*\n*\s*Earth\.?/i);
  let body = visible;
  let signature = "";
  if (signatureMatch) {
    body = visible.slice(0, signatureMatch.index!).trimEnd();
    signature = visible.slice(signatureMatch.index!);
  }

  return (
    <article className="parchment rounded-lg px-8 py-12 sm:px-14 sm:py-16 max-w-3xl mx-auto animate-fade-in-up">
      {/* Postmark */}
      <div className="flex justify-end mb-6 -mt-4">
        <div className="postmark px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase">
          {cityName}{country ? ` · ${country}` : ""} · {year}
        </div>
      </div>

      <div
        className="font-serif-letter text-ink whitespace-pre-wrap"
        style={{ fontSize: "1.05rem", lineHeight: 1.9 }}
      >
        {body}
        {revealed < text.length && (
          <span className="inline-block w-[2px] h-5 bg-ink-faded ml-0.5 align-middle animate-pulse" />
        )}
      </div>

      {signature && (
        <div className="mt-8 pt-6 border-t border-ink/10">
          <p className="font-serif-letter text-ink italic mb-1">With all the time I have left,</p>
          <p className="font-hand text-4xl text-ink leading-none">Earth</p>
        </div>
      )}
    </article>
  );
};

export default Letter;
