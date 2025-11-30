import React, { useEffect, useState } from 'react';
import { useOrbitEngine } from './hooks/useOrbitEngine';
import { useWarpDrive } from './hooks/useWarpDrive';
import { useGamification } from './hooks/useGamification';
import { useCaptainsLog } from './hooks/useCaptainsLog';
import { useAudioSystem } from './hooks/useAudioSystem';
import { useHyperdrive } from './hooks/useHyperdrive';
import { ThemeProvider } from './hooks/useTheme';
import { useHolonet } from './hooks/useHolonet';
import { useTouchOps } from './hooks/useTouchOps';

import StarfieldCanvas from './components/visuals/StarfieldCanvas';
import IdentityLock from './components/IdentityLock';
import SingularityGoal from './components/SingularityGoal';
import ThrusterBank from './components/ThrusterBank';
import JettisonControl from './components/JettisonControl';
import XPHUD from './components/XPHUD';
import MissionLog from './components/MissionLog';
import LevelUpModal from './components/LevelUpModal';
import HyperdriveHUD from './components/HyperdriveHUD';
import TheArmory from './components/TheArmory';
import DataTerminal from './components/DataTerminal';
import CommsPanel from './components/CommsPanel';
import MobileFlightDeck from './components/MobileFlightDeck';
import InstallBeacon from './components/InstallBeacon';

import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Settings, Disc, Wifi } from 'lucide-react';

// Simple Toast Component
const Toast = ({ message, onComplete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: -50 }}
    exit={{ opacity: 0 }}
    onAnimationComplete={onComplete}
    className="absolute z-50 text-fuchsia-400 font-bold font-mono text-xl pointer-events-none"
    style={{ textShadow: '0 0 10px rgba(217,70,239,0.8)' }}
  >
    {message}
  </motion.div>
);

