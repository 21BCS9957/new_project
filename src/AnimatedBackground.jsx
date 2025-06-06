// AnimatedBackground.jsx
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgPosition = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `${x / 100}% ${y / 100}%`
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="animated-bg"
      style={{
        backgroundPosition: bgPosition,
      }}
    />
  );
};

export default AnimatedBackground;
