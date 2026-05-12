import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Particles({ color = '#ffd700', count = 30, className = "" }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100, // Start slightly below screen
      size: Math.random() * 4 + 1,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 3,
    }));
    setParticles(generatedParticles);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
            filter: 'blur(1px)'
          }}
          initial={{ y: `${p.y}vh`, opacity: 0 }}
          animate={{
            y: `-${20}vh`, /* Move up */
            opacity: [0, 1, 1, 0],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`, `${p.x}%`]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