function OrbitrApp() {
  const { state, actions } = useOrbitEngine();
  const velocity = useWarpDrive(state);
  const { xpState, addXP, levelUpEvent, clearLevelUpEvent, progress, XP_TABLE } = useGamification();
  const { history, logDailyActivity } = useCaptainsLog();
  const { isEnabled: audioEnabled, toggleAudio, playHover, playComplete, playWarp, playLevelUp } = useAudioSystem();

  // Phase 4 Hooks
  const holonet = useHolonet(state, actions.setIdentity); // Passing state for sync (simplified)
  const { isMobile, vibrate } = useTouchOps();

  // Hyperdrive
  const hyperdrive = useHyperdrive((mode) => {
    if (mode === 'FOCUS') {
      playComplete();
      showToast('HYPERDRIVE CYCLE COMPLETE');
      addXP(50);
    }
  });

  const [toasts, setToasts] = useState([]);
  const [showArmory, setShowArmory] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showComms, setShowComms] = useState(false);

  const isLocked = state.status !== 'IDLE';

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && isLocked && !state.heavyLift.completed) {
        if (document.activeElement.tagName !== 'INPUT') {
          e.preventDefault();
          if (hyperdrive.isActive) hyperdrive.actions.pause();
          else hyperdrive.actions.start();
        }
      }
      if (e.code === 'Escape') {
        if (hyperdrive.isActive) hyperdrive.actions.stop();
        setShowArmory(false);
        setShowTerminal(false);
        setShowComms(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, hyperdrive, state.heavyLift.completed]);

  // Handle XP and Audio triggers
  const handleHeavyLiftToggle = () => {
    actions.toggleHeavyLift();
    if (!state.heavyLift.completed) {
      // Completing
      addXP(XP_TABLE.HEAVY_LIFT);
      playComplete();
      playWarp();
      vibrate(50); // Haptic
      showToast(`+${XP_TABLE.HEAVY_LIFT} XP`);

      // Check for board clear bonus
      const allThrustersDone = state.thrusters.every(t => t.completed);
      if (allThrustersDone) {
        setTimeout(() => {
          addXP(XP_TABLE.BOARD_CLEAR);
          showToast(`BOARD CLEAR +${XP_TABLE.BOARD_CLEAR} XP`);
        }, 500);
      }
    }
  };

  const handleThrusterToggle = (id) => {
    const thruster = state.thrusters.find(t => t.id === id);
    actions.toggleThruster(id);

    if (!thruster.completed) {
      addXP(XP_TABLE.THRUSTER);
      playComplete();
      vibrate(10); // Haptic
      showToast(`+${XP_TABLE.THRUSTER} XP`);
    }
  };

  const showToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2000);
  };

  // Log history when tasks change
  useEffect(() => {
    if (isLocked) {
      const completedTasks = (state.heavyLift.completed ? 1 : 0) +
        state.thrusters.filter(t => t.completed).length;
      const perfectDay = state.heavyLift.completed && state.thrusters.every(t => t.completed);

      logDailyActivity({
        xp: xpState.totalXP,
        completedTasks,
        perfectDay
      });
    }
  }, [state, isLocked, logDailyActivity, xpState.totalXP]);

  // Play Level Up Sound
  useEffect(() => {
    if (levelUpEvent) {
      playLevelUp();
    }
  }, [levelUpEvent, playLevelUp]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 bg-[var(--color-bg)] transition-colors duration-1000 pb-24 md:pb-4">
      {/* Visual Engine */}
      <StarfieldCanvas velocity={hyperdrive.isActive ? 5 : velocity} />

      {/* Top Controls (Desktop) */}
      <div className="fixed top-4 left-4 z-30 hidden md:flex gap-4">
        <button
          onClick={toggleAudio}
          className="text-slate-500 hover:text-[var(--color-primary)] transition-colors"
          title="Toggle Audio"
        >
          {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <button
          onClick={() => setShowTerminal(true)}
          className="text-slate-500 hover:text-[var(--color-primary)] transition-colors"
          title="Data Terminal"
        >
          <Disc size={20} />
        </button>
        <button
          onClick={() => setShowComms(true)}
          className={`transition-colors ${holonet.status === 'SYNCED' ? 'text-green-500' :
              holonet.status === 'ERROR' ? 'text-red-500' : 'text-slate-500 hover:text-[var(--color-primary)]'
            }`}
          title="Comms Panel"
        >
          <Wifi size={20} />
        </button>
        <button
          onClick={() => setShowArmory(true)}
          className="text-slate-500 hover:text-[var(--color-primary)] transition-colors"
          title="The Armory"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* HUD Layer */}
      <XPHUD
        level={xpState.level}
        totalXP={xpState.totalXP}
        progress={progress}
        isLocked={isLocked}
      />

      <div className="z-10 w-full max-w-4xl flex flex-col items-center relative">
        {/* Toasts Container */}
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast key={toast.id} message={toast.msg} />
          ))}
        </AnimatePresence>

        {/* Header / Identity */}
        <div onMouseEnter={playHover} className={hyperdrive.isActive ? 'opacity-20 blur-sm transition-all' : 'transition-all'}>
          <IdentityLock
            identity={state.identity}
            setIdentity={actions.setIdentity}
            lockIdentity={actions.lockIdentity}
            isLocked={isLocked}
          />
        </div>

        {/* Main Task (The Heavy Lift) */}
        <div onMouseEnter={playHover} className={hyperdrive.isActive ? 'opacity-20 blur-sm transition-all' : 'transition-all'}>
          <SingularityGoal
            goal={state.heavyLift}
            setGoal={actions.setHeavyLift}
            toggleGoal={handleHeavyLiftToggle}
            isLocked={isLocked}
          />
        </div>

        {/* Hyperdrive Controls (Only visible when locked and not active) */}
        {isLocked && !hyperdrive.isActive && !state.heavyLift.completed && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={hyperdrive.actions.start}
            className="mb-8 px-6 py-2 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black font-mono tracking-widest uppercase text-sm transition-all"
          >
            Engage Hyperdrive
          </motion.button>
        )}

        {/* Secondary Tasks (Thrusters) */}
        <div onMouseEnter={playHover} className={hyperdrive.isActive ? 'opacity-0 pointer-events-none transition-all' : 'transition-all'}>
          <ThrusterBank
            thrusters={state.thrusters}
            setThruster={actions.setThruster}
            toggleThruster={handleThrusterToggle}
            isLocked={isLocked}
          />
        </div>
      </div>

      {/* Mission Log (Heatmap) */}
      <div className={hyperdrive.isActive ? 'opacity-0 transition-all' : 'transition-all'}>
        <MissionLog history={history} isLocked={isLocked} />
      </div>

      {/* Controls */}
      <JettisonControl
        onJettison={actions.jettison}
        isLocked={isLocked}
      />

      {/* Overlays */}
      <LevelUpModal
        level={levelUpEvent}
        onClose={clearLevelUpEvent}
      />

      <HyperdriveHUD
        isActive={hyperdrive.isActive}
        mode={hyperdrive.mode}
        timeLeft={hyperdrive.timeLeft}
        progress={hyperdrive.progress}
        onStart={hyperdrive.actions.start}
        onPause={hyperdrive.actions.pause}
        onStop={hyperdrive.actions.stop}
        activeTask={state.heavyLift.text}
      />

      <TheArmory
        isOpen={showArmory}
        onClose={() => setShowArmory(false)}
        userLevel={xpState.level}
      />

      <DataTerminal
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
      />

      <CommsPanel
        isOpen={showComms}
        onClose={() => setShowComms(false)}
        holonet={holonet}
      />

      {/* Mobile-specific components */}
      {isMobile && (
        <MobileFlightDeck
          onOpenStats={() => setShowTerminal(true)}
          onOpenArmory={() => setShowArmory(true)}
          onOpenComms={() => setShowComms(true)}
          isLocked={isLocked}
          status={holonet.status}
        />
      )}

      <InstallBeacon />

      {/* Ambient Overlay for Warp Speed */}
      <div
        className={`
          fixed inset-0 pointer-events-none transition-opacity duration-1000
          bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent
          ${state.status === 'WARP' ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <OrbitrApp />
    </ThemeProvider>
  );
}
