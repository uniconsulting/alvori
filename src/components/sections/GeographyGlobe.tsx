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

export function GeographyGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      const cls = root.classList;
      const darkByClass = cls.contains('dark');
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
    let width = 720;
    const dpr = 2;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: phiRef.current,
      theta: 0.32,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.35 : 1.9,
      mapSamples: 20000,
      mapBrightness: isDark ? 4.8 : 8,
      mapBaseBrightness: isDark ? 0.08 : 0.35,
      baseColor: isDark ? rgb('#26292e') : rgb('#f4f5f7'),
      glowColor: isDark ? rgb('#26292e') : rgb('#ffffff'),
      markerColor: isDark ? rgb('#d3d8e2') : rgb('#5f6673'),
      arcColor: rgb('#fab021'),
      arcWidth: 0.6,
      arcHeight: 0.16,
      markerElevation: 0.02,
      scale: 0.96,
      offset: [0, 0],
      markers,
      arcs,
    });

    const animate = () => {
      if (pointerInteracting.current === null) {
        phiRef.current += 0.0022;
      }

      globe.update({
        phi: phiRef.current,
        dark: isDark ? 1 : 0,
        diffuse: isDark ? 1.35 : 1.9,
        mapBrightness: isDark ? 4.8 : 8,
        mapBaseBrightness: isDark ? 0.08 : 0.35,
        baseColor: isDark ? rgb('#26292e') : rgb('#f4f5f7'),
        glowColor: isDark ? rgb('#26292e') : rgb('#ffffff'),
        markerColor: isDark ? rgb('#d3d8e2') : rgb('#5f6673'),
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

  const handlePointerDown = (value: number) => {
    pointerInteracting.current = value - pointerInteractionMovement.current;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePointerUp = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const handlePointerOut = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    handlePointerDown(event.clientX);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null) {
      const delta = event.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      phiRef.current = delta / 200;
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (event.touches[0]) {
      handlePointerDown(event.touches[0].clientX);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null && event.touches[0]) {
      const delta = event.touches[0].clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      phiRef.current = delta / 200;
    }
  };

  const from = cityMap.get(activeRoute.from)!;
  const to = cityMap.get(activeRoute.to)!;

  return (
    <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[32px] bg-[var(--surface)] shadow-[0_16px_40px_rgba(38,41,46,0.06)]">
      <div className="relative flex h-[560px] w-full items-center justify-center">
        <canvas
          ref={canvasRef}
          className="h-[560px] w-[560px] max-w-full cursor-grab"
          style={{ aspectRatio: '1 / 1' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerOut}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handlePointerUp}
        />
      </div>

      <div className="absolute bottom-6 left-6 right-6 rounded-[18px] bg-[rgba(38,41,46,0.78)] px-5 py-4 backdrop-blur-md dark:bg-[rgba(38,41,46,0.78)]">
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
