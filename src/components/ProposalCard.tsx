import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const ProposalCard = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setNoPosition({ x: newX, y: newY });
  }, []);

  if (accepted) {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 p-8">
        <img 
          src="https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif" 
          alt="Celebration" 
          className="w-full max-w-md rounded-lg shadow-xl"
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center gap-8 p-8 min-h-[400px] w-full max-w-2xl"
    >
      <div className="text-6xl animate-pulse-heart">💕</div>
      
      <h1 className="font-romantic text-5xl md:text-7xl text-center text-gradient-romantic animate-wiggle">
        Riya, Will you be my Valentine?
      </h1>
      
      
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8 relative w-full min-h-[120px]">
        <Button
          variant="romantic"
          size="xl"
          onClick={() => setAccepted(true)}
          className="z-10"
        >
          Yes! 💖
        </Button>
        
        <Button
          ref={noButtonRef}
          variant="romanticOutline"
          size="xl"
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={moveNoButton}
          className="transition-all duration-200 ease-out absolute md:relative"
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
          }}
        >
          No 💔
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground italic mt-4">
        (The No button is a little shy... 😏)
      </p>
    </div>
  );
};

export default ProposalCard;
