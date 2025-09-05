import { useState } from "react";
import { GameUI } from "./GameUI";
import { CapybaraCharacter } from "./CapybaraCharacter";
import { FallingGameLogic } from "./FallingGameLogic";
import { Button } from "@/components/ui/button";

interface GameScreenProps {
  onBackToMenu: () => void;
  onGameOver: (score: number) => void;
}

export const GameScreen = ({ onBackToMenu, onGameOver }: GameScreenProps) => {
  const [gameState, setGameState] = useState({
    score: 0,
    lives: 3,
    hypeLevel: 0,
    isPaused: false,
    isMuted: false,
    isPlaying: true
  });

  const handlePause = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused, isPlaying: !prev.isPaused ? false : prev.isPlaying }));
  };

  const handleToggleSound = () => {
    setGameState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleScoreChange = (score: number) => {
    setGameState(prev => ({ ...prev, score }));
  };

  const handleLivesChange = (lives: number) => {
    setGameState(prev => ({ ...prev, lives }));
  };

  const handleHypeChange = (hypeLevel: number) => {
    setGameState(prev => ({ ...prev, hypeLevel }));
  };

  const handleGameOver = (finalScore: number) => {
    setGameState(prev => ({ ...prev, isPlaying: false }));
    onGameOver(finalScore);
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
        <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-600 shadow-2xl">
          
          {/* Механика игры - объяснение */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-black/70 px-4 py-2 rounded-lg border border-white/20">
              <div className="flex gap-4 items-center text-sm">
                <div className="flex gap-1 items-center">
                  <span className="text-green-400 font-bold">ЛОВИТЬ:</span>
                  <span className="text-2xl">❤️💰👤+✓</span>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="flex gap-1 items-center">
                  <span className="text-red-400 font-bold">ИЗБЕГАТЬ:</span>
                  <span className="text-2xl">👎😠🔨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Зоны ловли - Лапки капибары */}
          <div className="absolute inset-4 pointer-events-auto">
            {[
              { pos: 'top-0 left-0', label: 'Q', key: '1', zone: 0, rotation: 'rotate-12' },
              { pos: 'top-0 right-0', label: 'W', key: '2', zone: 1, rotation: '-rotate-12' },
              { pos: 'bottom-0 left-0', label: 'A', key: '3', zone: 2, rotation: 'rotate-12' },
              { pos: 'bottom-0 right-0', label: 'S', key: '4', zone: 3, rotation: '-rotate-12' },
            ].map((zoneData, index) => (
              <div
                key={index}
                className={`absolute ${zoneData.pos} ${zoneData.rotation} group cursor-pointer transition-all duration-300 hover:scale-110 hover:-rotate-2 active:scale-95`}
                onClick={() => {
                  // Мобильное управление - тап по зонам
                  if (gameState.isPlaying && !gameState.isPaused) {
                    const event = new KeyboardEvent('keydown', {
                      key: ['q', 'w', 'a', 's'][zoneData.zone]
                    });
                    window.dispatchEvent(event);
                  }
                }}
              >
                {/* Лапка капибары */}
                <div className="relative">
                  {/* Основание лапки */}
                  <div className="w-20 h-24 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full shadow-lg border-2 border-amber-600/30 relative overflow-hidden">
                    {/* Градиентное свечение */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Пальчики */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-6 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full border border-amber-600/20 transform group-hover:translate-y-1 transition-transform duration-300"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Подушечка лапки */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-pink-300/60 rounded-full border border-pink-400/30"></div>
                    
                    {/* Клавиша управления */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <span className="text-sm font-bold">{zoneData.key}</span>
                      </div>
                    </div>
                    
                    {/* Пульсирующее кольцо при готовности */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/50 scale-110 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                  </div>
                  
                  {/* Подпись зоны */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs text-white/60 font-medium bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                      зона {zoneData.key}
                    </div>
                  </div>
                  
                  {/* Эффект частиц при активации */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-150">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '0.6s'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Game Logic */}
          <FallingGameLogic
            isPlaying={gameState.isPlaying && !gameState.isPaused}
            onScoreChange={handleScoreChange}
            onLivesChange={handleLivesChange}
            onHypeChange={handleHypeChange}
            onGameOver={handleGameOver}
          />
          
          {/* Capybara Character */}
          <div className="flex justify-center items-center min-h-[400px] relative z-10">
            <CapybaraCharacter 
              mood={gameState.lives === 1 ? "sad" : gameState.hypeLevel >= 100 ? "happy" : "catching"} 
            />
          </div>

          {/* Control Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 px-6 py-3 rounded-lg border border-white/20">
              <div className="text-center">
                <div className="text-white/80 font-bold mb-1">УПРАВЛЕНИЕ</div>
                <div className="flex gap-6 text-sm">
                  <div className="text-white/60">
                    <span className="font-bold">ПК:</span> Q W A S
                  </div>
                  <div className="w-px h-4 bg-white/20"></div>
                  <div className="text-white/60">
                    <span className="font-bold">МОБИЛА:</span> Тап по углам
                  </div>
                </div>
              </div>
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
                  onClick={() => {
                    handlePause();
                    setGameState(prev => ({ ...prev, isPlaying: true }));
                  }}
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