// Centralized brand constants to ensure single source of truth across components
export const BRAND_GRADIENT = 'linear-gradient(148.93deg, #B400FF 0%, #830FB7 33.96%, #CB5564 56.61%, #FF8B00 81.2%)';

export const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const GPU_ACCELERATION = {
  willChange: 'transform, opacity',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden' as const,
};
