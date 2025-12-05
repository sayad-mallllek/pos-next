"use client";

import { useEffect, useState } from "react";

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function Fireflies({ count = 30 }: { count?: number }) {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    const generateFireflies = () => {
      const newFireflies: Firefly[] = [];
      for (let i = 0; i < count; i++) {
        newFireflies.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2, // 2-6px
          duration: Math.random() * 10 + 10, // 10-20s
          delay: Math.random() * 10, // 0-10s delay
          opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
        });
      }
      setFireflies(newFireflies);
    };

    generateFireflies();
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="absolute animate-firefly"
          style={{
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            animationDuration: `${firefly.duration}s`,
            // animationDelay: `${firefly.delay}s`,
          }}
        >
          <div
            className="h-full w-full rounded-full bg-forest-300 shadow-[0_0_10px_2px_rgba(102,192,228,0.6),0_0_20px_4px_rgba(102,192,228,0.3)]"
            style={{
              opacity: firefly.opacity,
              animation: `firefly-glow ${
                2 + Math.random() * 2
              }s ease-in-out infinite`,
              //   animationDelay: `${firefly.delay}s`,
            }}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes firefly-glow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .animate-firefly {
          animation: firefly-float linear infinite;
        }

        @keyframes firefly-float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -40px) rotate(90deg);
          }
          50% {
            transform: translate(-20px, -80px) rotate(180deg);
          }
          75% {
            transform: translate(40px, -40px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
