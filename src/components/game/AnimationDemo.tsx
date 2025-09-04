import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameItem } from "./GameItem";
import { CapybaraCharacter } from "./CapybaraCharacter";

export const AnimationDemo = () => {
  const [currentDemo, setCurrentDemo] = useState<string>('idle');
  const [showEffect, setShowEffect] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  // Автосброс эффектов
  useEffect(() => {
    if (showEffect) {
      const timer = setTimeout(() => setShowEffect(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showEffect]);

  const triggerAnimation = (type: string) => {
    setCurrentDemo(type);
    setShowEffect(true);
    
    // Имитируем изменения счета/жизней
    if (type === 'happy') {
      setScore(prev => prev + 10);
    } else if (type === 'sad') {
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const resetDemo = () => {
    setCurrentDemo('idle');
    setShowEffect(false);
    setScore(0);
    setLives(3);
  };

  return (
    <div className="min-h-screen streaming-bg p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <Card className="mb-6 p-6 bg-card/90 backdrop-blur-sm">
          <h1 className="text-3xl font-bold neon-text mb-2">
            🎭 Демонстрация Анимаций
          </h1>
          <p className="text-muted-foreground">
            Нажимайте на кнопки чтобы увидеть различные анимации персонажа и эффекты
          </p>
        </Card>

        {/* Main Demo Area */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Character Demo */}
          <Card className="p-6 bg-card/90 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4">🐹 Анимации Капибары</h2>
            
            {/* Game Stats */}
            <div className="flex justify-between mb-6">
              <div className="game-counter">
                <span className="text-accent">Счет:</span> {score}
              </div>
              <div className="game-counter">
                <span className="text-destructive">❤️</span> {lives}
              </div>
            </div>

            {/* Character Display */}
            <div className="relative h-48 flex items-center justify-center mb-6">
              <CapybaraCharacter mood={currentDemo as any} />
              
              {/* Floating Effects */}
              {showEffect && currentDemo === 'happy' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce z-10">
                  ✨ +10 ✨
                </div>
              )}
              
              {showEffect && currentDemo === 'sad' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-float z-10">
                  💔 -1
                </div>
              )}
            </div>

            {/* Animation Controls */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={currentDemo === 'idle' ? 'default' : 'outline'}
                onClick={() => setCurrentDemo('idle')}
                className="text-sm"
              >
                😴 Idle
              </Button>
              <Button
                variant={currentDemo === 'catching' ? 'default' : 'outline'}
                onClick={() => triggerAnimation('catching')}
                className="text-sm"
              >
                🤸 Catching
              </Button>
              <Button
                variant={currentDemo === 'happy' ? 'default' : 'outline'}
                onClick={() => triggerAnimation('happy')}
                className="text-sm"
              >
                😄 Happy
              </Button>
              <Button
                variant={currentDemo === 'sad' ? 'default' : 'outline'}
                onClick={() => triggerAnimation('sad')}
                className="text-sm"
              >
                😢 Sad
              </Button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => triggerAnimation('defeated')}
              className="w-full mt-3 text-sm"
            >
              💀 Defeated
            </Button>
          </Card>

          {/* Object Demo */}
          <Card className="p-6 bg-card/90 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4">🎮 Анимации Объектов</h2>
            
            {/* Positive Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-accent">
                ✨ Позитивные (нужно ловить)
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`game-item-positive ${showEffect ? 'animate-scale-out' : ''}`}>
                    <GameItem type="like" />
                  </div>
                  <p className="text-xs mt-2">Like +10</p>
                </div>
                <div className="text-center">
                  <div className={`game-item-positive ${showEffect ? 'animate-scale-out' : ''}`}>
                    <GameItem type="donate" />
                  </div>
                  <p className="text-xs mt-2">Donate +10</p>
                </div>
                <div className="text-center">
                  <div className={`game-item-positive ${showEffect ? 'animate-scale-out' : ''}`}>
                    <GameItem type="subscribe" />
                  </div>
                  <p className="text-xs mt-2">Sub +10</p>
                </div>
                <div className="text-center">
                  <div className={`game-item-positive ${showEffect ? 'animate-scale-out' : ''}`}>
                    <GameItem type="verify" />
                  </div>
                  <p className="text-xs mt-2">Verify +25</p>
                </div>
              </div>
            </div>

            {/* Negative Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-destructive">
                💥 Негативные (нужно избегать)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`game-item-negative ${showEffect ? 'animate-pulse' : ''}`}>
                    <GameItem type="dislike" />
                  </div>
                  <p className="text-xs mt-2">Dislike -1❤️</p>
                </div>
                <div className="text-center">
                  <div className={`game-item-negative ${showEffect ? 'animate-pulse' : ''}`}>
                    <GameItem type="hate" />
                  </div>
                  <p className="text-xs mt-2">Hate -1❤️</p>
                </div>
                <div className="text-center">
                  <div className={`game-item-negative ${showEffect ? 'animate-pulse' : ''}`}>
                    <GameItem type="ban" />
                  </div>
                  <p className="text-xs mt-2">Ban -1❤️</p>
                </div>
              </div>
            </div>

            {/* Effect Triggers */}
            <div className="space-y-2">
              <Button
                onClick={() => setShowEffect(true)}
                className="w-full game-button text-sm"
              >
                🌟 Показать эффекты ловли
              </Button>
              <Button
                variant="outline"
                onClick={resetDemo}
                className="w-full text-sm"
              >
                🔄 Сбросить демо
              </Button>
            </div>
          </Card>
        </div>

        {/* Animation Details */}
        <Card className="p-6 bg-card/90 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">📋 Описание Анимаций</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-primary">Персонаж:</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="bg-muted px-2 py-1 rounded">idle</code> - Спокойное покачивание</li>
                <li><code className="bg-muted px-2 py-1 rounded">catching</code> - Активный отскок при ловле</li>
                <li><code className="bg-muted px-2 py-1 rounded">happy</code> - Пульсирующее свечение</li>
                <li><code className="bg-muted px-2 py-1 rounded">sad</code> - Дрожание при уроне</li>
                <li><code className="bg-muted px-2 py-1 rounded">defeated</code> - Скольжение вниз</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-secondary">Объекты:</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="bg-muted px-2 py-1 rounded">scale-out</code> - Исчезновение при ловле</li>
                <li><code className="bg-muted px-2 py-1 rounded">fade-out</code> - Затухание при пропуске</li>
                <li><code className="bg-muted px-2 py-1 rounded">pulse</code> - Красное мигание урона</li>
                <li><code className="bg-muted px-2 py-1 rounded">float</code> - Плавание объектов</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="px-8"
          >
            ← Вернуться к игре
          </Button>
        </div>
      </div>
    </div>
  );
};