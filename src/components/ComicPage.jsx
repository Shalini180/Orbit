import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Newspaper, PenTool, GraduationCap, Landmark, ShoppingBag } from 'lucide-react';
import TheSidekick from './TheSidekick';
import ConsistencyMountain from './ConsistencyMountain';
import ConsequenceBalloon from './ConsequenceBalloon';
import RoguesGallery from './RoguesGallery';
import TheLair from './TheLair';
import ShareOverlay from './ShareOverlay';
import CoverArt from './CoverArt';
import { useSidekick } from '../hooks/useSidekick';
import { useComicEvents } from '../hooks/useComicEvents';
import { useSidekickVariant } from '../hooks/useSidekickVariant';
import HeroAvatar from './HeroAvatar';
import DNAHelix from './DNAHelix';
import TagManager from './TagManager';
import OriginComic from './OriginComic';
import VillainCreator from './VillainCreator';
import StoryBoard from './StoryBoard';
import TheNewsstand from './TheNewsstand';
import AcademyHall from './AcademyHall';
import TheDangerRoom from './TheDangerRoom';
import GraduationStage from './GraduationStage';
import TheBank from './TheBank';
import TheBlackMarket from './TheBlackMarket';
import SupporterBadge from './SupporterBadge';


const ComicPage = ({
    state,
    actions,
    history,
    addXP,
    showToast,
    villains,
    activeVillain,
    onSwitchVillain,
    onCombatHit,
    // Phase 11 Props
    credits,
    addCredits,
    spendCredits,
    lairState,
    cleanliness,
    placeItem,
    moveItem,
    removeItem,
    unlockItem,
    medals,
    // Phase 12 Props
    archive,
    saveIssue,
    generateComic,
    xpState,
    // Phase 13 Props
    activeDimension,
    // Phase 14 Props
    attributes,
    activePowers,
    addTagMapping,
    tagMap,
    // Phase 15 Props
    creator,
    newsstand,
    // Phase 17 Props
    mentorship,
    curriculum,
    // Phase 18 Props
    license,
    economy
}) => {
    const allTasks = [state.heavyLift, ...state.thrusters];
    const { mood, message, interact } = useSidekick(allTasks, 5);
    const { event } = useComicEvents(allTasks);
    const sidekickVariant = useSidekickVariant(activeDimension?.type || 'DEFAULT');

    const [hoveredTask, setHoveredTask] = useState(null);
    const [showLair, setShowLair] = useState(false);

    // Phase 12 State
    const [showDailyIssue, setShowDailyIssue] = useState(false);
    const [showLongbox, setShowLongbox] = useState(false);
    const [currentIssue, setCurrentIssue] = useState(null);

    // Phase 14 State
    const [showTagManager, setShowTagManager] = useState(false);
    const [showOriginComic, setShowOriginComic] = useState(false);

    // Phase 15 State
    const [showCreatorStudio, setShowCreatorStudio] = useState(false);
    const [showNewsstand, setShowNewsstand] = useState(false);
    const [activeDraft, setActiveDraft] = useState(null); // ID of draft being edited

    // Phase 17 State
    const [showAcademy, setShowAcademy] = useState(false);
    const [showDangerRoom, setShowDangerRoom] = useState(false);
    const [showGraduation, setShowGraduation] = useState(false);

    // Phase 18 State
    const [showBank, setShowBank] = useState(false);
    const [showBlackMarket, setShowBlackMarket] = useState(false);

    const handleTaskComplete = (type, id, text) => {
        // Pass text to App.jsx wrapper for DNA processing
        actions.completeTask(type, id, text);

        // Award Credits
        addCredits(10);
        showToast("+10 HERO TOKENS");

        // Trigger Combat
        if (onCombatHit) {
            onCombatHit(type);
            // Check for villain defeat (simplified check)
            if (activeVillain && activeVillain.health <= 10) {
                addCredits(50);
                showToast("VILLAIN DEFEATED! +50 TOKENS");
            }
        }
    };

    const handleGenerateIssue = () => {
        const today = new Date().toLocaleDateString();
        const stats = {
            date: today,
            mainTask: state.heavyLift,
            villain: activeVillain ? { name: activeVillain.name, active: activeVillain.health > 0 } : null,
            xpEarned: 100, // Mock for now
            tokensEarned: 20, // Mock
            streak: history.length > 0 ? history[history.length - 1].streak : 0
        };

        const newIssue = generateComic(stats);
        saveIssue(newIssue);
        setCurrentIssue(newIssue);
        setShowDailyIssue(true);
    };

    const handleOpenIssue = (issue) => {
        setCurrentIssue(issue);
        setShowDailyIssue(true);
    };

    return (
        <div className="min-h-screen bg-dots p-4 md:p-8 font-sans overflow-y-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* Header / Title Panel */}
                <div className="col-span-1 md:col-span-12 bg-white comic-panel flex justify-between items-center transform -rotate-1 relative overflow-visible">
                    <div className="flex items-center gap-4">
                        {/* Avatar Section */}
                        <div className="relative -mt-8 -ml-4 z-10">
                            <HeroAvatar attributes={attributes} />
                        </div>
                        <div>
                            <h1 className="font-comic text-4xl md:text-6xl text-black leading-none flex items-center">
                                THE ADVENTURES OF <span className="text-cyan-500 ml-2">COMMANDER</span>
                                <SupporterBadge isPremium={license.isPremium} />
                            </h1>
                            <div className="flex gap-2 mt-2">
                                {activePowers && activePowers.map(power => (
                                    <span key={power.id} className="bg-black text-white px-2 py-1 text-xs font-bold rounded flex items-center gap-1" title={power.description}>
                                        {power.icon} {power.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowTagManager(true)}
                            className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 font-bold comic-border hover:scale-105 transition-transform"
                            title="Mutagen Lab (Tag Manager)"
                        >
                            🧬
                        </button>
                        <button
                            onClick={() => setShowAcademy(true)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 font-bold comic-border hover:scale-105 transition-transform"
                            title="The Academy"
                        >
                            <GraduationCap size={20} />
                        </button>
                        <button
                            onClick={() => setShowBank(true)}
                            className="bg-green-700 hover:bg-green-600 text-white px-3 py-2 font-bold comic-border hover:scale-105 transition-transform"
                            title="The Bank"
                        >
                            <Landmark size={20} />
                        </button>
                        <button
                            onClick={() => setShowBlackMarket(true)}
                            className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-2 font-bold comic-border hover:scale-105 transition-transform"
                            title="The Black Market"
                        >
                            <ShoppingBag size={20} />
                        </button>
                        <button
                            onClick={() => setShowCreatorStudio(true)}
                            className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 font-bold comic-border hover:scale-105 transition-transform"
                            title="The Creator's Studio"
                        >
                            <PenTool size={20} />
                        </button>
                        <button
                            onClick={() => setShowNewsstand(true)}
                            className="bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-2 font-bold comic-border hover:scale-105 transition-transform"
                            title="The Newsstand"
                        >
                            NEWS
                        </button>
                        <button
                            onClick={() => setShowLongbox(true)}
                            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 font-bold comic-border rotate-1 hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <BookOpen size={20} /> LONGBOX
                        </button>
                        <button
                            onClick={handleGenerateIssue}
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 font-bold comic-border -rotate-1 hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <Newspaper size={20} /> DAILY ISSUE
                        </button>
                        <button
                            onClick={() => setShowLair(true)}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 font-bold comic-border -rotate-2 hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <Home size={20} /> SECRET LAIR
                        </button>
                    </div>
                </div>

                {/* DNA Helix Panel (New Side Panel) */}
                <div className="col-span-1 md:col-span-3">
                    <DNAHelix attributes={attributes} />
                </div>

                {/* Main Task (Heavy Lift) */}
                <div className="col-span-1 md:col-span-5 bg-white comic-panel min-h-[300px] flex flex-col justify-center items-center relative group">
                    <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 font-bold text-sm">
                        PANEL 1: THE MISSION
                    </div>

                    <h2 className="text-2xl font-bold mb-4 text-center uppercase tracking-widest text-gray-500">
                        Current Objective
                    </h2>

                    <div className="text-4xl md:text-5xl font-comic text-center mb-8 max-w-lg leading-tight">
                        {state.heavyLift.text || "NO MISSION SELECTED"}
                    </div>

                    <button
                        onClick={() => handleTaskComplete('HEAVY_LIFT', null, state.heavyLift.text)}
                        className={`comic-button text-2xl ${state.heavyLift.completed ? 'bg-green-400 hover:bg-green-300' : ''}`}
                    >
                        {state.heavyLift.completed ? "MISSION ACCOMPLISHED!" : "COMPLETE MISSION"}
                    </button>

                    {/* Consequence Balloon on Hover of Delete (Mock) */}
                    <div
                        className="absolute top-4 right-4 text-red-500 cursor-pointer"
                        onMouseEnter={() => setHoveredTask('HEAVY')}
                        onMouseLeave={() => setHoveredTask(null)}
                    >
                        <span className="font-bold text-xs">ABORT?</span>
                        <ConsequenceBalloon isVisible={hoveredTask === 'HEAVY'} />
                    </div>
                </div>

                {/* Sidekick Panel */}
                <div className="col-span-1 md:col-span-4 bg-cyan-100 comic-panel flex flex-col items-center justify-center relative">
                    <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 font-bold text-sm">
                        PANEL 2: THE SIDEKICK
                    </div>
                    <TheSidekick
                        mood={mood}
                        message={event?.message || message}
                        onClick={interact}
                        variant={sidekickVariant}
                    />
                </div>

                {/* Side Thrusters */}
                <div className="col-span-1 md:col-span-6 bg-fuchsia-100 comic-panel">
                    <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 font-bold text-sm">
                        PANEL 3: SIDE QUESTS
                    </div>
                    <div className="mt-8 space-y-4">
                        {state.thrusters.map(t => (
                            <div key={t.id} className="bg-white p-3 comic-border flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-transform" onClick={() => handleTaskComplete('THRUSTER', t.id, t.text)}>
                                <div className={`w-6 h-6 border-2 border-black ${t.completed ? 'bg-black' : 'bg-white'}`} />
                                <span className={`font-bold ${t.completed ? 'line-through opacity-50' : ''}`}>{t.text}</span>
                            </div>
                        ))}
                        {state.thrusters.length === 0 && (
                            <div className="text-center opacity-50 font-bold italic">NO SIDE QUESTS ACTIVE</div>
                        )}
                    </div>
                </div>

                {/* Rogues Gallery */}
                <div className="col-span-1 md:col-span-6">
                    {villains && (
                        <RoguesGallery
                            villains={villains}
                            activeVillain={activeVillain}
                            onSwitch={onSwitchVillain}
                            onDamage={onCombatHit}
                        />
                    )}
                </div>

                {/* Consistency Mountain */}
                <div className="col-span-1 md:col-span-12">
                    <ConsistencyMountain history={history} />
                </div>

            </div>

            {/* The Secret Lair Overlay */}
            <AnimatePresence>
                {showLair && (
                    <TheLair
                        onClose={() => setShowLair(false)}
                        credits={credits}
                        addCredits={addCredits}
                        spendCredits={spendCredits}
                        lairState={lairState}
                        cleanliness={cleanliness}
                        placeItem={placeItem}
                        moveItem={moveItem}
                        removeItem={removeItem}
                        unlockItem={unlockItem}
                        medals={medals}
                    />
                )}
            </AnimatePresence>

            {/* Daily Issue / Share Overlay */}
            <AnimatePresence>
                {showDailyIssue && currentIssue && (
                    <ShareOverlay
                        issueData={currentIssue}
                        onClose={() => setShowDailyIssue(false)}
                    />
                )}
            </AnimatePresence>

            {/* The Longbox (Archive) Overlay */}
            <AnimatePresence>
                {showLongbox && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-md p-8 overflow-y-auto"
                    >
                        <div className="max-w-6xl mx-auto">
                            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                                <h2 className="text-4xl font-black text-white italic tracking-tighter">THE LONGBOX</h2>
                                <button onClick={() => setShowLongbox(false)} className="text-slate-400 hover:text-white">
                                    <span className="text-xl font-bold">CLOSE X</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {archive.map((issue, index) => (
                                    <CoverArt
                                        key={index}
                                        issue={issue}
                                        onClick={() => handleOpenIssue(issue)}
                                    />
                                ))}
                                {archive.length === 0 && (
                                    <div className="col-span-full text-center py-20 text-slate-500 font-mono">
                                        NO ISSUES FOUND. GENERATE YOUR FIRST DAILY ISSUE!
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tag Manager Overlay */}
            <AnimatePresence>
                {showTagManager && (
                    <TagManager
                        tagMap={tagMap}
                        onAddMapping={addTagMapping}
                        onClose={() => setShowTagManager(false)}
                    />
                )}
            </AnimatePresence>

            {/* Origin Comic Overlay (Milestone) */}
            <AnimatePresence>
                {showOriginComic && (
                    <OriginComic
                        attribute="MIGHT" // Mock for now
                        level={5}
                        onClose={() => setShowOriginComic(false)}
                    />
                )}
            </AnimatePresence>

            {/* Phase 15: Creator Studio Overlays */}
            <AnimatePresence>
                {showCreatorStudio && !activeDraft && (
                    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white max-w-2xl w-full p-8 rounded-xl comic-border text-center"
                        >
                            <h2 className="text-4xl font-black italic mb-8">THE CREATOR'S STUDIO</h2>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <button
                                    onClick={() => {
                                        const id = creator.createDraft('VILLAIN');
                                        setActiveDraft({ id, type: 'VILLAIN' });
                                    }}
                                    className="bg-red-100 hover:bg-red-200 p-8 border-4 border-black rounded-lg group"
                                >
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">😈</div>
                                    <h3 className="text-2xl font-black uppercase">Create Villain</h3>
                                    <p className="text-sm font-bold text-slate-500">Design a new nemesis</p>
                                </button>
                                <button
                                    onClick={() => {
                                        const id = creator.createDraft('ARC');
                                        setActiveDraft({ id, type: 'ARC' });
                                    }}
                                    className="bg-blue-100 hover:bg-blue-200 p-8 border-4 border-black rounded-lg group"
                                >
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📜</div>
                                    <h3 className="text-2xl font-black uppercase">Write Story Arc</h3>
                                    <p className="text-sm font-bold text-slate-500">Script a new quest line</p>
                                </button>
                            </div>

                            {/* Drafts List */}
                            {creator.drafts.length > 0 && (
                                <div className="text-left">
                                    <h4 className="font-bold border-b-2 border-black mb-4">YOUR DRAFTS</h4>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {creator.drafts.map(draft => (
                                            <div key={draft.id} className="flex justify-between items-center bg-slate-100 p-2 border border-slate-300">
                                                <span className="font-bold">{draft.name} ({draft.type})</span>
                                                <button
                                                    onClick={() => setActiveDraft({ id: draft.id, type: draft.type })}
                                                    className="text-xs bg-black text-white px-2 py-1 font-bold hover:bg-slate-700"
                                                >
                                                    EDIT
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button onClick={() => setShowCreatorStudio(false)} className="mt-8 text-slate-500 font-bold hover:text-black">
                                CLOSE STUDIO
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Active Editor */}
            <AnimatePresence>
                {showCreatorStudio && activeDraft && activeDraft.type === 'VILLAIN' && (
                    <VillainCreator
                        draft={creator.drafts.find(d => d.id === activeDraft.id)}
                        onUpdate={creator.updateDraft}
                        onSave={creator.updateDraft} // Auto-save on manual save click too
                        onDelete={(id) => { creator.deleteDraft(id); setActiveDraft(null); }}
                        onPublish={(id) => { creator.publishContent(id); setActiveDraft(null); }}
                        onClose={() => setActiveDraft(null)}
                    />
                )}
                {showCreatorStudio && activeDraft && activeDraft.type === 'ARC' && (
                    <StoryBoard
                        draft={creator.drafts.find(d => d.id === activeDraft.id)}
                        onUpdate={creator.updateDraft}
                        onSave={creator.updateDraft}
                        onDelete={(id) => { creator.deleteDraft(id); setActiveDraft(null); }}
                        onPublish={(id) => { creator.publishContent(id); setActiveDraft(null); }}
                        onClose={() => setActiveDraft(null)}
                    />
                )}
            </AnimatePresence>

            {/* Newsstand Overlay */}
            <AnimatePresence>
                {showNewsstand && (
                    <TheNewsstand
                        feed={newsstand.feed}
                        subscriptions={newsstand.subscriptions}
                        onSubscribe={newsstand.subscribe}
                        onClose={() => setShowNewsstand(false)}
                    />
                )}
            </AnimatePresence>
            {/* Phase 17: The Academy Overlays */}
            <AnimatePresence>
                {showAcademy && (
                    <AcademyHall
                        status={mentorship.status}
                        role={mentorship.role}
                        partner={mentorship.partner}
                        onFindMatch={mentorship.findMatch}
                        onSignOath={mentorship.signOath}
                        onClose={() => setShowAcademy(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showDangerRoom && (
                    <TheDangerRoom
                        partner={mentorship.partner}
                        onClose={() => setShowDangerRoom(false)}
                    />

                )}
            </AnimatePresence>

            {/* Daily Issue / Share Overlay */}
            <AnimatePresence>
                {showDailyIssue && currentIssue && (
                    <ShareOverlay
                        issueData={currentIssue}
                        onClose={() => setShowDailyIssue(false)}
                    />
                )}
            </AnimatePresence>

            {/* The Longbox (Archive) Overlay */}
            <AnimatePresence>
                {showLongbox && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-md p-8 overflow-y-auto"
                    >
                        <div className="max-w-6xl mx-auto">
                            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                                <h2 className="text-4xl font-black text-white italic tracking-tighter">THE LONGBOX</h2>
                                <button onClick={() => setShowLongbox(false)} className="text-slate-400 hover:text-white">
                                    <span className="text-xl font-bold">CLOSE X</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {archive.map((issue, index) => (
                                    <CoverArt
                                        key={index}
                                        issue={issue}
                                        onClick={() => handleOpenIssue(issue)}
                                    />
                                ))}
                                {archive.length === 0 && (
                                    <div className="col-span-full text-center py-20 text-slate-500 font-mono">
                                        NO ISSUES FOUND. GENERATE YOUR FIRST DAILY ISSUE!
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tag Manager Overlay */}
            <AnimatePresence>
                {showTagManager && (
                    <TagManager
                        tagMap={tagMap}
                        onAddMapping={addTagMapping}
                        onClose={() => setShowTagManager(false)}
                    />
                )}
            </AnimatePresence>

            {/* Origin Comic Overlay (Milestone) */}
            <AnimatePresence>
                {showOriginComic && (
                    <OriginComic
                        attribute="MIGHT" // Mock for now
                        level={5}
                        onClose={() => setShowOriginComic(false)}
                    />
                )}
            </AnimatePresence>

            {/* Phase 15: Creator Studio Overlays */}
            <AnimatePresence>
                {showCreatorStudio && !activeDraft && (
                    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white max-w-2xl w-full p-8 rounded-xl comic-border text-center"
                        >
                            <h2 className="text-4xl font-black italic mb-8">THE CREATOR'S STUDIO</h2>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <button
                                    onClick={() => {
                                        const id = creator.createDraft('VILLAIN');
                                        setActiveDraft({ id, type: 'VILLAIN' });
                                    }}
                                    className="bg-red-100 hover:bg-red-200 p-8 border-4 border-black rounded-lg group"
                                >
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">😈</div>
                                    <h3 className="text-2xl font-black uppercase">Create Villain</h3>
                                    <p className="text-sm font-bold text-slate-500">Design a new nemesis</p>
                                </button>
                                <button
                                    onClick={() => {
                                        const id = creator.createDraft('ARC');
                                        setActiveDraft({ id, type: 'ARC' });
                                    }}
                                    className="bg-blue-100 hover:bg-blue-200 p-8 border-4 border-black rounded-lg group"
                                >
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📜</div>
                                    <h3 className="text-2xl font-black uppercase">Write Story Arc</h3>
                                    <p className="text-sm font-bold text-slate-500">Script a new quest line</p>
                                </button>
                            </div>

                            {/* Drafts List */}
                            {creator.drafts.length > 0 && (
                                <div className="text-left">
                                    <h4 className="font-bold border-b-2 border-black mb-4">YOUR DRAFTS</h4>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {creator.drafts.map(draft => (
                                            <div key={draft.id} className="flex justify-between items-center bg-slate-100 p-2 border border-slate-300">
                                                <span className="font-bold">{draft.name} ({draft.type})</span>
                                                <button
                                                    onClick={() => setActiveDraft({ id: draft.id, type: draft.type })}
                                                    className="text-xs bg-black text-white px-2 py-1 font-bold hover:bg-slate-700"
                                                >
                                                    EDIT
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button onClick={() => setShowCreatorStudio(false)} className="mt-8 text-slate-500 font-bold hover:text-black">
                                CLOSE STUDIO
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Active Editor */}
            <AnimatePresence>
                {showCreatorStudio && activeDraft && activeDraft.type === 'VILLAIN' && (
                    <VillainCreator
                        draft={creator.drafts.find(d => d.id === activeDraft.id)}
                        onUpdate={creator.updateDraft}
                        onSave={creator.updateDraft} // Auto-save on manual save click too
                        onDelete={(id) => { creator.deleteDraft(id); setActiveDraft(null); }}
                        onPublish={(id) => { creator.publishContent(id); setActiveDraft(null); }}
                        onClose={() => setActiveDraft(null)}
                    />
                )}
                {showCreatorStudio && activeDraft && activeDraft.type === 'ARC' && (
                    <StoryBoard
                        draft={creator.drafts.find(d => d.id === activeDraft.id)}
                        onUpdate={creator.updateDraft}
                        onSave={creator.updateDraft}
                        onDelete={(id) => { creator.deleteDraft(id); setActiveDraft(null); }}
                        onPublish={(id) => { creator.publishContent(id); setActiveDraft(null); }}
                        onClose={() => setActiveDraft(null)}
                    />
                )}
            </AnimatePresence>

            {/* Newsstand Overlay */}
            <AnimatePresence>
                {showNewsstand && (
                    <TheNewsstand
                        feed={newsstand.feed}
                        subscriptions={newsstand.subscriptions}
                        onSubscribe={newsstand.subscribe}
                        onClose={() => setShowNewsstand(false)}
                    />
                )}
            </AnimatePresence>
            {/* Phase 17: The Academy Overlays */}
            <AnimatePresence>
                {showAcademy && (
                    <AcademyHall
                        status={mentorship.status}
                        role={mentorship.role}
                        partner={mentorship.partner}
                        onFindMatch={mentorship.findMatch}
                        onSignOath={mentorship.signOath}
                        onClose={() => setShowAcademy(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showDangerRoom && (
                    <TheDangerRoom
                        partner={mentorship.partner}
                        onClose={() => setShowDangerRoom(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showGraduation && (
                    <GraduationStage
                        partner={mentorship.partner}
                        onClose={() => setShowGraduation(false)}
                    />
                )}
            </AnimatePresence>

            {/* Phase 18: Treasury Overlays */}
            <AnimatePresence>
                {showBank && (
                    <TheBank
                        walletBalance={credits}
                        bankBalance={economy.bankBalance}
                        onDeposit={(amount) => {
                            if (economy.deposit(amount)) {
                                spendCredits(amount);
                                return true;
                            }
                            return false;
                        }}
                        onWithdraw={(amount) => {
                            if (economy.withdraw(amount)) {
                                addCredits(amount);
                                return true;
                            }
                            return false;
                        }}
                        decayWarning={economy.checkDecay()}
                        onClose={() => setShowBank(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showBlackMarket && (
                    <TheBlackMarket
                        walletBalance={credits}
                        onBuy={(item) => {
                            spendCredits(item.price);
                            showToast(`ACQUIRED: ${item.name}`);
                        }}
                        onClose={() => setShowBlackMarket(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ComicPage;
