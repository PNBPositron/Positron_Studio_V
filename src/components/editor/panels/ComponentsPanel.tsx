import { useState } from "react";
import {
  HelpCircle,
  MousePointerClick,
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,
  Square,
  RectangleHorizontal,
  TextCursorInput,
  ToggleRight,
  Tag,
  Gauge,
  CheckSquare,
  AlertTriangle,
} from "lucide-react";
import {
  useEditor,
  newQuiz,
  newChart,
  newButton,
  newUI,
  COMPONENT_STYLES,
  type ChartKind,
  type ButtonAction,
  type UIKind,
  type ComponentStyle,
} from "@/store/editor";
import { styleTokens } from "@/lib/componentStyles";
import { UIRender } from "../UIRender";
import { PanelHeader } from "./TextPanel";

const UI_ITEMS: { kind: UIKind; label: string; Icon: typeof Square }[] = [
  { kind: "card", label: "Card", Icon: Square },
  { kind: "button", label: "Button", Icon: RectangleHorizontal },
  { kind: "input", label: "Input", Icon: TextCursorInput },
  { kind: "toggle", label: "Toggle", Icon: ToggleRight },
  { kind: "badge", label: "Badge", Icon: Tag },
  { kind: "progress", label: "Progress", Icon: Gauge },
  { kind: "checkbox", label: "Checkbox", Icon: CheckSquare },
  { kind: "alert", label: "Alert", Icon: AlertTriangle },
];

export function ComponentsPanel() {
  const { add } = useEditor();
  const [style, setStyle] = useState<ComponentStyle>("cyber");

  return (
    <div className="space-y-4">
      <PanelHeader title="Components" />

      <div>
        <div className="mb-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-teal/80">
          ▸ Style
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {COMPONENT_STYLES.map((s) => {
            const active = style === s;
            const t = styleTokens(s);
            return (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`brutal-border-2 brutal-press flex flex-col items-center gap-1 py-2 font-display text-[9px] uppercase tracking-[0.12em] ${
                  active ? "border-teal bg-blue text-ink glow-teal" : "bg-surface text-teal hover:border-teal"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-sm border"
                  style={{ background: t.accent, borderColor: t.fg }}
                />
                {t.label}
              </button>
            );
          })}
        </div>
        <p className="mt-1.5 font-mono text-[10px] text-teal/50">
          &gt; applies to items added below · change anytime in properties
        </p>
      </div>

      <div className="font-display text-[10px] uppercase tracking-[0.2em] text-teal/80">▸ UI Components</div>
      <div className="grid grid-cols-2 gap-2">
        {UI_ITEMS.map(({ kind, label, Icon }) => (
          <button
            key={kind}
            onClick={() => add(newUI(kind, style))}
            className="brutal-border-2 brutal-press group flex flex-col items-stretch gap-2 bg-surface p-2 hover:border-teal"
            title={`Add ${label}`}
          >
            <div className="pointer-events-none grid h-16 place-items-center overflow-hidden bg-ink/40 p-1.5">
              <UIPreview kind={kind} style={style} />
            </div>
            <span className="flex items-center justify-center gap-1 font-display text-[10px] uppercase tracking-[0.15em] text-teal">
              <Icon className="h-3 w-3" strokeWidth={2} /> {label}
            </span>
          </button>
        ))}
      </div>

      <div className="font-display text-[10px] uppercase tracking-[0.2em] text-teal/80">▸ Interactive</div>
      <button
        onClick={() => add(newQuiz({ style }))}
        className="brutal-border-2 brutal-press flex w-full items-center justify-center gap-2 bg-blue px-3 py-2 font-display text-[11px] tracking-[0.2em] text-ink"
      >
        <HelpCircle className="h-3.5 w-3.5" strokeWidth={2.5} /> ADD QUIZ
      </button>
      <div className="grid grid-cols-2 gap-2">
        {([
          { label: "NEXT →", action: "next-slide" },
          { label: "← BACK", action: "prev-slide" },
          { label: "RESTART", action: "first-slide" },
          { label: "LINK ↗", action: "link" },
        ] as Array<{ label: string; action: ButtonAction }>).map((b) => (
          <button
            key={b.action}
            onClick={() => add(newButton({ text: b.label, action: b.action, style }))}
            className="brutal-border-2 brutal-press flex items-center justify-center gap-1 bg-surface py-2 font-display text-[10px] tracking-[0.15em] text-teal hover:border-teal"
          >
            <MousePointerClick className="h-3 w-3" /> {b.label}
          </button>
        ))}
      </div>

      <div className="font-display text-[10px] uppercase tracking-[0.2em] text-teal/80">▸ Charts & Graphs</div>
      <div className="grid grid-cols-2 gap-2">
        {([
          { kind: "bar", label: "Bar", Icon: BarChart3 },
          { kind: "line", label: "Line", Icon: LineChart },
          { kind: "area", label: "Area", Icon: AreaChart },
          { kind: "pie", label: "Pie", Icon: PieChart },
          { kind: "donut", label: "Donut", Icon: PieChart },
        ] as Array<{ kind: ChartKind; label: string; Icon: typeof BarChart3 }>).map(({ kind, label, Icon }) => (
          <button
            key={kind}
            onClick={() => add(newChart(kind, { title: `${label} chart`, style }))}
            className="brutal-border-2 brutal-press flex flex-col items-center justify-center gap-1 bg-surface py-3 text-teal hover:border-teal"
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
            <span className="font-display text-[10px] uppercase tracking-[0.15em]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function UIPreview({ kind, style }: { kind: UIKind; style: ComponentStyle }) {
  const el = newUI(kind, style, { x: 0, y: 0, width: 200, height: 56, rotation: 0 });
  return (
    <div style={{ width: 200, height: 56, transform: "scale(0.62)", transformOrigin: "center" }}>
      <UIRender element={el} />
    </div>
  );
}
