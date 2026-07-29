import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import type { UIElement } from "@/store/editor";
import { styleTokens, frameStyle } from "@/lib/componentStyles";

export function UIRender({ element }: { element: UIElement }) {
  const t = styleTokens(element.style);
  const frame = frameStyle(t);

  const pad = "6%";
  const base: CSSProperties = {
    width: "100%",
    height: "100%",
    fontFamily: t.fontFamily,
    overflow: "hidden",
    boxSizing: "border-box",
  };

  switch (element.ui) {
    case "card":
      return (
        <div style={{ ...base, ...frame, padding: pad, display: "flex", flexDirection: "column", gap: "6%" }}>
          <div style={{ fontSize: "clamp(14px, 12%, 40px)", fontWeight: 800, lineHeight: 1.15 }}>
            {element.title}
          </div>
          <div style={{ fontSize: "clamp(11px, 7%, 22px)", color: t.muted, lineHeight: 1.4, flex: 1 }}>
            {element.text}
          </div>
        </div>
      );

    case "button":
      return (
        <div style={{ ...base, display: "grid", placeItems: "center" }}>
          <div
            style={{
              ...frame,
              background: t.accent,
              color: t.accentFg,
              border: t.border,
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              fontSize: "clamp(13px, 32%, 34px)",
              fontWeight: 700,
              letterSpacing: t.name === "cyber" ? "0.08em" : "0",
              textTransform: t.name === "cyber" ? "uppercase" : "none",
            }}
          >
            {element.text}
          </div>
        </div>
      );

    case "input":
      return (
        <div style={{ ...base, display: "flex", flexDirection: "column", gap: "8%", justifyContent: "center" }}>
          <div style={{ fontSize: "clamp(11px, 20%, 20px)", fontWeight: 700, color: t.fg, fontFamily: t.fontFamily }}>
            {element.title}
          </div>
          <div
            style={{
              ...frame,
              background: t.surface,
              border: t.innerBorder,
              boxShadow: "none",
              flex: 1,
              display: "flex",
              alignItems: "center",
              padding: "0 5%",
              fontSize: "clamp(12px, 26%, 22px)",
              color: t.muted,
            }}
          >
            {element.placeholder}
          </div>
        </div>
      );

    case "toggle":
      return (
        <div
          style={{
            ...base,
            ...frame,
            padding: pad,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "6%",
          }}
        >
          <span style={{ fontSize: "clamp(12px, 26%, 24px)", fontWeight: 600 }}>{element.text}</span>
          <div
            style={{
              flex: "0 0 auto",
              width: "34%",
              maxWidth: 96,
              aspectRatio: "2 / 1",
              borderRadius: t.name === "neobrutalist" ? 0 : 999,
              border: t.innerBorder,
              background: element.checked ? t.accent : t.surface,
              position: "relative",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10%",
                bottom: "10%",
                aspectRatio: "1 / 1",
                left: element.checked ? "auto" : "6%",
                right: element.checked ? "6%" : "auto",
                borderRadius: t.name === "neobrutalist" ? 0 : "50%",
                background: element.checked ? t.accentFg : t.fg,
                border: t.name === "neobrutalist" ? "2px solid #0a0f1f" : "none",
              }}
            />
          </div>
        </div>
      );

    case "badge":
      return (
        <div style={{ ...base, display: "grid", placeItems: "center" }}>
          <div
            style={{
              ...frame,
              background: t.accent,
              color: t.accentFg,
              borderRadius: t.name === "neobrutalist" || t.name === "xp" ? t.radius : 999,
              padding: "6% 14%",
              fontSize: "clamp(11px, 34%, 26px)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}
          >
            {element.text}
          </div>
        </div>
      );

    case "progress": {
      const v = Math.max(0, Math.min(100, element.value ?? 0));
      return (
        <div style={{ ...base, display: "flex", flexDirection: "column", gap: "10%", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "clamp(11px, 18%, 20px)", fontWeight: 700, color: t.fg }}>
            <span>{element.title}</span>
            <span style={{ color: t.muted }}>{v}%</span>
          </div>
          <div
            style={{
              ...frame,
              background: t.surface,
              border: t.innerBorder,
              boxShadow: "none",
              height: "34%",
              minHeight: 12,
              padding: t.name === "neobrutalist" ? 3 : 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${v}%`,
                height: "100%",
                background: t.accent,
                borderRadius: t.name === "neobrutalist" || t.name === "sketch" ? 0 : 999,
                transition: "width 0.3s",
              }}
            />
          </div>
        </div>
      );
    }

    case "checkbox":
      return (
        <div style={{ ...base, display: "flex", alignItems: "center", gap: "5%" }}>
          <div
            style={{
              flex: "0 0 auto",
              height: "62%",
              aspectRatio: "1 / 1",
              display: "grid",
              placeItems: "center",
              background: element.checked ? t.accent : t.surface,
              border: t.innerBorder,
              borderRadius: t.name === "sketch" || t.name === "glass" ? 6 : t.radius,
              color: t.accentFg,
            }}
          >
            {element.checked && <Check style={{ width: "70%", height: "70%" }} strokeWidth={4} />}
          </div>
          <span style={{ fontSize: "clamp(12px, 26%, 24px)", fontWeight: 600, color: t.fg, fontFamily: t.fontFamily }}>
            {element.text}
          </span>
        </div>
      );

    case "alert":
      return (
        <div
          style={{
            ...base,
            ...frame,
            padding: pad,
            display: "flex",
            gap: "5%",
            alignItems: "flex-start",
            borderLeft: `8px solid ${t.accent}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4%" }}>
            <div style={{ fontSize: "clamp(13px, 16%, 28px)", fontWeight: 800, color: t.accent }}>
              {element.title}
            </div>
            <div style={{ fontSize: "clamp(11px, 11%, 22px)", color: t.muted, lineHeight: 1.4 }}>
              {element.text}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
