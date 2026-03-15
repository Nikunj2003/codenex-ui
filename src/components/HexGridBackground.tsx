import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

const HEX_RADIUS = 28;
const HEX_WIDTH = HEX_RADIUS * 2;
const COL_SPACING = (3 / 4) * HEX_WIDTH; // 42
const ROW_SPACING = Math.sqrt(3) * HEX_RADIUS; // ~48.5
const GLOW_RADIUS = 180;

const COLORS = {
  light: {
    baseStroke: "hsla(174, 45%, 42%, 0.06)",
    glowStrokeAlpha: 0.35,
    glowFillAlpha: 0.06,
    h: 174, s: 45, l: 42,
  },
  dark: {
    baseStroke: "hsla(174, 42%, 50%, 0.08)",
    glowStrokeAlpha: 0.45,
    glowFillAlpha: 0.08,
    h: 174, s: 42, l: 50,
  },
};

function drawHexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export default function HexGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const themeRef = useRef<"light" | "dark">("dark");
  const rafRef = useRef<number>(0);
  const dprRef = useRef(window.devicePixelRatio || 1);
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  // Keep theme ref in sync without triggering canvas re-init
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = dprRef.current;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const colors = COLORS[themeRef.current];
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const cols = Math.ceil(w / COL_SPACING) + 3;
    const rows = Math.ceil(h / ROW_SPACING) + 3;
    const offsetX = -HEX_RADIUS;
    const offsetY = -HEX_RADIUS;

    ctx.lineWidth = 1;

    for (let col = 0; col < cols; col++) {
      const cx = offsetX + col * COL_SPACING;
      const isOddCol = col % 2 === 1;

      for (let row = 0; row < rows; row++) {
        const cy = offsetY + row * ROW_SPACING + (isOddCol ? ROW_SPACING / 2 : 0);

        // Spatial culling
        const dx = Math.abs(cx - mx);
        const dy = Math.abs(cy - my);

        if (dx > GLOW_RADIUS || dy > GLOW_RADIUS) {
          // Just draw base hex
          drawHexPath(ctx, cx, cy, HEX_RADIUS);
          ctx.strokeStyle = colors.baseStroke;
          ctx.stroke();
          continue;
        }

        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - dist / GLOW_RADIUS);
        const intensity = t * t; // quadratic falloff

        drawHexPath(ctx, cx, cy, HEX_RADIUS);

        if (intensity > 0.001) {
          const fillAlpha = intensity * colors.glowFillAlpha;
          const strokeAlpha = Math.max(
            themeRef.current === "dark" ? 0.08 : 0.06,
            intensity * colors.glowStrokeAlpha
          );
          ctx.fillStyle = `hsla(${colors.h}, ${colors.s}%, ${colors.l}%, ${fillAlpha})`;
          ctx.fill();
          ctx.strokeStyle = `hsla(${colors.h}, ${colors.s}%, ${colors.l}%, ${strokeAlpha})`;
        } else {
          ctx.strokeStyle = colors.baseStroke;
        }
        ctx.stroke();
      }
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    let active = true;

    const onVisibilityChange = () => {
      if (document.hidden) {
        active = false;
      } else {
        active = true;
        loop();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    const loop = () => {
      if (!active) return;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isMobile, draw]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
