import { useState } from "react";
import { MainMenu } from "./MainMenu";
import { GameScreen } from "./GameScreen";
import { GameOverScreen } from "./GameOverScreen";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameItem } from "./GameItem";

type GameState = 'menu' | 'playing' | 'gameOver';

export const GameDemo = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameData, setGameData] = useState({
    bestScore: 8750,
    finalScore: 0,
    isMuted: false,
    isNewRecord: false
  });

  const handlePlayClick = () => {
    setGameState('playing');
  };

  const handleGameOver = (score: number) => {
    const isNewRecord = score > gameData.bestScore;
    setGameData(prev => ({
      ...prev,
      finalScore: score,
      isNewRecord,
      bestScore: isNewRecord ? score : prev.bestScore
    }));
    setGameState('gameOver');
  };

  const handlePlayAgain = () => {
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const handleToggleSound = () => {
    setGameData(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const renderCurrentScreen = () => {
    switch (gameState) {
      case 'menu':
        return (
          <MainMenu
            bestScore={gameData.bestScore}
            isMuted={gameData.isMuted}
            onPlayClick={handlePlayClick}
            onToggleSound={handleToggleSound}
          />
        );
      case 'playing':
        return <GameScreen onBackToMenu={handleBackToMenu} onGameOver={handleGameOver} />;
      case 'gameOver':
        return (
          <GameOverScreen
            finalScore={gameData.finalScore}
            bestScore={gameData.bestScore}
            isNewRecord={gameData.isNewRecord}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {renderCurrentScreen()}
      
      {/* Demo Controls */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="p-4 bg-card/90 backdrop-blur-sm border border-border/50">
          <div className="text-sm font-semibold mb-3 text-center">
            🎨 ДЕМО КОНТРОЛЛЫ
          </div>
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant={gameState === 'menu' ? 'default' : 'outline'}
              onClick={() => setGameState('menu')}
              className="text-xs"
            >
              Главное меню
            </Button>
            <Button
              size="sm"
              variant={gameState === 'playing' ? 'default' : 'outline'}
              onClick={() => setGameState('playing')}
              className="text-xs"
            >
              Игровой экран
            </Button>
            <Button
              size="sm"
              variant={gameState === 'gameOver' ? 'default' : 'outline'}
              onClick={() => {
                setGameData(prev => ({ ...prev, finalScore: 12340, isNewRecord: true }));
                setGameState('gameOver');
              }}
              className="text-xs"
            >
              Экран окончания
            </Button>
          </div>
        </Card>
      </div>

      {/* Game Items Showcase */}
      {gameState === 'menu' && (
        <div className="fixed bottom-4 left-4 z-40">
          <Card className="p-4 bg-card/90 backdrop-blur-sm border border-border/50">
            <div className="text-sm font-semibold mb-3 text-center">
              🎮 ИГРОВЫЕ ОБЪЕКТЫ
            </div>
            <div className="grid grid-cols-4 gap-2 mb-3">
              <GameItem type="like" className="scale-75" />
              <GameItem type="donate" className="scale-75" />
              <GameItem type="subscribe" className="scale-75" />
              <GameItem type="verify" className="scale-75" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <GameItem type="dislike" className="scale-75" />
              <GameItem type="hate" className="scale-75" />
              <GameItem type="ban" className="scale-75" />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};