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
      {/* Ouverture du ciel - Fond lumineux descendant */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] md:w-[80vw]"
        style={{ height: '120vh', background: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.4) 0%, transparent 60%)' }}
        initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top center' }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
      />

      {/* Faisceaux de lumière divine descendants */}
      <motion.div className="absolute inset-0 flex justify-center pointer-events-none z-0 overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-[-10vh] origin-top"
            style={{
              width: `${15 + Math.random() * 25}vw`,
              height: '150vh',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 215, 0, 0.2), transparent)',
              rotate: `${(i - 4) * 10}deg`,
              opacity: 0,
              filter: 'blur(40px) drop-shadow(0 0 60px #ffd700)'
            }}
            animate={{ 
              opacity: [0, Math.random() * 0.4 + 0.4, Math.random() * 0.2 + 0.2, Math.random() * 0.4 + 0.4],
            }}
            transition={{ 
              duration: 6 + Math.random() * 2,
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
      
      {/* Auréole explicite (anneau) */}
      <motion.div
        className="absolute z-20 rounded-[100%]"
        style={{ 
          width: '50vw', height: '15vw', maxWidth: '700px', maxHeight: '200px', 
          boxShadow: '0 0 40px #ffd700, inset 0 0 40px #ffd700, 0 0 80px #ffffff',
          top: '20%',
          borderTop: '6px solid rgba(255, 215, 0, 0.8)',
          borderBottom: '10px solid rgba(255, 255, 255, 0.9)',
          transformOrigin: 'center'
        }}
        initial={{ opacity: 0, y: -1000, scale: 0.2, rotateX: 80 }}
        animate={{ opacity: [0, 0.9, 0.9, 0], y: [-1000, 0, 0, 0], scale: [0.2, 1, 1, 1], rotateX: [80, 75, 75, 75] }}
        transition={{ duration: 8, delay: 2, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
      />

      {/* Flag Container (Descente du ciel) */}
      <motion.div 
        className="relative z-30 w-full max-w-[250px] md:max-w-[400px] lg:max-w-[500px] aspect-square overflow-hidden bg-black"
        style={{
          borderRadius: 16
        }}
        initial={{ y: -1200, opacity: 0, scale: 0.5, rotateX: 45, boxShadow: '0 0 0px rgba(255, 215, 0, 0)' }}
        animate={{ 
          y: [-1200, 0, 0, 0], 
          opacity: [0, 1, 1, 1], 
          scale: [0.5, 1, 1, 1], 
          rotateX: [45, 0, 0, 0],
          boxShadow: [
            '0 0 0px rgba(255, 215, 0, 0), 0 0 0px rgba(255, 255, 255, 0)',
            '0 0 120px rgba(255, 215, 0, 0.7), 0 0 50px rgba(255, 255, 255, 1)',
            '0 0 120px rgba(255, 215, 0, 0.7), 0 0 50px rgba(255, 255, 255, 1)',
            '0 0 0px rgba(255, 215, 0, 0), 0 0 0px rgba(255, 255, 255, 0)'
          ]
        }}
        transition={{ duration: 8, delay: 2, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" 
          alt="Drapeau de la Chine"
          className="w-full h-full object-cover scale-110"
        />

        {/* Reflet de lumière sur le drapeau */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 pointer-events-none mix-blend-overlay"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 3, delay: 5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        />
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
