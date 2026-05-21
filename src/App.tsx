// src/App.tsx
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SceneStart from './components/SceneStart';
import SceneFlag from './components/SceneFlag';
import SceneFear from './components/SceneFear';
import ScenePrice from './components/ScenePrice';
import SceneEnd from './components/SceneEnd';

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [renderedScene, setRenderedScene] = useState(0);
  const [sweepKey, setSweepKey] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const [showFullscreenMessage, setShowFullscreenMessage] = useState(false);

  const goToScene = (index: number) => {
    if (index === currentScene || index < 0 || index > 4) return;
    setCurrentScene(index);
    setSweepKey(k => k + 1);
    setTimeout(() => setRenderedScene(index), 250); // Change scene when covered
  };

  const nextScene = () => goToScene(currentScene + 1);
  const prevScene = () => goToScene(currentScene - 1);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextScene();
    }
    if (isRightSwipe) {
      prevScene();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextScene();
      else if (e.key === 'ArrowLeft') prevScene();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  return (
    <div 
      className="w-screen h-screen bg-black text-white overflow-hidden flex flex-col selection:bg-[#d60000] selection:text-white relative"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Sweep Transition */}
      {sweepKey > 0 && (
        <motion.div
          key={sweepKey}
          className="fixed top-0 left-0 w-[150vw] h-full bg-[#d60000] z-[100] pointer-events-none shadow-[0_0_100px_rgba(214,0,0,1)]"
          initial={{ x: '-150vw', skewX: -20 }}
          animate={{ x: '150vw', skewX: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
      
      {/* Zone de présentation — prend tout l'espace sauf le footer */}
      <main
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        style={{ paddingBottom: '72px' }} // espace réservé pour le footer flottant
      >
        {/* Halo d'ambiance */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a0000]/40 to-transparent pointer-events-none" />

        <div className="w-full h-full max-w-7xl relative flex items-center justify-center p-4 md:p-6">
          <AnimatePresence mode="wait">
            {renderedScene === 0 && <SceneStart key="start" onStart={nextScene} />}
            {renderedScene === 1 && <SceneFlag key="flag" />}
            {renderedScene === 2 && <SceneFear key="fear" />}
            {renderedScene === 3 && <ScenePrice key="price" />}
            {renderedScene === 4 && <SceneEnd key="end" />}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer navigation flottant */}
      <footer className="absolute bottom-4 md:bottom-5 left-0 right-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="flex gap-4 md:gap-8 items-center justify-between bg-black/50 backdrop-blur-lg px-6 py-2.5 rounded-full border border-white/10 shadow-2xl pointer-events-auto">
          <button
            onClick={prevScene}
            disabled={currentScene === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <span className="text-xl font-bold">←</span>
          </button>

          <div className="flex gap-3 md:gap-4 items-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                onClick={() => goToScene(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  currentScene === i
                    ? 'bg-[#ffd700] shadow-[0_0_10px_rgba(255,215,0,0.8)] scale-150'
                    : 'bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextScene}
            disabled={currentScene === 4}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <span className="text-xl font-bold">→</span>
          </button>
        </div>

        {/* Bouton plein écran discret */}
        <button
          onClick={async (e) => {
            e.stopPropagation();
            try {
              const docEl = document.documentElement as any;
              const doc = document as any;
              if (!doc.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement) {
                if (docEl.requestFullscreen) {
                  await docEl.requestFullscreen();
                } else if (docEl.webkitRequestFullscreen) {
                  docEl.webkitRequestFullscreen();
                } else if (docEl.mozRequestFullScreen) {
                  docEl.mozRequestFullScreen();
                } else if (docEl.msRequestFullscreen) {
                  docEl.msRequestFullscreen();
                }
              } else {
                if (doc.exitFullscreen) {
                  await doc.exitFullscreen();
                } else if (doc.webkitExitFullscreen) {
                  doc.webkitExitFullscreen();
                } else if (doc.mozCancelFullScreen) {
                  doc.mozCancelFullScreen();
                } else if (doc.msExitFullscreen) {
                  doc.msExitFullscreen();
                }
              }
            } catch (err) {
              console.error(err);
              setShowFullscreenMessage(true);
              setTimeout(() => setShowFullscreenMessage(false), 4000);
            }
          }}
          className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-white/50 hover:text-white border border-white/20 pointer-events-auto text-lg z-[100] bg-black/40 backdrop-blur-md touch-manipulation"
          title="Plein écran"
        >
          ⛶
        </button>

        {/* Message d'erreur plein écran */}
        <AnimatePresence>
          {showFullscreenMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-zinc-800 text-white px-5 py-4 rounded-xl shadow-2xl border border-white/20 z-[200] max-w-[90vw] text-center text-sm md:text-base pointer-events-auto leading-relaxed"
            >
              Sur <b>iPhone (iOS)</b>, le plein écran web est bloqué par Apple. Tournez votre téléphone à l'horizontale.<br/><br/>Sur PC/Android, ouvrez l'app dans un <b>Nouvel Onglet</b> (↘) avant de cliquer.
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}
