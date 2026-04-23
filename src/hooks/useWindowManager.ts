import { useState, useCallback } from 'react';

export type WindowState = {
  id: string;
  isOpen: boolean;
  zIndex: number;
};

export function useWindowManager(initialWindows: string[]) {
  const [windows, setWindows] = useState<WindowState[]>(
    initialWindows.map((id, index) => ({ id, isOpen: false, zIndex: 10 + index }))
  );
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(20);

  const openWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isOpen: true, zIndex: maxZIndex + 1 } : w
      )
    );
    setMaxZIndex((prev) => prev + 1);
    setActiveWindow(id);
  }, [maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
      )
    );
    setMaxZIndex((prev) => prev + 1);
    setActiveWindow(id);
  }, [maxZIndex]);

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    activeWindow,
  };
}
