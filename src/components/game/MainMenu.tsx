import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, VolumeX, Trophy } from "lucide-react";
import { CapybaraCharacter } from "./CapybaraCharacter";

interface MainMenuProps {
  bestScore: number;
  isMuted: boolean;
  onPlayClick: () => void;
  onToggleSound: () => void;
}

export const MainMenu = ({ bestScore, isMuted, onPlayClick, onToggleSound }: MainMenuProps) => {
  return (
    <div className="min-h-screen streaming-bg flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Game Title */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold neon-text mb-4 animate-glow-pulse">
            ХАЙПОЖОР
          </h1>
          <h2 className="text-2xl font-semibold text-primary/80 mb-2">
            Капибара-Стример
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Помоги невозмутимой капибаре поймать весь хайп от подписчиков 
            и уворачиваться от хейтеров!
          </p>
        </div>

        {/* Character Preview */}
        <div className="mb-8">
          <CapybaraCharacter mood="idle" />
        </div>

        {/* Best Score */}
        {bestScore > 0 && (
          <Card className="mb-6 p-4 bg-card/80 backdrop-blur-sm border border-border/50">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-secondary" />
              <span className="text-lg font-semibold">
                Лучший рекорд: <span className="neon-text">{bestScore.toLocaleString()}</span>
              </span>
            </div>
          </Card>
        )}

        {/* Menu Buttons */}
        <div className="flex flex-col gap-4 items-center">
          <Button
            onClick={onPlayClick}
            variant="gaming"
            size="xl"
            className="w-full max-w-xs"
          >
            🎮 ИГРАТЬ
          </Button>

          <Button
            onClick={onToggleSound}
            variant="gaming-secondary"
            className="flex items-center gap-2"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            {isMuted ? "Включить звук" : "Выключить звук"}
          </Button>
        </div>

        {/* Game Instructions */}
        <div className="mt-8 max-w-lg mx-auto">
          <Card className="p-6 bg-card/60 backdrop-blur-sm border border-border/30">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Как играть:
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-accent mb-2">ЛОВИМ:</h4>
                <div className="space-y-1">
                  <div>❤️ Лайки (+10)</div>
                  <div>💰 Донаты (+10)</div>
                  <div>👤+ Подписчики (+10)</div>
                  <div>✓ Галочка (+25)</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-destructive mb-2">ИЗБЕГАЕМ:</h4>
                <div className="space-y-1">
                  <div>👎 Дизлайки (-1 ❤️)</div>
                  <div>😠 Хейт (-1 ❤️)</div>
                  <div>🔨 Бан (-1 ❤️)</div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="text-accent font-semibold">🔥 ХАЙП-РЕЖИМ:</div>
              <div className="text-xs text-muted-foreground mt-1">
                Заполни шкалу на 100% для x2 очков!
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};