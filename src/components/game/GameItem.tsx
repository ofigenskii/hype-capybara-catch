import { cn } from "@/lib/utils";

interface GameItemProps {
  type: 'like' | 'donate' | 'subscribe' | 'verify' | 'dislike' | 'hate' | 'ban';
  className?: string;
}

const ITEM_CONFIGS = {
  // Positive items
  like: { emoji: '❤️', bgClass: 'bg-gradient-to-br from-game-like to-pink-400', positive: true },
  donate: { emoji: '💰', bgClass: 'bg-gradient-to-br from-game-donate to-yellow-400', positive: true },
  subscribe: { emoji: '👤+', bgClass: 'bg-gradient-to-br from-game-subscribe to-blue-400', positive: true },
  verify: { emoji: '✓', bgClass: 'bg-gradient-to-br from-game-verify to-amber-400', positive: true },
  
  // Negative items
  dislike: { emoji: '👎', bgClass: 'bg-gradient-to-br from-game-dislike to-red-600', positive: false },
  hate: { emoji: '😠', bgClass: 'bg-gradient-to-br from-game-hate to-orange-600', positive: false },
  ban: { emoji: '🔨', bgClass: 'bg-gradient-to-br from-game-ban to-purple-600', positive: false },
} as const;

export const GameItem = ({ type, className }: GameItemProps) => {
  const config = ITEM_CONFIGS[type];
  
  return (
    <div
      className={cn(
        "game-item",
        config.bgClass,
        config.positive ? "shadow-neon" : "shadow-[0_0_20px_hsl(var(--destructive)/0.5)]",
        className
      )}
    >
      <span className="text-2xl">{config.emoji}</span>
    </div>
  );
};