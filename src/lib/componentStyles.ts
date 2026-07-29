import type { CSSProperties } from "react";
import type { ComponentStyle } from "@/store/editor";

export type StyleTokens = {
  name: ComponentStyle;
  label: string;
  fontFamily: string;
  bg: string; // container background
  surface: string; // inner surfaces (inputs, options, tracks)
  fg: string; // primary text
  muted: string; // secondary text
  accent: string; // primary accent / brand color
  accentFg: string; // text on top of accent
  border: string; // css border shorthand for container
  innerBorder: string; // css border for inner surfaces
  radius: number; // corner radius in px
  radiusCss?: string; // overrides radius when present (sketch wobble)
  shadow: string; // container box-shadow
  backdrop?: string; // backdrop-filter (glass)
  palette: string[]; // chart palette
};

const TOKENS: Record<ComponentStyle, StyleTokens> = {
  cyber: {
    name: "cyber",
    label: "Cyber",
    fontFamily: "Orbitron, sans-serif",
    bg: "#0a0f1f",
    surface: "rgba(125,249,255,0.08)",
    fg: "#e8fdff",
    muted: "rgba(232,253,255,0.6)",
    accent: "#7df9ff",
    accentFg: "#0a0f1f",
    border: "2px solid #7df9ff",
    innerBorder: "1px solid rgba(125,249,255,0.35)",
    radius: 8,
    shadow: "0 0 18px rgba(125,249,255,0.45), inset 0 0 12px rgba(125,249,255,0.12)",
    palette: ["#7df9ff", "#ff0080", "#ffd84a", "#4d7cff", "#00ff88", "#b16bff"],
  },
  glass: {
    name: "glass",
    label: "Glass",
    fontFamily: "Inter, system-ui, sans-serif",
    bg: "rgba(255,255,255,0.18)",
    surface: "rgba(255,255,255,0.28)",
    fg: "#0a0f1f",
    muted: "rgba(10,15,31,0.6)",
    accent: "#4d7cff",
    accentFg: "#ffffff",
    border: "1px solid rgba(255,255,255,0.55)",
    innerBorder: "1px solid rgba(255,255,255,0.6)",
    radius: 20,
    shadow: "0 18px 40px rgba(0,0,0,0.22), inset 1px 1px 1px rgba(255,255,255,0.6)",
    backdrop: "blur(14px) saturate(160%)",
    palette: ["#4d7cff", "#00d9ff", "#7df9ff", "#a78bfa", "#34d399", "#fbbf24"],
  },
  neobrutalist: {
    name: "neobrutalist",
    label: "Neobrutalist",
    fontFamily: "'Archivo Black', system-ui, sans-serif",
    bg: "#fefce8",
    surface: "#ffffff",
    fg: "#0a0f1f",
    muted: "rgba(10,15,31,0.7)",
    accent: "#ffd84a",
    accentFg: "#0a0f1f",
    border: "3px solid #0a0f1f",
    innerBorder: "3px solid #0a0f1f",
    radius: 0,
    shadow: "6px 6px 0 #0a0f1f",
    palette: ["#ffd84a", "#ff0080", "#00e0a4", "#4d7cff", "#ff6b35", "#0a0f1f"],
  },
  sketch: {
    name: "sketch",
    label: "Sketch",
    fontFamily: "Georgia, 'Comic Sans MS', serif",
    bg: "#fffdf5",
    surface: "#fffdf5",
    fg: "#1a1a1a",
    muted: "rgba(26,26,26,0.6)",
    accent: "#ff6b6b",
    accentFg: "#ffffff",
    border: "2px solid #1a1a1a",
    innerBorder: "2px solid #1a1a1a",
    radius: 14,
    radiusCss: "255px 15px 225px 15px / 15px 225px 15px 255px",
    shadow: "3px 3px 0 rgba(26,26,26,0.18)",
    palette: ["#ff6b6b", "#4d96ff", "#ffd93d", "#6bcb77", "#c780fa", "#1a1a1a"],
  },
  xp: {
    name: "xp",
    label: "XP",
    fontFamily: "Tahoma, 'Segoe UI', sans-serif",
    bg: "#ece9d8",
    surface: "#ffffff",
    fg: "#000000",
    muted: "rgba(0,0,0,0.55)",
    accent: "#2f6fdb",
    accentFg: "#ffffff",
    border: "1px solid #0033a0",
    innerBorder: "1px solid #7f9db9",
    radius: 4,
    shadow: "0 2px 6px rgba(0,0,0,0.28)",
    palette: ["#2f6fdb", "#3aa655", "#e8a200", "#c1272d", "#6b4fbb", "#00849e"],
  },
};

export function styleTokens(style: ComponentStyle): StyleTokens {
  return TOKENS[style];
}

/** Container chrome shared by UI components and skinned quiz/chart/button. */
export function frameStyle(t: StyleTokens): CSSProperties {
  return {
    background: t.bg,
    color: t.fg,
    border: t.border,
    borderRadius: t.radiusCss ?? t.radius,
    boxShadow: t.shadow,
    fontFamily: t.fontFamily,
    ...(t.backdrop ? { backdropFilter: t.backdrop, WebkitBackdropFilter: t.backdrop } : {}),
  };
}
