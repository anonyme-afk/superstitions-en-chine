import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function ScenePrice() {
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1500);
    const t2 = setTimeout(() => setPhase(2), 2500);
    const t2b = setTimeout(() => setPhase(2.5), 3500); // explosion
    const t3 = setTimeout(() => setPhase(3), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t2b); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      className="relative bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden shadow-2xl w-full h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
       <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#ffd700]/10 rounded-full blur-[100px] pointer-events-none mt-20 md:mt-0"></div>

       <div className="w-full h-full overflow-y-auto overflow-x-hidden p-4 md:p-8 flex flex-col items-center justify-start md:justify-center">
         {/* Title at the top, outside the flex-row container */}
         <motion.h2 
           className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 z-10 text-center shrink-0 mt-4 md:mt-0"
           style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,1)' }}
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
         >
           El Truco Comercial
         </motion.h2>

        <div className="relative flex flex-col md:flex-row items-center justify-center w-full flex-1 min-h-0 z-10 gap-4 md:gap-8 pb-2">
        
       {/* Price display side */}
       <div className="text-center flex-1 order-2 md:order-1 flex flex-col items-center justify-center w-full">
          <div className="relative flex flex-col items-center justify-center min-h-[120px] md:min-h-[160px] w-full bg-black/80 rounded-3xl border border-white/30 p-4 md:p-6 shadow-inner max-w-sm mx-auto">
             {/* Caractère "mort" (死) transparent */}
             <AnimatePresence>
               {phase < 2 && (
                 <motion.div
                   className="absolute font-serif text-[#d60000] font-bold z-0 pointer-events-none select-none"
                   style={{ fontSize: 'clamp(5rem, 20vw, 140px)', opacity: 0.15 }}
                   initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                   animate={{ opacity: 0.25, scale: 1, filter: "blur(0px)" }}
                   exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                   transition={{ duration: 0.8 }}
                 >
                   死
                 </motion.div>
               )}
             </AnimatePresence>

             {phase < 3 ? (
                <motion.span 
                  key="price-40"
                  className="text-[clamp(3rem,12vw,90px)] font-black font-mono text-white leading-none z-10"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
                  initial={{ filter: "blur(10px)", opacity: 0, scale: 0.9 }}
                  animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                  exit={{ scale: 1.2, opacity: 0, filter: "blur(20px)" }}
                >
                  40 ¥
                </motion.span>
             ) : (
                <>
                  <motion.span className="text-3xl md:text-5xl xl:text-6xl font-mono font-black line-through opacity-80 absolute top-3 md:top-4 z-10"
                     initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
                  >
                    40 ¥
                  </motion.span>
                  <motion.div 
                    key="price-39"
                    className="font-black font-mono text-[#ffd700] tracking-tighter flex items-center justify-center mt-6 md:mt-8 relative leading-none whitespace-nowrap z-10"
                    style={{ fontSize: 'clamp(2.5rem,10vw,70px)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
                    initial={{ scale: 0.5, filter: "blur(20px)", opacity: 0 }}
                    animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                  >
                    <Sparkles className="absolute -top-6 -left-8 w-6 h-6 md:w-10 md:h-10 text-[#ffd700] animate-pulse" />
                    39<span className="text-white mx-2 md:mx-3" style={{ fontSize: '0.8em' }}>+</span>1 ¥
                    <Sparkles className="absolute -bottom-4 -right-8 w-6 h-6 md:w-8 md:h-8 text-[#ffd700] animate-pulse delay-150" />
                  </motion.div>
                </>
             )}
             
             {phase === 2.5 && (
               <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                 {/* Explosion de particules depuis le centre avec directions aléatoires */}
                 {[...Array(24)].map((_, i) => {
                   const angle = Math.random() * Math.PI * 2;
                   const dist = Math.random() * 120 + 60;
                   return (
                     <motion.div
                       key={i}
                       className="absolute rounded-full"
                       style={{ 
                         backgroundColor: i % 2 === 0 ? '#ffd700' : '#d60000',
                         width: 5 + Math.random() * 8,
                         height: 5 + Math.random() * 8,
                         boxShadow: `0 0 10px ${i % 2 === 0 ? '#ffd700' : '#d60000'}`
                       }}
                       initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                       animate={{ 
                         x: Math.cos(angle) * dist,
                         y: Math.sin(angle) * dist,
                         scale: 0,
                         opacity: 0
                       }}
                       transition={{ duration: 0.5 + Math.random() * 0.4, ease: "easeOut" }}
                     />
                   );
                 })}
                 {/* Flash blanc */}
                 <motion.div 
                   className="absolute inset-0 bg-white rounded-3xl"
                   initial={{ opacity: 0.8 }}
                   animate={{ opacity: 0 }}
                   transition={{ duration: 0.3 }}
                 />
               </motion.div>
             )}
          </div>
        </div>

        {/* Character Icon Side */}
        <div className="flex-1 order-1 md:order-2 flex flex-col items-center justify-center w-full mt-2 md:mt-0">
          <AnimatePresence mode="popLayout">
            {phase >= 1 && (
              <motion.div 
                className="flex flex-col items-center relative w-full justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring" }}
              >
                <motion.div 
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 shrink-0 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border-4 border-white/10 flex items-center justify-center mb-4 md:mb-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
                    animate={{ 
                      x: phase === 2 ? [-10, 10, -10, 10, 0] : 0,
                      rotate: phase === 2 ? [-5, 5, -5, 5, 0] : 0,
                      scale: phase === 2 ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-[40px] md:text-[60px] drop-shadow-xl flex items-center justify-center text-center leading-none mt-2 relative group">
                      {phase < 2 ? "🤔" : phase === 2 ? "🙅‍♂️" : "😁👌"}
                    </span>
                    
                    {phase === 2 && (
                      <motion.div
                        className="absolute -top-4 -left-4 md:-top-8 md:-left-8 bg-[#d60000] text-white font-black text-xl md:text-2xl px-5 py-2 rounded-full shadow-2xl z-20 rotate-[-10deg]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        ¡NO!
                        <div className="absolute -bottom-2 right-5 w-3 h-3 bg-[#d60000] rotate-45"></div>
                      </motion.div>
                    )}
                </motion.div>
                
                <motion.div
                  className="bg-black/80 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/30 w-full max-w-sm md:max-w-md shadow-2xl mx-auto"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
                >
                  <p className="text-center text-lg md:text-2xl xl:text-3xl font-bold font-serif italic text-white flex gap-1 flex-wrap items-center justify-center">
                    <span>"Mejor esquivar el</span>
                    <span className="text-[#d60000] not-italic font-black text-2xl md:text-4xl xl:text-5xl mx-1 transform translate-y-[-2px]">4</span>
                    <span>que asustar al comprador."</span>
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
