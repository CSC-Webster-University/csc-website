import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      setIsHovering(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth trail effect
  useEffect(() => {
    let animationFrameId;
    
    const updateTrailingPosition = () => {
      setTrailingPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15
      }));
      animationFrameId = requestAnimationFrame(updateTrailingPosition);
    };

    animationFrameId = requestAnimationFrame(updateTrailingPosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <div className="hidden md:block">
      {/* Background large glow */}
      <div 
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-[-1] transition-opacity duration-300"
        style={{ 
          transform: `translate(${trailingPosition.x - 200}px, ${trailingPosition.y - 200}px)`,
        }}
      />
      
      {/* Outer trailing ring */}
      <div 
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/50 pointer-events-none z-[100] transition-transform duration-100 ease-out mix-blend-screen flex items-center justify-center`}
        style={{ 
          transform: `translate(${trailingPosition.x - 20}px, ${trailingPosition.y - 20}px) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        {/* Inner dot */}
        <div 
          className="w-2 h-2 bg-primary rounded-full transition-transform duration-300 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ 
            transform: `scale(${isHovering ? 0 : 1})`,
          }}
        />
      </div>
    </div>
  );
}
