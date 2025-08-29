import { cn } from "@/lib/utils";

interface GameItemProps {
  type: 'like' | 'donate' | 'subscribe' | 'verify' | 'dislike' | 'hate' | 'ban';
  className?: string;
}

const ITEM_CONFIGS = {
  // Positive items - Эмоджи с эффектами свечения
  like: { emoji: '💚', bgClass: 'bg-green-500/20 border-2 border-green-400 shadow-[0_0_20px_rgb(34,197,94)]', positive: true },
  donate: { emoji: '💰', bgClass: 'bg-yellow-500/20 border-2 border-yellow-400 shadow-[0_0_20px_rgb(234,179,8)]', positive: true },
  subscribe: { emoji: '🔔', bgClass: 'bg-blue-500/20 border-2 border-blue-400 shadow-[0_0_20px_rgb(59,130,246)]', positive: true },
  verify: { emoji: '✅', bgClass: 'bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_20px_rgb(16,185,129)]', positive: true },
  
  // Negative items - Эмоджи с красными эффектами
  dislike: { emoji: '👎', bgClass: 'bg-red-600/20 border-2 border-red-400 shadow-[0_0_20px_rgb(220,38,38)]', positive: false },
  hate: { emoji: '😠', bgClass: 'bg-orange-600/20 border-2 border-orange-400 shadow-[0_0_20px_rgb(234,88,12)]', positive: false },
  ban: { emoji: '🔨', bgClass: 'bg-purple-800/20 border-2 border-purple-400 shadow-[0_0_20px_rgb(107,33,168)]', positive: false },
} as const;

export const GameItem = ({ type, className }: GameItemProps) => {
  const config = ITEM_CONFIGS[type];
  
  return (
    <div
      className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110",
        config.bgClass,
        className
      )}
    >
      <span 
        className="text-3xl select-none drop-shadow-lg"
        role="img"
        aria-label={`${type} emoji`}
      >
        {config.emoji}
      </span>
    </div>
  );
};