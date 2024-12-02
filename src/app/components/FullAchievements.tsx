import { motion } from "framer-motion";

interface FullAchievementsProps {
  player: {
    name: string;
    ign: string;
    achievements: string[];
  };
  onClose: () => void;
}

export default function FullAchievements({
  player,
  onClose,
}: FullAchievementsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4"
    >
      <div className="bg-card p-6 md:p-8 rounded-lg w-full max-w-2xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
          {player.name} ({player.ign})
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-secondary">
          Achievements
        </h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 max-h-[60vh] overflow-y-auto">
          {player.achievements.map((achievement, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="text-sm md:text-base"
            >
              {achievement}
            </motion.li>
          ))}
        </ul>
        <div className="mt-6 md:mt-8 flex justify-center">
          <button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-md transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
}
