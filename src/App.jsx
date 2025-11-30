import React, { useEffect, useState } from 'react';
import { useOrbitEngine } from './hooks/useOrbitEngine';
import { useWarpDrive } from './hooks/useWarpDrive';
import { useGamification } from './hooks/useGamification';
import { useCaptainsLog } from './hooks/useCaptainsLog';
import { useAudioSystem } from './hooks/useAudioSystem';
import { useHyperdrive } from './hooks/useHyperdrive';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { useHolonet } from './hooks/useHolonet';
import { useTouchOps } from './hooks/useTouchOps';
import { useFleet } from './hooks/useFleet';
import { useRadar } from './hooks/useRadar';
import { useCortex } from './hooks/useCortex';
import { useSubspace } from './hooks/useSubspace';
import { useSeasons } from './hooks/useSeasons';
import { useMedals } from './hooks/useMedals';
import { usePrestige } from './hooks/usePrestige';
import { useNotifications } from './hooks/useNotifications';
import { useDamage } from './hooks/useDamage';
import { useJournal } from './hooks/useJournal';

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
import AllianceHall from './components/AllianceHall';
import RadarScope from './components/RadarScope';
import WingComms from './components/WingComms';
import NavCore from './components/NavCore';
import TacticalBriefing from './components/TacticalBriefing';
import VoiceComms from './components/VoiceComms';
import DockingBay from './components/DockingBay';
import TimelineHorizon from './components/TimelineHorizon';
import IncomingTransmission from './components/IncomingTransmission';
import SeasonTrack from './components/SeasonTrack';
import MedalCase from './components/MedalCase';
import PrestigeCeremony from './components/PrestigeCeremony';
import ConsistencyGraph from './components/ConsistencyGraph';
import ImpactPredictor from './components/ImpactPredictor';
import LogTerminal from './components/LogTerminal';
import BootSequence from './components/BootSequence';

