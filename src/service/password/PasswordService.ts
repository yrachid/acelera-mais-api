export const passwordGenerator = () => {
  return Math.random().toString(36).slice(-10);
} 