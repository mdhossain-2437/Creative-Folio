"use client";

import dynamic from "next/dynamic";

const CursorTrail = dynamic(() => import("@/components/ui/CursorTrail").then((m) => m.CursorTrail), { ssr: false });
const ShaderStorm = dynamic(() => import("@/components/ui/ShaderStorm").then((m) => m.ShaderStorm), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette), { ssr: false });
const CheatSheet = dynamic(() => import("@/components/ui/CheatSheet").then((m) => m.CheatSheet), { ssr: false });
const ShowreelModal = dynamic(() => import("@/components/ui/ShowreelModal").then((m) => m.ShowreelModal), { ssr: false });
const ToastHost = dynamic(() => import("@/components/ui/Toast").then((m) => m.ToastHost), { ssr: false });
const NavShortcuts = dynamic(() => import("@/components/ui/NavShortcuts").then((m) => m.NavShortcuts), { ssr: false });
const KonamiHint = dynamic(() => import("@/components/ui/KonamiHint").then((m) => m.KonamiHint), { ssr: false });
const ConsoleBanner = dynamic(() => import("@/components/ui/ConsoleBanner").then((m) => m.ConsoleBanner), { ssr: false });
const FaviconAnimator = dynamic(() => import("@/components/ui/FaviconAnimator").then((m) => m.FaviconAnimator), { ssr: false });
const Spotlight = dynamic(() => import("@/components/ui/Spotlight").then((m) => m.Spotlight), { ssr: false });
const SecretWordWatcher = dynamic(() => import("@/components/ui/SecretWordWatcher").then((m) => m.SecretWordWatcher), { ssr: false });
const ShareShortcut = dynamic(() => import("@/components/ui/ShareShortcut").then((m) => m.ShareShortcut), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress").then((m) => m.ScrollProgress), { ssr: false });
const TabTitleFlicker = dynamic(() => import("@/components/ui/TabTitleFlicker").then((m) => m.TabTitleFlicker), { ssr: false });
const FirstVisitNudge = dynamic(() => import("@/components/ui/FirstVisitNudge").then((m) => m.FirstVisitNudge), { ssr: false });

export function ClientOverlays() {
  return (
    <>
      <CursorTrail />
      <ShaderStorm />
      <CommandPalette />
      <CheatSheet />
      <ShowreelModal />
      <ToastHost />
      <NavShortcuts />
      <KonamiHint />
      <ConsoleBanner />
      <FaviconAnimator />
      <Spotlight />
      <SecretWordWatcher />
      <ShareShortcut />
      <ScrollProgress />
      <TabTitleFlicker />
      <FirstVisitNudge />
    </>
  );
}
