import { cn } from "@/lib/utils";
import capybaraImage from "@/assets/capybara-streamer.jpg";

interface CapybaraCharacterProps {
  mood: 'idle' | 'catching' | 'happy' | 'sad' | 'defeated';
  className?: string;
}

export const CapybaraCharacter = ({ mood, className }: CapybaraCharacterProps) => {
  const getMoodClass = () => {
    switch (mood) {
      case 'idle':
        return 'capybara-idle';
      case 'catching':
        return 'animate-bounce-gentle';
      case 'happy':
        return 'animate-glow-pulse';
      case 'sad':
        return 'animate-wiggle';
      case 'defeated':
        return 'animate-slide-in-bottom';
      default:
        return 'capybara-idle';
    }
  };

  return (
    <div className={cn("relative flex justify-center", className)}>
      <div className={cn("relative", getMoodClass())}>
        <img
          src={capybaraImage}
          alt="Капибара-стример"
          className="w-64 h-36 object-cover rounded-2xl shadow-glow"
        />
        
        {/* Mood overlay effects */}
        {mood === 'happy' && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce">
            ✨ +10 ✨
          </div>
        )}
        
        {mood === 'sad' && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-float">
            💔 -1
          </div>
        )}
        
        {/* Gaming setup elements */}
        <div className="absolute -left-4 -top-2 text-2xl animate-float">🎧</div>
        <div className="absolute -right-4 -bottom-2 text-2xl animate-bounce-gentle">🎮</div>
      </div>
    </div>
  );
};