import HUDNovaX from "@/components/HUDNovaX";
import NovaXChat from "@/components/NovaXChat";
import XScannrPanel from "@/components/XScannrPanel";
import PokumanCardTest from "@/components/PokumanCardTest";
import MissionSelector from "@/components/MissionSelector";
import PortalMap from "@/components/PortalMap";
import FrequencyTracker from "@/components/FrequencyTracker";
import TimeCodeDisplay from "@/components/TimeCodeDisplay";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black p-6 space-y-10">
      {/* ✦ HUD NOVAX */}
      <HUDNovaX />

      {/* ✦ CHAT NOVAX */}
      <div className="flex justify-center">
        <NovaXChat />
      </div>

      {/* ✦ SCAN PLAYER */}
      <XScannrPanel />

      {/* ✦ POKUMAN CARD EXAMPLE */}
      <PokumanCardTest />

      {/* ✦ MISSIONS IRL */}
      <MissionSelector />

      {/* ✦ PORTAIL MAP */}
      <PortalMap />

      {/* ✦ FREQUENCY TRACKER */}
      <FrequencyTracker />

      {/* ✦ TIMECODE DECODER (Always floating) */}
      <TimeCodeDisplay />
    </div>
  );
}
