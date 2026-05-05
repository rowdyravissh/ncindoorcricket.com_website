import { useState, useEffect, useRef, useCallback } from 'react';

/** Reusable hook: triggers true when element enters viewport */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el); // Only trigger once
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

/** Reusable hook: auto-advancing carousel */
export function useCarousel(slideCount, intervalMs = 5000) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, intervalMs);
  }, [slideCount, intervalMs]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const goTo = useCallback((index) => {
    setCurrent(index);
    resetTimer();
  }, [resetTimer]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slideCount);
    resetTimer();
  }, [slideCount, resetTimer]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
    resetTimer();
  }, [slideCount, resetTimer]);

  return { current, goTo, next, prev };
}
