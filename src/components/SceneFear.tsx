import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const RunningPerson = ({ flipped = false }: { flipped?: boolean }) => (
  <svg
    viewBox="0 0 60 100"
    className="w-14 h-24 md:w-20 md:h-32 xl:w-28 xl:h-44"
    style={{
      transform: flipped ? 'scaleX(-1)' : 'none',
      filter: 'drop-shadow(0 0 8px black) drop-shadow(0 0 4px black)',
    }}
  >
    <path d="M18 10 L30 0 L42 10 Z" fill="#ffd700" opacity="1" />
    <circle cx="30" cy="18" r="9" fill="white" opacity="0.95" />
    <path d="M30 27 L27 58 L33 58 Z" fill="white" opacity="0.9" />
    <path d="M28 33 Q14 24 9 34" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9" />
    <path d="M32 33 Q46 40 52 30" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9" />
    <path d="M30 58 Q19 72 12 88" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.9" />
    <path d="M30 58 Q40 68 48 78" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.9" />
  </svg>
);

const ScaredPerson = ({ flipped = false }: { flipped?: boolean }) => (
  <svg
    viewBox="0 0 60 110"
    className="w-14 h-28 md:w-20 md:h-36 xl:w-28 xl:h-48"
    style={{
      transform: flipped ? 'scaleX(-1)' : 'none',
      filter: 'drop-shadow(0 0 8px black) drop-shadow(0 0 4px black)',
    }}
  >
    <path d="M14 8 L30 -2 L46 8 Z" fill="#ffd700" opacity="1" transform="rotate(-22, 30, 3) translate(-4, -10)" />
    <circle cx="30" cy="18" r="9" fill="white" opacity="0.95" />
    <ellipse cx="30" cy="21" rx="3.5" ry="4.5" fill="#0b0b0b" />
    <circle cx="25" cy="15" r="3" fill="#0b0b0b" />
    <circle cx="35" cy="15" r="3" fill="#0b0b0b" />
    <circle cx="26" cy="14" r="1.2" fill="white" />
    <circle cx="36" cy="14" r="1.2" fill="white" />
    <path d="M30 27 L25 58 L32 58 Z" fill="white" opacity="0.9" />
    <path d="M27 32 Q10 18 7 6" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M33 32 Q50 18 53 6" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M28 58 Q14 75 9 91" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" />
    <path d="M31 58 Q43 71 50 83" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" />
    <line x1="1" y1="42" x2="13" y2="42" stroke="white" strokeWidth="2.5" opacity="0.5" />
    <line x1="1" y1="53" x2="9" y2="53" stroke="white" strokeWidth="2" opacity="0.35" />
  </svg>
);

const ShanghaiSkyline = () => (
  <svg viewBox="0 0 1200 320" className="w-full absolute bottom-0 z-0" preserveAspectRatio="none">
    <rect x="547" y="30" width="14" height="290" fill="#1a1a1a" />
    <circle cx="554" cy="130" r="38" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="2" />
    <circle cx="554" cy="210" r="24" fill="#1c1c1c" />
    <rect x="550" y="0" width="8" height="40" fill="#222" />
    <rect x="680" y="50" width="18" height="270" fill="#181818" />
    <rect x="684" y="40" width="10" height="18" fill="#1e1e1e" />
    <polygon points="720,320 720,60 732,320" fill="#161616" />
    <rect x="0" y="200" width="90" height="120" fill="#181818" />
    <rect x="94" y="155" width="65" height="165" fill="#1c1c1c" />
    <rect x="163" y="110" width="42" height="210" fill="#161616" />
    <rect x="209" y="170" width="95" height="150" fill="#1e1e1e" />
    <rect x="308" y="88" width="52" height="232" fill="#181818" />
    <rect x="364" y="125" width="72" height="195" fill="#202020" />
    <rect x="440" y="70" width="32" height="250" fill="#161616" />
    <rect x="476" y="145" width="62" height="175" fill="#1c1c1c" />
    <rect x="630" y="160" width="42" height="160" fill="#181818" />
    <rect x="755" y="95" width="48" height="225" fill="#1e1e1e" />
    <rect x="807" y="135" width="82" height="185" fill="#161616" />
    <rect x="893" y="78" width="58" height="242" fill="#1a1a1a" />
    <rect x="955" y="115" width="68" height="205" fill="#1e1e1e" />
    <rect x="1027" y="155" width="95" height="165" fill="#181818" />
    <rect x="1126" y="105" width="74" height="215" fill="#161616" />
    {[175, 220, 320, 470, 760, 900, 1040].map((x, i) => (
      <rect key={i} x={x} y={120 + (i % 3) * 30} width="4" height="4" fill="#d60000" opacity="0.7" />
    ))}
    {[95, 168, 445, 683, 810, 960, 1130].map((x, i) => (
      <rect key={`g${i}`} x={x} y={160 + (i % 4) * 25} width="3" height="3" fill="#ffd700" opacity="0.5" />
    ))}
  </svg>
);

