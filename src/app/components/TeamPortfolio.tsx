import { motion } from "framer-motion";

interface TeamPortfolioProps {
  onClose: () => void;
}

const achievements = [
  { tournament: "Alliance Games S4 Western Visayas", placement: "Champions" },
  { tournament: "Alliance Games S4", placement: "Participants in NU Laguna" },
  { tournament: "Alliance Games S3", placement: "Top 8" },
  { tournament: "Acer Predator League Visayas", placement: "2nd Place" },
  { tournament: "Dark League Studios: Honda Esports", placement: "Top 4" },
  {
    tournament: "Coldzone Tournament",
    placement: "7x Champions (3rd Runner Up 2x)",
  },
  { tournament: "Pop-X Bacolod", placement: "Champions" },
  { tournament: "TNC Bacolod", placement: "Champions" },
  { tournament: "SM GameFest", placement: "Champions" },
  { tournament: "Palarong Pambansa Week 1", placement: "3rd Place" },
  { tournament: "Palarong Pambansa Week 2", placement: "2nd Place" },
  { tournament: "Iloilo Esports", placement: "2x Champion" },
  { tournament: "Iloilo vs The World Week 3", placement: "Champions" },
  { tournament: "AcadArena Aces", placement: "10x Participants" },
];

export default function TeamPortfolio({ onClose }: TeamPortfolioProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-card p-8 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Team Achievements
        </h2>
        <ul className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-muted p-4 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-secondary">
                {achievement.tournament}
              </h3>
              <p className="text-muted-foreground">{achievement.placement}</p>
            </motion.li>
          ))}
        </ul>
        <button
          className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
