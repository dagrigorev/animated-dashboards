import { useState, useEffect } from 'react';
import { useSpring, MotionValue } from 'framer-motion';
import { ANIMATION_CONFIG } from '../constants/dashboard.constants';

interface UseAnimatedCounterReturn {
  displayValue: number;
  motionValue: MotionValue<number>;
}

/**
 * Хук для анимированного счётчика чисел
 */
export const useAnimatedCounter = (targetValue: number): UseAnimatedCounterReturn => {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useSpring(0, ANIMATION_CONFIG.spring);

  useEffect(() => {
    motionValue.set(targetValue);
  }, [targetValue, motionValue]);

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest: number) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [motionValue]);

  return { displayValue, motionValue };
};
