import { useEffect, useRef, useCallback } from 'react';

/* ── Animation Constants ──────────────────────────────────────── */
const MOUSE_MAX_DISTANCE = 200;
const MOUSE_MAX_DIST_SQ = MOUSE_MAX_DISTANCE * MOUSE_MAX_DISTANCE; // avoid sqrt per pixel
const ENERGY_MAX_AGE = 4000;
const ENERGY_FIELD_RADIUS = 300;
const ENERGY_FIELD_WIDTH = 100;

const PRIMARY_LINE_COUNT = 30;
const SECONDARY_LINE_COUNT = 20;
const ACCENT_LINE_COUNT = 12;
const ACCENT_STEPS = 60;
const PIXEL_STEP = 4;

// Mouse-influence cap so speed never explodes
const MOUSE_SPEED_CAP = 0.4;

/**
 * SmoothWavyCanvas — Full-viewport animated canvas background.
 *
 * Renders three layers of wavy lines (horizontal, vertical, diagonal)
 * that respond to mouse proximity. Used as a section background.
 *
 * Mouse events are captured at the window level so interaction works
 * even when content layers sit on top of the canvas (z-10+).
 *
 * Performance notes
 * -----------------
 * • Mouse influence is pre-computed once per line (not per pixel).
 * • `Math.sqrt` replaced with squared-distance comparison where possible.
 * • Canvas promoted to a GPU compositing layer via `will-change`.
 * • Mouse-move events are throttled to ~60 fps via rAF flag.
 * • `mouseInfl * t` speed term removed to prevent runaway acceleration.
 */
