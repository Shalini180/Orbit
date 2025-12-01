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
import { useAutoPilot } from './hooks/useAutoPilot';
import { useVillains } from './hooks/useVillains';
import { useCombat } from './hooks/useCombat';
import { useCredits } from './hooks/useCredits';
import { useLair } from './hooks/useLair';
import { useArchive } from './hooks/useArchive';
import { useComicGen } from './hooks/useComicGen';
import { useDimensions } from './hooks/useDimensions';
import { useGenetics } from './hooks/useGenetics';
import { usePowers } from './hooks/usePowers';
import { useCreator } from './hooks/useCreator';
import { useNewsstand } from './hooks/useNewsstand';
import { useMentorship } from './hooks/useMentorship';
import { useCurriculum } from './hooks/useCurriculum';
import { useHeroLicense } from './hooks/useHeroLicense';
import { useEconomy } from './hooks/useEconomy';

import ComicPage from './components/ComicPage';
import SplashIntro from './components/SplashIntro';

import DimensionalRift from './components/DimensionalRift';
import WorldAnchor from './components/WorldAnchor';

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
  // Phase 13 Hooks (Must be first to provide context)
  const { dimensions, activeDimension, activeDimensionId, switchDimension } = useDimensions();

  // Core Engine now depends on activeDimensionId
  const { state, actions } = useOrbitEngine(activeDimensionId);

  const velocity = useWarpDrive(state);
  const { xpState, addXP, levelUpEvent, clearLevelUpEvent, progress, resetProgress, XP_TABLE } = useGamification();
  const { history, logDailyActivity } = useCaptainsLog();
  const { isEnabled: audioEnabled, toggleAudio, playHover, playComplete, playWarp, playLevelUp } = useAudioSystem();
  const { currentTheme, availableThemes, resetTheme } = useTheme();
  const theme = availableThemes[currentTheme];

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

  // Auto-Pilot Demo
  const autoPilot = useAutoPilot({
    addXP,
    setShowArmory,
    setShowTerminal,
    setShowJournal,
    completeTask: () => {
      // Find first incomplete task
      if (!state.heavyLift.completed) {
        actions.setHeavyLift({ ...state.heavyLift, completed: true });
      } else {
        const firstIncomplete = state.thrusters.find(t => !t.completed);
        if (firstIncomplete) {
          actions.setThruster(firstIncomplete.id, { ...firstIncomplete, completed: true });
        }
      }
    },
    showToast
  });

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

  // Phase 10 Hooks
  const { villains, activeVillain, damageVillain, switchVillain } = useVillains();
  const { registerHit } = useCombat(damageVillain, addXP, showToast);

  // Phase 11 Hooks
  const { credits, addCredits, spendCredits } = useCredits();
  const { lairState, cleanliness, placeItem, moveItem, removeItem, unlockItem, setAmbiance } = useLair(history);

  // Phase 12 Hooks
  const { archive, saveIssue, getIssue } = useArchive();
  const { generateComic } = useComicGen();
  // Phase 14 Hooks
  const { attributes, processTask, addTagMapping, tagMap } = useGenetics();
  const { activePowers, hasPower } = usePowers(attributes);

  // Phase 17: The Academy
  const mentorship = useMentorship(xpState.level, attributes ? (attributes.MIND > 5 ? 'MIND' : 'MIGHT') : 'MIGHT');
  const curriculum = useCurriculum(mentorship.status === 'MATCHED');

  // Phase 18: The Treasury
  const license = useHeroLicense();
  const economyState = useEconomy(credits, () => { });

  // Phase 15 Hooks
  const { drafts, published, createDraft, updateDraft, deleteDraft, publishContent } = useCreator();
  const { feed, subscriptions, subscribe, unsubscribe, isSubscribed } = useNewsstand();

  // Enhanced Task Completion Wrapper
  const handleTaskComplete = (type, id, text) => {
    // Process DNA
    processTask(text);

    // Original Logic
    if (type === 'HEAVY_LIFT') {
      handleHeavyLiftToggle();
    } else {
      handleThrusterToggle(id);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isBooting && (
          <SplashIntro onComplete={() => setIsBooting(false)} />
        )}
      </AnimatePresence>

      {!isBooting && (
        <>
          <ComicPage
            state={state}
            actions={{
              ...actions,
              completeTask: handleTaskComplete // Override with wrapped function
            }}
            history={history}
            addXP={addXP}
            showToast={showToast}
            villains={villains}
            activeVillain={activeVillain}
            onSwitchVillain={switchVillain}
            onCombatHit={registerHit}
            // Phase 11 Props
            credits={credits}
            addCredits={addCredits}
            spendCredits={spendCredits}
            lairState={lairState}
            cleanliness={cleanliness}
            placeItem={placeItem}
            moveItem={moveItem}
            removeItem={removeItem}
            unlockItem={unlockItem}
            medals={medals.medals.filter(m => medals.unlockedMedals.includes(m.id))}
            // Phase 17 Props
            mentorship={mentorship}
            curriculum={curriculum}
            // Phase 18 Props
            license={license}
            economy={economyState}
            // Phase 12 Props
            archive={archive}
            saveIssue={saveIssue}
            generateComic={generateComic}
            xpState={xpState} // Needed for comic stats
            // Phase 13 Props
            activeDimension={activeDimension}
            // Phase 14 Props
            attributes={attributes}
            activePowers={activePowers}
            addTagMapping={addTagMapping}
            tagMap={tagMap}
            // Phase 15 Props
            creator={{ drafts, published, createDraft, updateDraft, deleteDraft, publishContent }}
            newsstand={{ feed, subscriptions, subscribe, unsubscribe, isSubscribed }}
          />

          <DimensionalRift
            dimensions={dimensions}
            activeDimensionId={activeDimensionId}
            onSwitch={switchDimension}
          />

          <WorldAnchor activeDimension={activeDimension} />
        </>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast key={toast.id} message={toast.msg} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <OrbitrApp />
    </ThemeProvider>
  );
}
