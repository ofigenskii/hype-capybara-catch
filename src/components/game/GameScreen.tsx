import { useState } from "react";
import { GameUI } from "./GameUI";
import { CapybaraCharacter } from "./CapybaraCharacter";
import { GameItem } from "./GameItem";
import { Button } from "@/components/ui/button";

interface GameScreenProps {
  onBackToMenu: () => void;
}

export const GameScreen = ({ onBackToMenu }: GameScreenProps) => {
  const [gameState, setGameState] = useState({
    score: 12450,
    lives: 2,
    hypeLevel: 75,
    isPaused: false,
    isMuted: false
  });

  const handlePause = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const handleToggleSound = () => {
    setGameState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  return (
    <div className="min-h-screen streaming-bg p-4">
      <div className="max-w-6xl mx-auto">
        {/* Game UI */}
        <GameUI
          score={gameState.score}
          lives={gameState.lives}
          hypeLevel={gameState.hypeLevel}
          isPaused={gameState.isPaused}
          isMuted={gameState.isMuted}
          onPause={handlePause}
          onToggleSound={handleToggleSound}
        />

        {/* Game Area */}
        <div className="relative bg-card/20 backdrop-blur-sm rounded-2xl p-8 border border-border/30 shadow-soft">
          {/* Falling Items Demo */}
          <div className="absolute top-4 left-20">
            <GameItem type="like" className="animate-slide-in-bottom" />
          </div>
          <div className="absolute top-16 right-32">
            <GameItem type="donate" className="animate-float" />
          </div>
          <div className="absolute top-32 left-1/3">
            <GameItem type="dislike" className="animate-wiggle" />
  </div>
          
          {/* Capybara Character */}
          <div className="flex justify-center items-center min-h-[400px]">
            <CapybaraCharacter mood="idle" />
          </div>

          {/* Control Zones (for mobile) */}
          <div className="absolute bottom-4 left-0 right-0">
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
              {['↖️', '↗️', '↙️', '↘️'].map((arrow, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-16 text-2xl game-button-secondary opacity-60 hover:opacity-100"
                >
                  {arrow}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Pause Overlay */}
        {gameState.isPaused && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card p-8 rounded-2xl shadow-glow border border-border">
              <h2 className="text-3xl font-bold neon-text text-center mb-6">
                ПАУЗА
              </h2>
              <div className="flex gap-4">
                <Button
                  onClick={handlePause}
                  variant="gaming"
                >
                  Продолжить
                </Button>
                <Button
                  onClick={onBackToMenu}
                  variant="gaming-secondary"
                >
                  В меню
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};