import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Settings, Disc, Wifi, Users, Server, Award, Bell, FileText } from 'lucide-react';

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
  const { xpState, addXP, levelUpEvent, clearLevelUpEvent, progress, resetProgress, XP_TABLE } = useGamification();
  const { history, logDailyActivity } = useCaptainsLog();
  const { isEnabled: audioEnabled, toggleAudio, playHover, playComplete, playWarp, playLevelUp } = useAudioSystem();
  const { resetTheme } = useTheme();

  // Phase 4 Hooks
  const holonet = useHolonet(state, actions.setIdentity);
  const { isMobile, vibrate } = useTouchOps();

  // Phase 5 Hooks
  const fleet = useFleet(holonet.user);
  const radar = useRadar(holonet.user, fleet.wing);

  // Phase 6 Hooks
  const cortex = useCortex(history, actions.setHeavyLift, actions.setThruster);

  // Phase 7 Hooks
  const [toasts, setToasts] = useState([]);
  const showToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2000);
  };
  const subspace = useSubspace(addXP, showToast);

  // Phase 8 Hooks
  const seasons = useSeasons(xpState.level);

  // Mock stats for medals
  const stats = {
    streak: history.length > 0 ? history[history.length - 1].streak : 0,
    totalFocusHours: 0,
    bountiesCompleted: 0,
    prestigeCount: parseInt(localStorage.getItem('orbit_prestige_count') || '0')
  };
  const medals = useMedals(stats, showToast);

  const handlePrestigeReset = () => {
    resetProgress();
    resetTheme();
    actions.jettison(); // Reset tasks
    setShowPrestigeCeremony(true);
  };

  const prestige = usePrestige(xpState.level, handlePrestigeReset);

  // Phase 9 Hooks
  const allTasks = [state.heavyLift, ...state.thrusters];
  const notifications = useNotifications(allTasks);
  const damage = useDamage(allTasks);
  const journal = useJournal();
  const [isBooting, setIsBooting] = useState(true);

  // Hyperdrive
  const hyperdrive = useHyperdrive((mode) => {
    if (mode === 'FOCUS') {
      playComplete();
      showToast('HYPERDRIVE CYCLE COMPLETE');
      addXP(50);
    }
  });

  // Update Status for Radar
  useEffect(() => {
    if (hyperdrive.isActive) {
      radar.updateStatus('HYPERDRIVE');
    } else if (state.status !== 'IDLE') {
      radar.updateStatus('ACTIVE');
    } else {
      radar.updateStatus('IDLE');
    }
  }, [hyperdrive.isActive, state.status, radar.updateStatus]);

  const [showArmory, setShowArmory] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showComms, setShowComms] = useState(false);
  const [showAlliance, setShowAlliance] = useState(false);
  const [showDockingBay, setShowDockingBay] = useState(false);
  const [showMedalCase, setShowMedalCase] = useState(false);
  const [showPrestigeCeremony, setShowPrestigeCeremony] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [journalMode, setJournalMode] = useState('LAUNCH');

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
        setShowAlliance(false);
        setShowDockingBay(false);
        setShowMedalCase(false);
        setShowJournal(false);
        cortex.setShowBriefing(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, hyperdrive, state.heavyLift.completed, cortex]);

  const handleHeavyLiftToggle = () => {
    actions.toggleHeavyLift();
    if (!state.heavyLift.completed) {
      addXP(XP_TABLE.HEAVY_LIFT);
      playComplete();
      playWarp();
      vibrate(50); // Haptic
      showToast(`+${XP_TABLE.HEAVY_LIFT} XP`);

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

  const handlePing = (uid) => {
    vibrate(10);
    showToast(`PING TRANSMITTED TO PILOT ${uid.slice(0, 4)}`);
  };

  const handleVoiceInput = (text) => {
    cortex.processInput(text);
  };

  const handleJournalSave = (data) => {
    journal.addEntry(journalMode, data);
    showToast(`${journalMode} LOG SAVED`);
  };

  const handleConvertToTask = (text) => {
    actions.setThruster(state.thrusters.length, text);
    showToast('SIDE THRUSTER ADDED');
  };

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

  useEffect(() => {
    if (levelUpEvent) {
      playLevelUp();
    }
  }, [levelUpEvent, playLevelUp]);

  // Request notification permission on first interaction
  useEffect(() => {
    if (isLocked && notifications.permission === 'default') {
      notifications.requestPermission();
    }
  }, [isLocked, notifications]);

  return (
    <div className={`min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 transition-colors duration-1000 pb-24 md:pb-4 ${damage.damageLevel === 'CRITICAL' ? 'bg-red-950 animate-pulse' : 'bg-[var(--color-bg)]'
      }`}>

      <AnimatePresence>
        {isBooting && (
          <BootSequence
            onComplete={() => setIsBooting(false)}
            themeName={theme.name}
          />
        )}
      </AnimatePresence>

      {/* Screen Shake Effect */}
      <AnimatePresence>
        {damage.shake && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none border-4 border-red-500"
            initial={{ x: -10 }}
            animate={{ x: 10 }}
            exit={{ x: 0 }}
            transition={{ repeat: 5, duration: 0.05 }}
          />
        )}
      </AnimatePresence>

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
          onClick={() => {
            setJournalMode('LAUNCH');
            setShowJournal(true);
          }}
          className="text-slate-500 hover:text-[var(--color-primary)] transition-colors"
          title="Captain's Log"
        >
          <FileText size={20} />
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
          onClick={() => setShowAlliance(true)}
          className="text-slate-500 hover:text-[var(--color-primary)] transition-colors"
          title="Alliance Hall"
        >
          <Users size={20} />
        </button>
        <button
          onClick={() => setShowDockingBay(true)}
          className={`transition-colors ${Object.values(subspace.connections).some(Boolean) ? 'text-green-500' : 'text-slate-500 hover:text-[var(--color-primary)]'
            }`}
          title="The Docking Bay"
        >
          <Server size={20} />
        </button>
        <button
          onClick={() => setShowMedalCase(true)}
          className="text-slate-500 hover:text-[var(--color-primary)] transition-colors"
          title="Medal Case"
        >
          <Award size={20} />
        </button>
        <button
          onClick={() => setShowArmory(true)}
          className="text-slate-500 hover:text-[var(--color-primary)] transition-colors"
          title="The Armory"
        >
          <Settings size={20} />
        </button>
        <button
          onClick={notifications.requestPermission}
          className={`transition-colors ${notifications.permission === 'granted' ? 'text-green-500' : 'text-slate-500 hover:text-[var(--color-primary)]'
            }`}
          title="Notifications"
        >
          <Bell size={20} />
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
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast key={toast.id} message={toast.msg} />
          ))}
        </AnimatePresence>

        {/* Season Track */}
        {!isLocked && (
          <SeasonTrack
            season={seasons.currentSeason}
            progress={seasons.seasonProgress}
            daysRemaining={seasons.daysRemaining}
          />
        )}

        <div onMouseEnter={playHover} className={hyperdrive.isActive ? 'opacity-20 blur-sm transition-all' : 'transition-all'}>
          <IdentityLock
            identity={state.identity}
            setIdentity={actions.setIdentity}
            lockIdentity={actions.lockIdentity}
            isLocked={isLocked}
          />
        </div>

        <div onMouseEnter={playHover} className={hyperdrive.isActive ? 'opacity-20 blur-sm transition-all' : 'transition-all'}>
          <div className="relative w-full">
            <SingularityGoal
              goal={state.heavyLift}
              setGoal={actions.setHeavyLift}
              toggleGoal={handleHeavyLiftToggle}
              isLocked={isLocked}
            />
            {!isLocked && (
              <div className="absolute right-[-40px] top-1/2 -translate-y-1/2">
                <VoiceComms onInput={handleVoiceInput} />
              </div>
            )}
          </div>
        </div>

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

        <div onMouseEnter={playHover} className={hyperdrive.isActive ? 'opacity-0 pointer-events-none transition-all' : 'transition-all'}>
          <ThrusterBank
            thrusters={state.thrusters}
            setThruster={actions.setThruster}
            toggleThruster={handleThrusterToggle}
            isLocked={isLocked}
          />
        </div>
      </div>

      <div className={hyperdrive.isActive ? 'opacity-0 transition-all' : 'transition-all'}>
        <MissionLog history={history} isLocked={isLocked} />
      </div>

      <div className="relative" onMouseEnter={() => setShowImpact(true)} onMouseLeave={() => setShowImpact(false)}>
        <ImpactPredictor
          isOpen={showImpact && isLocked}
          consequences={[
            "Break 12-day Streak",
            "Reduce Hull Integrity by 15%",
            "Lock 'Veteran' Badge for 7 days"
          ]}
        />
        <JettisonControl
          onJettison={() => {
            damage.triggerShake();
            actions.jettison();
          }}
          isLocked={isLocked}
        />
      </div>

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
      >
        <div className="mt-8">
          <ConsistencyGraph />
        </div>
      </DataTerminal>

      <LogTerminal
        isOpen={showJournal}
        onClose={() => setShowJournal(false)}
        mode={journalMode}
        template={journal.TEMPLATES[journalMode]}
        onSave={handleJournalSave}
        onConvertToTask={handleConvertToTask}
      />

      <CommsPanel
        isOpen={showComms}
        onClose={() => setShowComms(false)}
        holonet={holonet}
      />

      <AllianceHall
        isOpen={showAlliance}
        onClose={() => setShowAlliance(false)}
        fleet={fleet}
        user={holonet.user}
      />

      <DockingBay
        isOpen={showDockingBay}
        onClose={() => setShowDockingBay(false)}
        connections={subspace.connections}
        onToggle={subspace.toggleConnection}
      />

      <MedalCase
        isOpen={showMedalCase}
        onClose={() => setShowMedalCase(false)}
        medals={medals.medals}
        unlockedIds={medals.unlockedMedals}
      />

      <IncomingTransmission
        data={subspace.incomingTransmission}
        onClear={subspace.clearTransmission}
      />

      <TacticalBriefing
        isOpen={cortex.showBriefing}
        onClose={() => cortex.setShowBriefing(false)}
        content={cortex.weeklyReview}
      />

      <NavCore
        status={cortex.status}
        message={cortex.message}
        onInput={cortex.processInput}
      />

      {/* Prestige Trigger (Hidden unless eligible) */}
      {prestige.isPrestigeAvailable && !isLocked && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={prestige.triggerPrestige}
          className="fixed bottom-8 right-8 z-50 bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] uppercase tracking-widest"
        >
          INITIATE PRESTIGE
        </motion.button>
      )}

      <AnimatePresence>
        {showPrestigeCeremony && (
          <PrestigeCeremony onComplete={() => setShowPrestigeCeremony(false)} />
        )}
      </AnimatePresence>

      {fleet.wing && (
        <>
          <RadarScope
            squadStatus={radar.squadStatus}
            onPing={handlePing}
          />
          <WingComms
            feed={[]} // Placeholder for now
          />
        </>
      )}

      {/* Timeline Horizon (Desktop Footer) */}
      {!isMobile && (
        <TimelineHorizon events={subspace.timelineEvents} />
      )}

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
