import { useState, useEffect, useRef, useCallback } from "react";

interface CursorState {
  dotX: number;
  dotY: number;
  ringX: number;
  ringY: number;
  isHovering: boolean;
}

export function useCursor() {
  const [state, setState] = useState<CursorState>({
    dotX: 0, dotY: 0, ringX: 0, ringY: 0, isHovering: false,
  });
  const ringPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    dotPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ringPos.current.x += (dotPos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (dotPos.current.y - ringPos.current.y) * 0.12;
      setState(prev => ({
        ...prev,
        dotX: dotPos.current.x,
        dotY: dotPos.current.y,
        ringX: ringPos.current.x,
        ringY: ringPos.current.y,
      }));
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setState(prev => ({ ...prev, isHovering: true }));
      }
    };
    const handleOut = () => setState(prev => ({ ...prev, isHovering: false }));

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  return state;
}
