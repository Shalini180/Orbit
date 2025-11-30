import React from 'react';
import { useOrbitEngine } from './hooks/useOrbitEngine';
import { useWarpDrive } from './hooks/useWarpDrive';
import StarfieldCanvas from './components/visuals/StarfieldCanvas';
import IdentityLock from './components/IdentityLock';
import SingularityGoal from './components/SingularityGoal';
import ThrusterBank from './components/ThrusterBank';
import JettisonControl from './components/JettisonControl';

function App() {
  const { state, actions } = useOrbitEngine();
  const velocity = useWarpDrive(state);

  const isLocked = state.status !== 'IDLE';

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Visual Engine */}
      <StarfieldCanvas velocity={velocity} />

      {/* HUD Layer */}
      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Header / Identity */}
        <IdentityLock
          identity={state.identity}
          setIdentity={actions.setIdentity}
          lockIdentity={actions.lockIdentity}
          isLocked={isLocked}
        />

        {/* Main Task (The Heavy Lift) */}
        <SingularityGoal
          goal={state.heavyLift}
          setGoal={actions.setHeavyLift}
          toggleGoal={actions.toggleHeavyLift}
          isLocked={isLocked}
        />

        {/* Secondary Tasks (Thrusters) */}
        <ThrusterBank
          thrusters={state.thrusters}
          setThruster={actions.setThruster}
          toggleThruster={actions.toggleThruster}
          isLocked={isLocked}
        />
      </div>

      {/* Controls */}
      <JettisonControl
        onJettison={actions.jettison}
        isLocked={isLocked}
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
