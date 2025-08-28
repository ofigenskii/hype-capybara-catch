import { cn } from "@/lib/utils";
import likeIcon from "@/assets/like-icon.png";
import donateIcon from "@/assets/donate-icon.png";
import subscribeIcon from "@/assets/subscribe-icon.png";
import verifyIcon from "@/assets/verify-icon.png";
import dislikeIcon from "@/assets/dislike-icon.png";
import hateIcon from "@/assets/hate-icon.png";
import banIcon from "@/assets/ban-icon.png";

interface GameItemProps {
  type: 'like' | 'donate' | 'subscribe' | 'verify' | 'dislike' | 'hate' | 'ban';
  className?: string;
}

const ITEM_CONFIGS = {
  // Positive items - PNG иконки с эффектами свечения
  like: { icon: likeIcon, bgClass: 'bg-green-500/20 border-2 border-green-400 shadow-[0_0_20px_rgb(34,197,94)]', positive: true },
  donate: { icon: donateIcon, bgClass: 'bg-yellow-500/20 border-2 border-yellow-400 shadow-[0_0_20px_rgb(234,179,8)]', positive: true },
  subscribe: { icon: subscribeIcon, bgClass: 'bg-blue-500/20 border-2 border-blue-400 shadow-[0_0_20px_rgb(59,130,246)]', positive: true },
  verify: { icon: verifyIcon, bgClass: 'bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_20px_rgb(16,185,129)]', positive: true },
  
  // Negative items - PNG иконки с красными эффектами
  dislike: { icon: dislikeIcon, bgClass: 'bg-red-600/20 border-2 border-red-400 shadow-[0_0_20px_rgb(220,38,38)]', positive: false },
  hate: { icon: hateIcon, bgClass: 'bg-orange-600/20 border-2 border-orange-400 shadow-[0_0_20px_rgb(234,88,12)]', positive: false },
  ban: { icon: banIcon, bgClass: 'bg-purple-800/20 border-2 border-purple-400 shadow-[0_0_20px_rgb(107,33,168)]', positive: false },
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
      <img 
        src={config.icon} 
        alt={`${type} icon`}
        className="w-12 h-12 object-contain drop-shadow-lg"
      />
    </div>
  );
};