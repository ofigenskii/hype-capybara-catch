import { useState, useEffect, useCallback } from "react";
import { GameItem } from "./GameItem";

interface FallingItem {
  id: string;
  type: 'like' | 'donate' | 'subscribe' | 'verify' | 'dislike' | 'hate' | 'ban';
  x: number;
  y: number;
  speed: number;
  zone: number; // 0-3 для четырех углов
}

interface FallingGameLogicProps {
  isPlaying: boolean;
  onScoreChange: (score: number) => void;
  onLivesChange: (lives: number) => void;
  onHypeChange: (hype: number) => void;
  onGameOver: (score: number) => void;
}

const ITEM_TYPES = ['like', 'donate', 'subscribe', 'verify', 'dislike', 'hate', 'ban'] as const;
const POSITIVE_ITEMS = ['like', 'donate', 'subscribe', 'verify'];
const NEGATIVE_ITEMS = ['dislike', 'hate', 'ban'];

export const FallingGameLogic = ({ 
  isPlaying, 
  onScoreChange, 
  onLivesChange, 
  onHypeChange, 
  onGameOver 
}: FallingGameLogicProps) => {
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [hype, setHype] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [lastSpawnTime, setLastSpawnTime] = useState(0);

  // Управление клавишами
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isPlaying) return;

    let zone = -1;
    switch (event.key.toLowerCase()) {
      case 'q': zone = 0; break;
      case 'w': zone = 1; break;
      case 'a': zone = 2; break;
      case 's': zone = 3; break;
    }

    if (zone >= 0) {
      catchItem(zone);
    }
  }, [isPlaying]);

  // Ловля предметов
  const catchItem = (zone: number) => {
    setItems(prevItems => {
      const itemInZone = prevItems.find(item => 
        item.zone === zone && item.y > window.innerHeight * 0.7
      );

      if (itemInZone) {
        const isPositive = POSITIVE_ITEMS.includes(itemInZone.type as any);
        const points = itemInZone.type === 'verify' ? 25 : 10;
        
        if (isPositive) {
          const newScore = score + points * (hype >= 100 ? 2 : 1);
          const newHype = Math.min(100, hype + 5);
          setScore(newScore);
          setHype(newHype);
          onScoreChange(newScore);
          onHypeChange(newHype);
        } else {
          const newLives = Math.max(0, lives - 1);
          setLives(newLives);
          onLivesChange(newLives);
          
          if (newLives === 0) {
            onGameOver(score);
          }
        }

        return prevItems.filter(item => item.id !== itemInZone.id);
      }
      return prevItems;
    });
  };

  // Создание нового предмета
  const spawnItem = () => {
    const zone = Math.floor(Math.random() * 4);
    const type = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
    
    const newItem: FallingItem = {
      id: Date.now() + Math.random().toString(),
      type,
      x: zone % 2 === 0 ? 20 : window.innerWidth - 100,
      y: -50,
      speed: 1 + Math.random() * gameSpeed,
      zone
    };

    setItems(prev => [...prev, newItem]);
  };

  // Обновление позиций предметов
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      const now = Date.now();
      
      // Спавн новых предметов
      if (now - lastSpawnTime > 1000 / gameSpeed) {
        spawnItem();
        setLastSpawnTime(now);
      }

      // Обновление позиций и удаление упавших
      setItems(prevItems => {
        return prevItems
          .map(item => ({ ...item, y: item.y + item.speed * 2 }))
          .filter(item => {
            if (item.y > window.innerHeight + 50) {
              // Пропустили предмет
              if (POSITIVE_ITEMS.includes(item.type as any)) {
                const newLives = Math.max(0, lives - 1);
                setLives(newLives);
                onLivesChange(newLives);
                
                if (newLives === 0) {
                  onGameOver(score);
                }
              }
              return false;
            }
            return true;
          });
      });

      // Увеличение сложности
      setGameSpeed(prev => Math.min(3, prev + 0.001));
    }, 16);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameSpeed, lastSpawnTime, lives, score, onGameOver, onLivesChange]);

  // Обработка клавиш
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Сброс hype при максимуме
  useEffect(() => {
    if (hype >= 100) {
      const timer = setTimeout(() => {
        setHype(0);
        onHypeChange(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hype, onHypeChange]);

  // Сброс состояния при старте игры
  useEffect(() => {
    if (isPlaying) {
      setItems([]);
      setScore(0);
      setLives(3);
      setHype(0);
      setGameSpeed(1);
      setLastSpawnTime(Date.now());
      onScoreChange(0);
      onLivesChange(3);
      onHypeChange(0);
    }
  }, [isPlaying]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(item => (
        <div
          key={item.id}
          className="absolute transition-none pointer-events-none"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <GameItem type={item.type} />
        </div>
      ))}
    </div>
  );
};