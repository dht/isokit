import { useEffect } from 'react';

export function useSpace(callback: any, depArray: any[]) {
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 32) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [...depArray]);
}
