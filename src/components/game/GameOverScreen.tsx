import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { CapybaraCharacter } from "./CapybaraCharacter";

interface GameOverScreenProps {
  finalScore: number;
  bestScore: number;
  isNewRecord: boolean;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const GameOverScreen = ({ 
  finalScore, 
  bestScore, 
  isNewRecord, 
  onPlayAgain, 
  onBackToMenu 
}: GameOverScreenProps) => {
  return (
    <div className="min-h-screen streaming-bg flex items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Game Over Title - Всегда по центру сверху */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-destructive mb-4 animate-wiggle">
            ХАЙП ЗАКОНЧИЛСЯ!
          </h1>
          {isNewRecord ? (
            <div className="animate-glow-pulse">
              <h2 className="text-2xl lg:text-3xl font-bold neon-text mb-2">
                🎉 НОВЫЙ РЕКОРД! 🎉
              </h2>
              <p className="text-accent">Капибара впечатлена твоими навыками!</p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Не расстраивайся, даже лучшие стримеры иногда теряют хайп
            </p>
          )}
        </div>

        {/* Main Content - Горизонтальная раскладка на больших экранах */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Результаты и кнопки */}
          <div className="space-y-6">
            {/* Score Display */}
            <div className="space-y-4">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border border-border/50">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold neon-text mb-2">
                    {finalScore.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">Финальный счёт</div>
                </div>
              </Card>

              {!isNewRecord && bestScore > 0 && (
                <div className="flex items-center justify-center gap-2 text-lg">
                  <Trophy className="w-5 h-5 text-secondary" />
                  <span>Лучший рекорд: <span className="font-bold text-secondary">{bestScore.toLocaleString()}</span></span>
                </div>
              )}
            </div>

            {/* Achievement Badges */}
            <Card className="p-4 bg-card/60 backdrop-blur-sm border border-border/30">
              <h3 className="font-semibold mb-3 text-primary text-center">Достижения в этой игре:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {finalScore >= 1000 && (
                  <div className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                    🌟 Тысячник
                  </div>
                )}
                {finalScore >= 5000 && (
                  <div className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
                    💫 Хайп-мастер
                  </div>
                )}
                {finalScore >= 10000 && (
                  <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    🚀 Легенда стрима
                  </div>
                )}
                {isNewRecord && (
                  <div className="px-3 py-1 bg-gradient-accent rounded-full text-accent-foreground text-sm animate-glow-pulse">
                    🏆 Новый рекорд!
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onPlayAgain}
                variant="gaming"
                size="xl"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                ИГРАТЬ ЕЩЁ РАЗ
              </Button>
              
              <Button
                onClick={onBackToMenu}
                variant="gaming-secondary"
                className="flex items-center gap-2 px-8 py-4"
              >
                <Home className="w-5 h-5" />
                В ГЛАВНОЕ МЕНЮ
              </Button>
            </div>
          </div>

          {/* Right Column - Персонаж и цитата */}
          <div className="flex flex-col items-center space-y-6">
            {/* Character */}
            <div className="flex-shrink-0">
              <CapybaraCharacter mood={isNewRecord ? "happy" : "defeated"} />
            </div>

            {/* Motivational Quote */}
            <div className="w-full max-w-md">
              <Card className="p-4 bg-muted/20 border border-muted/30">
                <div className="text-sm text-muted-foreground italic text-center">
                  "{isNewRecord 
                    ? 'Успех - это способность идти от одной неудачи к другой, не теряя энтузиазма!' 
                    : 'Каждая неудача - это урок на пути к успеху!'}"
                </div>
                <div className="text-xs text-muted-foreground/60 mt-2 text-center">
                  — Мудрость капибары
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};