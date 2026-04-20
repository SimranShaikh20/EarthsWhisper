import { useMemo } from "react";

/** Floating leaves & dust particles drifting upward across the night sky. */
const ParticleField = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => {
        const size = 2 + Math.random() * 6;
        const isLeaf = Math.random() > 0.7;
        return {
          id: i,
          left: Math.random() * 100,
          size,
          delay: Math.random() * 20,
          duration: 18 + Math.random() * 22,
          isLeaf,
          opacity: 0.3 + Math.random() * 0.5,
        };
      }),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Distant stars */}
      <div className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, hsl(40 30% 90% / 0.6) 50%, transparent), " +
            "radial-gradient(1px 1px at 70% 60%, hsl(40 30% 90% / 0.5) 50%, transparent), " +
            "radial-gradient(1px 1px at 40% 80%, hsl(40 30% 90% / 0.5) 50%, transparent), " +
            "radial-gradient(1px 1px at 85% 15%, hsl(40 30% 90% / 0.6) 50%, transparent), " +
            "radial-gradient(1px 1px at 10% 70%, hsl(40 30% 90% / 0.4) 50%, transparent)",
          backgroundSize: "600px 600px",
        }}
      />
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: `-10vh`,
            width: p.size,
            height: p.size,
            background: p.isLeaf
              ? "hsl(142 55% 50% / 0.7)"
              : "hsl(36 70% 70% / 0.6)",
            boxShadow: p.isLeaf
              ? "0 0 8px hsl(142 60% 50% / 0.5)"
              : "0 0 6px hsl(36 70% 60% / 0.5)",
            opacity: p.opacity,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            borderRadius: p.isLeaf ? "40% 60% 50% 50%" : "50%",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