const SmoothWavyCanvas = ({
  backgroundColor = '#131313',
  primaryColor = '200, 200, 200',
  secondaryColor = '150, 150, 150',
  accentColor = '120, 120, 120',
  lineOpacity = 1,
  animationSpeed = 0.004,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestIdRef = useRef(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const energyFields = useRef([]);
  const mousePendingRef = useRef(false); // throttle flag

  /* ── Helper: mouse proximity (0 = far, 1 = on top) ─────────── */
  // Uses squared distance to avoid Math.sqrt on every call.
  const getMouseInfluence = (x, y) => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const distSq = dx * dx + dy * dy;
    if (distSq >= MOUSE_MAX_DIST_SQ) return 0;
    return 1 - Math.sqrt(distSq) / MOUSE_MAX_DISTANCE;
  };

  /* ── Helper: energy field ripple influence ──────────────────── */
  const getEnergyFieldInfluence = (x, y, currentTime) => {
    let totalIntensity = 0;
    let totalDirectionX = 0;
    let totalDirectionY = 0;

    energyFields.current.forEach((field) => {
      const age = currentTime - field.time;
      if (age >= ENERGY_MAX_AGE) return;

      const dx = x - field.x;
      const dy = y - field.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = (age / ENERGY_MAX_AGE) * ENERGY_FIELD_RADIUS;

      if (Math.abs(distance - radius) < ENERGY_FIELD_WIDTH) {
        const strength = (1 - age / ENERGY_MAX_AGE) * field.intensity;
        const proximity = 1 - Math.abs(distance - radius) / ENERGY_FIELD_WIDTH;
        const influence = strength * proximity * 0.6;

        totalIntensity += influence;
        if (distance > 0) {
          totalDirectionX += (dx / distance) * influence;
          totalDirectionY += (dy / distance) * influence;
        }
      }
    });

    return {
      intensity: Math.min(totalIntensity, 1),
      direction: Math.atan2(totalDirectionY, totalDirectionX),
    };
  };

  /* ── Resize handler ─────────────────────────────────────────── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }, []);

  /* ── Mouse handler — throttled with rAF flag ─────────────────
   *  Attaching to WINDOW lets interaction work through z-layers.   */
  const handleMouseMove = useCallback((e) => {
    if (mousePendingRef.current) return; // skip until next frame
    mousePendingRef.current = true;
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      }
      mousePendingRef.current = false;
    });
  }, []);

  /* ── Main render loop ───────────────────────────────────────── */
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += animationSpeed;
    const { width, height } = canvas;
    const t = timeRef.current;

    // Pre-compute mouse position once (avoids repeated property access)
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Clear
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // --- Layer 1: Primary horizontal lines ---
    for (let i = 0; i < PRIMARY_LINE_COUNT; i++) {
      const yPos = (i / PRIMARY_LINE_COUNT) * height;

      // Influence calculated once per line at its midpoint
      const mouseInfl = getMouseInfluence(width / 2, yPos);

      const amplitude = 45 + 25 * Math.sin(t * 0.25 + i * 0.15) + mouseInfl * 25;
      const frequency = 0.006 + 0.002 * Math.sin(t * 0.12 + i * 0.08) + mouseInfl * 0.001;
      // ⚠️  Speed no longer multiplied by `t` — prevents runaway acceleration
      const baseSpeed = t * (0.6 + 0.3 * Math.sin(i * 0.12));
      const speed = baseSpeed + Math.min(mouseInfl, MOUSE_SPEED_CAP) * 1.5;
      const thickness = 0.6 + 0.4 * Math.sin(t + i * 0.25) + mouseInfl * 0.8;
      const opacity = (0.12 + 0.08 * Math.abs(Math.sin(t * 0.3 + i * 0.18)) + mouseInfl * 0.15) * lineOpacity;

      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`;

      // Only do per-pixel influence near the cursor; elsewhere use midpoint value
      for (let x = 0; x < width; x += PIXEL_STEP) {
        const dxp = x - mx;
        const dyp = yPos - my;
        const nearCursor = (dxp * dxp + dyp * dyp) < MOUSE_MAX_DIST_SQ;
        const localInfl = nearCursor ? getMouseInfluence(x, yPos) : mouseInfl;

        const y = yPos
          + amplitude * Math.sin(x * frequency + speed)
          + localInfl * Math.sin(t * 2 + x * 0.008) * 15;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // --- Layer 2: Secondary vertical lines ---
    for (let i = 0; i < SECONDARY_LINE_COUNT; i++) {
      const xPos = (i / SECONDARY_LINE_COUNT) * width;

      const mouseInfl = getMouseInfluence(xPos, height / 2);

      const amplitude = 40 + 20 * Math.sin(t * 0.18 + i * 0.14) + mouseInfl * 20;
      const frequency = 0.007 + 0.003 * Math.cos(t * 0.14 + i * 0.09) + mouseInfl * 0.002;
      const baseSpeed = t * (0.5 + 0.25 * Math.cos(i * 0.16));
      const speed = baseSpeed + Math.min(mouseInfl, MOUSE_SPEED_CAP) * 1.2;
      const thickness = 0.5 + 0.3 * Math.sin(t + i * 0.35) + mouseInfl * 0.7;
      const opacity = (0.1 + 0.06 * Math.abs(Math.sin(t * 0.28 + i * 0.2)) + mouseInfl * 0.12) * lineOpacity;

      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.strokeStyle = `rgba(${secondaryColor}, ${opacity})`;

      for (let y = 0; y < height; y += PIXEL_STEP) {
        const dxp = xPos - mx;
        const dyp = y - my;
        const nearCursor = (dxp * dxp + dyp * dyp) < MOUSE_MAX_DIST_SQ;
        const localInfl = nearCursor ? getMouseInfluence(xPos, y) : mouseInfl;

        const x = xPos
          + amplitude * Math.sin(y * frequency + speed)
          + localInfl * Math.sin(t * 2 + y * 0.008) * 12;
        y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // --- Layer 3: Accent diagonal lines ---
    for (let i = 0; i < ACCENT_LINE_COUNT; i++) {
      const offset = (i / ACCENT_LINE_COUNT) * width * 1.5 - width * 0.25;
      const amplitude = 30 + 15 * Math.cos(t * 0.22 + i * 0.12);
      const frequency = 0.01 + 0.004 * Math.sin(t * 0.16 + i * 0.1);
      const phase = t * (0.4 + 0.2 * Math.sin(i * 0.13));
      const thickness = 0.4 + 0.25 * Math.sin(t + i * 0.28);
      const opacity = (0.06 + 0.04 * Math.abs(Math.sin(t * 0.24 + i * 0.15))) * lineOpacity;

      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.strokeStyle = `rgba(${accentColor}, ${opacity})`;

      for (let j = 0; j <= ACCENT_STEPS; j++) {
        const progress = j / ACCENT_STEPS;
        const baseX = offset + progress * width;
        const baseY = progress * height + amplitude * Math.sin(progress * 6 + phase);
        const mInfl = getMouseInfluence(baseX, baseY);
        const x = baseX + mInfl * Math.sin(t * 1.5 + progress * 6) * 8;
        const y = baseY + mInfl * Math.cos(t * 1.5 + progress * 6) * 8;
        j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    requestIdRef.current = requestAnimationFrame(animate);
  }, [backgroundColor, primaryColor, secondaryColor, accentColor, lineOpacity, animationSpeed]);

  /* ── Lifecycle: setup & teardown ────────────────────────────── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    resizeCanvas();

    // Listen on WINDOW so mouse events penetrate through content z-layers
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);

      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
        requestIdRef.current = null;
      }
      timeRef.current = 0;
      energyFields.current = [];
    };
  }, [animate, resizeCanvas, handleMouseMove]);

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* will-change hints the browser to promote this to a GPU layer */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default SmoothWavyCanvas;
