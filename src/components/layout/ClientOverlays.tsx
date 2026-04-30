"use client";

import dynamic from "next/dynamic";

const CursorTrail = dynamic(() => import("@/components/ui/CursorTrail").then((m) => m.CursorTrail), { ssr: false });
const ShaderStorm = dynamic(() => import("@/components/ui/ShaderStorm").then((m) => m.ShaderStorm), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette), { ssr: false });
const CheatSheet = dynamic(() => import("@/components/ui/CheatSheet").then((m) => m.CheatSheet), { ssr: false });
const ShowreelModal = dynamic(() => import("@/components/ui/ShowreelModal").then((m) => m.ShowreelModal), { ssr: false });

export function ClientOverlays() {
  return (
    <>
      <CursorTrail />
      <ShaderStorm />
      <CommandPalette />
      <CheatSheet />
      <ShowreelModal />
    </>
  );
}
