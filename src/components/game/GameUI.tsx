import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Pause, Volume2, VolumeX } from "lucide-react";

interface GameUIProps {
  score: number;
  lives: number;
  hypeLevel: number;
  isPaused: boolean;
  isMuted: boolean;
  onPause: () => void;
  onToggleSound: () => void;
}

export const GameUI = ({
  score,
  lives,
  hypeLevel,
  isPaused,
  isMuted,
  onPause,
  onToggleSound
}: GameUIProps) => {
  return (
    <>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <Card className="game-counter">
            <span className="neon-text">Счёт: {score.toLocaleString()}</span>
          </Card>
          
          <div className="flex gap-1 items-center">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-8 h-8 ${
                  i < lives 
                    ? "fill-game-like text-game-like animate-glow-pulse" 
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleSound}
            className="game-button-secondary"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline" 
            size="icon"
            onClick={onPause}
            className="game-button-secondary"
          >
            <Pause className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Hype Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-muted-foreground">
            ШКАЛА ХАЙПА
          </span>
          <span className="text-sm font-bold text-accent">
            {Math.round(hypeLevel)}%
          </span>
        </div>
        
        <div className="hype-bar">
          <div 
            className="hype-bar-fill"
            style={{ width: `${hypeLevel}%` }}
          />
        </div>
        
        {hypeLevel >= 100 && (
          <div className="text-center mt-2">
            <span className="neon-text text-xl font-bold animate-wiggle">
              🔥 ХАЙП-РЕЖИМ! 🔥
            </span>
          </div>
        )}
      </div>
    </>
  );
};