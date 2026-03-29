'use client';

import createGlobe from 'cobe';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GEO_CITIES, GEO_ROUTES } from '@/components/sections/geography-data';

function rgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const normalized =
    clean.length === 3 ? clean.split('').map((char) => char + char).join('') : clean;

  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  return [r, g, b];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function GeographyGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const phiRef = useRef(0.35);
  const thetaRef = useRef(0.28);
  const scaleRef = useRef(1.02);

  const dragStartRef = useRef<{
    x: number;
    y: number;
    phi: number;
    theta: number;
  } | null>(null);

  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      const darkByClass = root.classList.contains('dark');
      const darkByAttr =
        root.getAttribute('data-theme') === 'dark' ||
        document.body.getAttribute('data-theme') === 'dark';

      setIsDark(darkByClass || darkByAttr);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveRouteIndex((prev) => (prev + 1) % GEO_ROUTES.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const activeRoute = GEO_ROUTES[activeRouteIndex];

  const cityMap = useMemo(
    () => new Map(GEO_CITIES.map((city) => [city.id, city])),
    [],
  );

  const markers = useMemo(
    () =>
      GEO_CITIES.map((city) => ({
        location: city.location,
        size: city.id === activeRoute.from || city.id === activeRoute.to ? 0.07 : 0.045,
        id: city.id,
      })),
    [activeRoute],
  );

  const arcs = useMemo(
    () =>
      GEO_ROUTES.map((route, index) => ({
        from: cityMap.get(route.from)!.location,
        to: cityMap.get(route.to)!.location,
        color: index === activeRouteIndex ? rgb('#fab021') : isDark ? rgb('#6f7785') : rgb('#b7bcc7'),
      })),
    [activeRouteIndex, cityMap, isDark],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 720 * 2,
      height: 720 * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.25 : 1.6,
      mapSamples: 22000,
      mapBrightness: isDark ? 4.6 : 6.6,
      mapBaseBrightness: isDark ? 0.08 : 0.18,
      baseColor: isDark ? rgb('#26292e') : rgb('#f8f9fb'),
      glowColor: isDark ? rgb('#26292e') : rgb('#ffffff'),
      markerColor: isDark ? rgb('#d6dbe5') : rgb('#5f6673'),
      arcColor: rgb('#fab021'),
      arcWidth: 0.55,
      arcHeight: 0.11,
      markerElevation: 0.018,
      scale: scaleRef.current,
      offset: [0, -8],
      markers,
      arcs,
    });

    const animate = () => {
      if (!dragStartRef.current) {
        phiRef.current += 0.0022;
      }

      globe.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        scale: scaleRef.current,
        dark: isDark ? 1 : 0,
        diffuse: isDark ? 1.25 : 1.6,
        mapBrightness: isDark ? 4.6 : 6.6,
        mapBaseBrightness: isDark ? 0.08 : 0.18,
        baseColor: isDark ? rgb('#26292e') : rgb('#f8f9fb'),
        glowColor: isDark ? rgb('#26292e') : rgb('#ffffff'),
        markerColor: isDark ? rgb('#d6dbe5') : rgb('#5f6673'),
        markers,
        arcs,
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
    };
  }, [markers, arcs, isDark]);

  const startDrag = (clientX: number, clientY: number) => {
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      phi: phiRef.current,
      theta: thetaRef.current,
    };

    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
    }
  };

  const moveDrag = (clientX: number, clientY: number) => {
    const start = dragStartRef.current;
    if (!start) return;

    const deltaX = clientX - start.x;
    const deltaY = clientY - start.y;

    phiRef.current = start.phi + deltaX / 220;
    thetaRef.current = clamp(start.theta - deltaY / 260, -0.55, 0.55);
  };

  const endDrag = () => {
    dragStartRef.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const nextScale = scaleRef.current - event.deltaY * 0.0008;
    scaleRef.current = clamp(nextScale, 0.88, 1.22);
  };

  const from = cityMap.get(activeRoute.from)!;
  const to = cityMap.get(activeRoute.to)!;

  return (
    <div className="flex h-full flex-col items-center justify-start">
      <div className="relative flex h-[560px] w-full items-center justify-center">
        <canvas
          ref={canvasRef}
          className="h-[560px] w-[560px] max-w-full cursor-grab"
          style={{ aspectRatio: '1 / 1' }}
          onMouseDown={(event) => startDrag(event.clientX, event.clientY)}
          onMouseMove={(event) => moveDrag(event.clientX, event.clientY)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={(event) => {
            if (event.touches[0]) {
              startDrag(event.touches[0].clientX, event.touches[0].clientY);
            }
          }}
          onTouchMove={(event) => {
            if (event.touches[0]) {
              moveDrag(event.touches[0].clientX, event.touches[0].clientY);
            }
          }}
          onTouchEnd={endDrag}
          onWheel={handleWheel}
        />
      </div>

      <div className="mt-2 w-full rounded-[18px] bg-[rgba(38,41,46,0.78)] px-5 py-4 backdrop-blur-md dark:bg-[rgba(38,41,46,0.78)]">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/56">
          активное направление
        </p>
        <p className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-white">
          {from.label} — {to.label}
        </p>
      </div>
    </div>
  );
}
