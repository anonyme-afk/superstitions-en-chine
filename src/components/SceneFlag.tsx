import { motion } from 'motion/react';

export default function SceneFlag() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center z-10 w-full h-full p-4 md:p-12 relative overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="flag-wave">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.015 0.02;0.025 0.01;0.015 0.02" dur="20s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Ouverture du ciel - Fond lumineux descendant */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] md:w-[80vw]"
        style={{ height: '120vh', background: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.4) 0%, transparent 60%)' }}
        initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top center' }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
      />

      {/* Faisceaux de lumière divine descendants, avec rotation lente */}
      <motion.div 
        className="absolute inset-0 flex justify-center pointer-events-none z-0 overflow-hidden"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-[-20vh] origin-top"
            style={{
              width: `${15 + Math.random() * 25}vw`,
              height: '160vh',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 215, 0, 0.6), transparent)',
              rotate: `${(i - 6) * 30}deg`,
              opacity: 0,
              filter: 'blur(30px) drop-shadow(0 0 80px #ffd700)'
            }}
            animate={{ 
              opacity: [0, Math.random() * 0.4 + 0.2, Math.random() * 0.3 + 0.3, Math.random() * 0.4 + 0.2],
            }}
            transition={{ 
              duration: 6 + Math.random() * 3,
              delay: 1.5 + i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Halo d'ange derrière le drapeau */}
      <motion.div
        className="absolute z-10 rounded-full bg-[#ffd700]"
        style={{ width: '80vw', height: '80vw', maxWidth: '1000px', maxHeight: '1000px', filter: 'blur(150px)' }}
        initial={{ opacity: 0, y: -1000 }}
        animate={{ opacity: [0, 0.6, 0.6, 0], y: [-1000, 0, 0, 0] }}
        transition={{ duration: 8, delay: 2, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
      />


      {/* Flag Container — s'adapte à la hauteur disponible en fullscreen */}
      <motion.div
        className="relative z-10 w-full mx-auto rounded-xl border-4 border-white/10 overflow-hidden shadow-[0_0_60px_rgba(214,0,0,0.4)]"
        style={{
          maxWidth: 'min(900px, calc((100vh - 160px) * 3/2))',
          aspectRatio: '3/2',
          filter: 'url(#flag-wave)',
        }}
        initial={{ rotateX: 10, y: 30, opacity: 0 }}
        animate={{
          rotateX: 0,
          y: [0, -8, 0, -5, 0],
          opacity: 1,
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 1.2, delay: 0.2 },
          rotateX: { duration: 1.2, delay: 0.2, type: 'spring' },
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg"
          alt="Drapeau de la Chine"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 mix-blend-overlay pointer-events-none" />
        <div className="absolute -right-20 top-0 h-full w-[30%] bg-white/20 skew-x-[-20deg] blur-2xl pointer-events-none" />
      </motion.div>
      
      {/* Nuages noirs qui s'ouvrent */}
      <motion.div 
        className="absolute top-0 right-1/2 w-[150vw] h-[60vh] bg-black z-40"
        style={{ filter: 'blur(120px)', borderRadius: '50%' }}
        initial={{ x: '50%' }}
        animate={{ x: '-50%' }}
        transition={{ duration: 4.5, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-0 left-1/2 w-[150vw] h-[60vh] bg-black z-40"
        style={{ filter: 'blur(120px)', borderRadius: '50%' }}
        initial={{ x: '-50%' }}
        animate={{ x: '50%' }}
        transition={{ duration: 4.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