const PEOPLE_COUNT = 12;

export default function SceneFear() {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#050000] rounded-2xl w-full h-full border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.9)] ${shake ? 'animate-shake' : ''}`}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 1 }}
    >
      {/* Halo rouge */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(214,0,0,0.18) 0%, transparent 65%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      />

      {/* Flash rouge séisme */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(214,0,0,0.4) 0%, transparent 60%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: shake ? [0, 0.9, 0] : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Fissures au sol */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1200 800"
        initial={{ opacity: 0 }}
        animate={{ opacity: shake ? 0.75 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.path
          d="M600 420 L578 398 L556 432 L534 400 L498 438"
          stroke="#d60000" strokeWidth="4" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: shake ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />
        <motion.path
          d="M600 420 L624 392 L648 418 L675 386 L705 428"
          stroke="#d60000" strokeWidth="3" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: shake ? 1 : 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        />
        <motion.path
          d="M600 420 L588 460 L572 480 L558 510"
          stroke="#d60000" strokeWidth="2.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: shake ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        />
      </motion.svg>

      {/* Chiffre 4 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full mb-[8vh] mt-[5vh]">
        <motion.h2
          className="text-[160px] md:text-[280px] lg:text-[400px] font-black text-[#d60000] leading-none"
          style={{ textShadow: '0 0 80px rgba(214,0,0,0.9), 0 0 200px rgba(214,0,0,0.5)' }}
          initial={{ scale: 0, opacity: 0, rotate: -180, filter: 'blur(40px)' }}
          animate={{ scale: [0, 1.4, 0.9, 1.1, 1], opacity: 1, rotate: 0, filter: 'blur(0px)' }}
          transition={{ delay: 2.5, duration: 1.3, times: [0, 0.4, 0.6, 0.8, 1], ease: 'easeOut' }}
        >
          4
        </motion.h2>

        <motion.div
          className="z-20 flex flex-col items-center mt-[-4vh]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2 }}
        >
          <h3
            className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white text-center px-4"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,1)' }}
          >
            LA TETRAFOBIA
          </h3>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.5em] mt-3 bg-black px-5 py-2 text-white/80 border border-[#d60000]/40 rounded-full whitespace-nowrap">
            Miedo Colectivo
          </p>
        </motion.div>
      </div>

      {/* Explication haut */}
      <motion.div
        className="absolute top-5 md:top-8 text-center z-30 w-full px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.5, duration: 0.8 }}
      >
        <p
          className="text-base md:text-xl lg:text-2xl text-white max-w-3xl mx-auto font-serif italic text-center px-6 py-3 bg-black/75 backdrop-blur-md rounded-2xl border border-white/10"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,1)' }}
        >
          "En chino, el <span className="text-[#d60000] not-italic font-black text-2xl md:text-3xl">4</span> (四 sì) suena casi igual que muerte (死 sǐ)."
        </p>
      </motion.div>

      {/* Personnages fuyants */}
      {[...Array(PEOPLE_COUNT)].map((_, i) => {
        const goLeft = i % 2 === 0;
        const row = Math.floor(i / 4);
        const scale = 1 - row * 0.18;
        const bottomOffset = 7 + row * 9;
        return (
          <motion.div
            key={`person-${i}`}
            className="absolute pointer-events-none"
            style={{ bottom: `${bottomOffset}vh`, scale, zIndex: 15 - row, filter: row > 0 ? `blur(${row * 0.6}px)` : 'none' }}
            initial={{ x: goLeft ? '65vw' : '-25vw', opacity: 0 }}
            animate={{ x: goLeft ? '-160vw' : '160vw', opacity: [0, 1, 1, 1, 0] }}
            transition={{ delay: 3 + i * 0.18, duration: 2.8 + (i % 3) * 0.4, repeat: Infinity, repeatDelay: (i % 4) * 0.6, ease: [0.4, 0, 0.6, 1] }}
          >
            {i % 3 === 0 ? <ScaredPerson flipped={goLeft} /> : <RunningPerson flipped={goLeft} />}
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/15 rounded-full blur-sm"
              animate={{ scaleX: [1, 1.6, 0.7, 1.4, 1], opacity: [0.25, 0.5, 0.15, 0.45, 0.25] }}
              transition={{ duration: 0.35, repeat: Infinity }}
            />
          </motion.div>
        );
      })}

      <ShanghaiSkyline />
    </motion.div>
  );
}
