<template>
  <div
    ref="mountRef"
    class="matrix-mount"
  />
</template>

<script setup lang="ts">
import type { Texture, Application, Sprite } from 'pixi.js';

export type RunMatrix = (onMid?: (() => void) | undefined, onDone?: (() => void) | undefined) => void;

const mountRef = useTemplateRef<HTMLElement>('mountRef');

const FONT_SIZE = 16;
const COL_W = 20;
const TRAIL = 10;
const CHARS: string = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01アイウエオ';
const START_SPREAD = 2;

let app: Application;
let columns: Column[] = [];
let charTextures: Record<string, Texture> = {};
let phase: 'idle' | 'falling' | 'fadeout' = 'idle';
let midFired = false;
let onMidCb: (() => void) | null = null;
let onDoneCb: (() => void) | null = null;
let resizeHandler: (() => void) | null = null;
let colorObserver: MutationObserver | null = null;

let charColor = '#ffffff';
let headColor = '#ccffcc';

interface Column {
  sprites: Sprite[];
  drop: number;
  speed: number;
  opacity: number;
}

const getRandomTexture = (): Texture => charTextures[randomChar()]!;
const randomChar = (): string => CHARS[Math.floor(Math.random() * CHARS.length)] || '0';

onMounted(async () => {
  const { Application, Sprite, Text } = await import('pixi.js');

  const buildCharTextures = () => {
    for (const ch of new Set(CHARS)) {
      if (!app?.renderer) break;

      charTextures[ch] = app.renderer.generateTexture(new Text({
        text: ch,
        style: {
          lineHeight: 1,
          fontSize: FONT_SIZE,
          fontFamily: 'monospace',
          fill: charColor
        }
      }));
    }
  };

  const el = mountRef.value;

  const readColors = () => {
    if (!el) return;
    const computedStyle = getComputedStyle(el);
    const newCharColor = computedStyle.getPropertyValue('--matrix-char-color').trim() || '#ffffff';
    const newHeadColor = computedStyle.getPropertyValue('--matrix-head-color').trim() || '#ccffcc';

    const colorsChanged = newCharColor !== charColor || newHeadColor !== headColor;

    charColor = newCharColor;
    headColor = newHeadColor;

    if (colorsChanged) {
      buildCharTextures();
    }
  };

  readColors();

  colorObserver = new MutationObserver(() => readColors());
  colorObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });

  const W = window.innerWidth;
  const H = window.innerHeight;

  app = new Application();

  await app.init({
    width: W,
    height: H,
    backgroundAlpha: 0,
    antialias: false,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
  });

  el?.appendChild(app.canvas);

  buildCharTextures();

  let numCols = Math.floor(W / COL_W);
  let rowsTotal = Math.ceil(H / FONT_SIZE) + TRAIL + 4;

  const initColumns = () => {
    const existingSprites = columns.flatMap(col => col.sprites);
    let spriteIndex = 0;

    columns = [];

    for (let c = 0; c < numCols; c++) {
      const sprites: Sprite[] = [];
      for (let r = 0; r < TRAIL + 1; r++) {
        const sp = existingSprites[spriteIndex++] || new Sprite(getRandomTexture());
        sp.x = c * COL_W;
        sp.y = -FONT_SIZE * 10;
        sp.width = FONT_SIZE;
        sp.height = FONT_SIZE * 2;
        sp.alpha = 0;
        if (!app.stage.children.includes(sp)) {
          app.stage.addChild(sp);
        }
        sprites.push(sp);
      }
      columns.push({ sprites, drop: 0, speed: 0, opacity: 0 });
    }

    for (let i = spriteIndex; i < existingSprites.length; i++) {
      const existing = existingSprites[i];
      if (existing) {
        app.stage.removeChild(existing);
        existing.destroy();
      }
    }
  };

  initColumns();

  resizeHandler = () => {
    const newW = window.innerWidth;
    const newH = window.innerHeight;

    app.renderer.resize(newW, newH);

    numCols = Math.floor(newW / COL_W);
    rowsTotal = Math.ceil(newH / FONT_SIZE) + TRAIL + 4;

    readColors();
    initColumns();
  };

  window.addEventListener('resize', resizeHandler);

  app.ticker.add((time) => {
    if (phase === 'idle') return;

    const delta = time.deltaTime;

    if (phase === 'falling') {
      let belowMid = 0;

      for (const col of columns) {
        col.drop += col.speed * delta;
        col.opacity = Math.min(1, col.opacity + 0.06 * delta);

        const headRow = Math.floor(col.drop);
        const head = col.sprites[TRAIL];
        if (!head) {
          return;
        }

        head.texture = getRandomTexture();
        head.y = headRow * FONT_SIZE;
        head.tint = headColor;
        head.alpha = col.opacity;

        for (let t = 0; t < TRAIL; t++) {
          const sp = col.sprites[t];
          const row = headRow - (TRAIL - t);

          if (!sp) {
            continue;
          }

          if (row < 0) {
            sp.alpha = 0;
            continue;
          }

          sp.texture = getRandomTexture();
          sp.y = row * FONT_SIZE;
          const frac = t / TRAIL;
          sp.tint = headColor;
          sp.alpha = frac * 0.65 * col.opacity;
        }

        if (col.drop > rowsTotal * 0.5) belowMid++;
      }

      if (!midFired && belowMid >= columns.length * 0.5) {
        midFired = true;
        onMidCb?.();
        onMidCb = null;
      }

      if (columns.every(col => col.drop > rowsTotal)) {
        phase = 'fadeout';
      }
    }

    if (phase === 'fadeout') {
      let anyVisible = false;
      for (const col of columns) {
        for (const sp of col.sprites) {
          if (sp.alpha > 0) {
            sp.alpha = Math.max(0, sp.alpha - 0.05 * delta);
            anyVisible = true;
          }
        }
      }
      if (!anyVisible) {
        phase = 'idle';
        app!.canvas.style.opacity = '0';
        onDoneCb?.();
        onDoneCb = null;
      }
    }
  });
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  if (colorObserver) {
    colorObserver.disconnect();
  }
  app.destroy(true);
  charTextures = {};
  columns = [];
});

const run: RunMatrix = (onMid?, onDone?) => {
  phase = 'falling';
  midFired = false;
  onMidCb = onMid || null;
  onDoneCb = onDone || null;

  const canvas = app.canvas;

  columns.forEach((col) => {
    col.drop = -(Math.random() * START_SPREAD + 2);
    col.speed = 0.45 + Math.random() * 0.2;
    col.opacity = 0;
    col.sprites.forEach(sp => (sp.alpha = 0));
  });

  canvas.style.opacity = '1';
};

defineExpose({ run });
</script>

<style scoped>
.matrix-mount {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;

  --matrix-char-color: var(--ui-primary);
  --matrix-head-color: var(--ui-primary);
}

.matrix-mount :deep(canvas) {
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
  opacity: 0;
  transition: opacity 0.1s;
}
</style>
