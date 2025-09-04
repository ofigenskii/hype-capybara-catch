import { GameDemo } from "@/components/game/GameDemo";
import { AnimationDemo } from "@/components/game/AnimationDemo";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [showAnimationDemo, setShowAnimationDemo] = useState(false);

  return (
    <div className="relative">
      {showAnimationDemo ? <AnimationDemo /> : <GameDemo />}
      
      {/* Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setShowAnimationDemo(!showAnimationDemo)}
          variant="outline"
          className="bg-card/90 backdrop-blur-sm"
        >
          {showAnimationDemo ? '🎮 К игре' : '🎭 Демо анимаций'}
        </Button>
      </div>
    </div>
  );
};

export default Index;
