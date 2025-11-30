import React, { useEffect, useState } from 'react';
import { useOrbitEngine } from './hooks/useOrbitEngine';
import { useWarpDrive } from './hooks/useWarpDrive';
import { useGamification } from './hooks/useGamification';
import { useCaptainsLog } from './hooks/useCaptainsLog';
import { useAudioSystem } from './hooks/useAudioSystem';
import StarfieldCanvas from './components/visuals/StarfieldCanvas';
import IdentityLock from './components/IdentityLock';
import SingularityGoal from './components/SingularityGoal';
import ThrusterBank from './components/ThrusterBank';
import JettisonControl from './components/JettisonControl';
import XPHUD from './components/XPHUD';
import MissionLog from './components/MissionLog';
import LevelUpModal from './components/LevelUpModal';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

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

function App() {
  const { state, actions } = useOrbitEngine();
  const velocity = useWarpDrive(state);
  const { xpState, addXP, levelUpEvent, clearLevelUpEvent, progress, XP_TABLE } = useGamification();
  const { history, logDailyActivity } = useCaptainsLog();
  const { isEnabled: audioEnabled, toggleAudio, playHover, playComplete, playWarp, playLevelUp } = useAudioSystem();

  const [toasts, setToasts] = useState([]);
  const isLocked = state.status !== 'IDLE';

  // Handle XP and Audio triggers
  const handleHeavyLiftToggle = () => {
    actions.toggleHeavyLift();
    if (!state.heavyLift.completed) {
      // Completing
      addXP(XP_TABLE.HEAVY_LIFT);
      playComplete();
      playWarp();
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
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Visual Engine */}
      <StarfieldCanvas velocity={velocity} />

      {/* Audio Toggle */}
      <button
        onClick={toggleAudio}
        className="fixed top-4 left-4 z-30 text-slate-500 hover:text-cyan-400 transition-colors"
      >
        {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

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
        <div onMouseEnter={playHover}>
          <IdentityLock
            identity={state.identity}
            setIdentity={actions.setIdentity}
            lockIdentity={actions.lockIdentity}
            isLocked={isLocked}
          />
        </div>

        {/* Main Task (The Heavy Lift) */}
        <div onMouseEnter={playHover}>
          <SingularityGoal
            goal={state.heavyLift}
            setGoal={actions.setHeavyLift}
            toggleGoal={handleHeavyLiftToggle}
            isLocked={isLocked}
          />
        </div>

        {/* Secondary Tasks (Thrusters) */}
        <div onMouseEnter={playHover}>
          <ThrusterBank
            thrusters={state.thrusters}
            setThruster={actions.setThruster}
            toggleThruster={handleThrusterToggle}
            isLocked={isLocked}
          />
        </div>
      </div>

      {/* Mission Log (Heatmap) */}
      <MissionLog history={history} isLocked={isLocked} />

      {/* Controls */}
      <JettisonControl
        onJettison={actions.jettison}
        isLocked={isLocked}
      />

      {/* Level Up Modal */}
      <LevelUpModal
        level={levelUpEvent}
        onClose={clearLevelUpEvent}
      />

      {/* Ambient Overlay for Warp Speed */}
      <div
        className={`
          fixed inset-0 pointer-events-none transition-opacity duration-1000
          bg-gradient-to-b from-fuchsia-900/10 to-transparent
          ${state.status === 'WARP' ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}

export default App;
