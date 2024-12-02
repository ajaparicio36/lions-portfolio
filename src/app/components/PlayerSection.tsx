"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import FullAchievements from "./FullAchievements";

interface PlayerSectionProps {
  player: {
    name: string;
    ign: string;
    role: string;
    achievements: string[];
  };
  index: number;
}

export default function PlayerSection({ player, index }: PlayerSectionProps) {
  const [showAchievements, setShowAchievements] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.8]);
  const imageX = useTransform(scrollYProgress, [0.3, 0.5], ["0%", "-25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const contentX = useTransform(scrollYProgress, [0.4, 0.5], ["100%", "0%"]);

  return (
    <section
      ref={sectionRef}
      className="h-screen relative flex items-center overflow-hidden bg-gradient-to-br from-background to-muted"
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="flex items-center w-full h-full relative">
          <motion.div
            className="absolute inset-0 flex items-center "
            style={{ scale: imageScale, x: imageX }}
          >
            <Image
              src={`/players/${player.ign.toLowerCase()}.jpg`}
              alt={player.name}
              width={1200}
              height={1200}
              className="w-full h-[90vh] object-contain object-center rounded-lg"
              priority={index === 0}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
          >
            <h2 className="text-4xl font-bold text-primary mb-2">
              {player.name}
            </h2>
            <p className="text-2xl text-secondary">{player.ign}</p>
          </motion.div>

          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-8 rounded-l-lg max-w-md"
            style={{ opacity: contentOpacity, x: contentX }}
          >
            <h2 className="text-3xl font-bold text-primary mb-2">
              {player.name}
            </h2>
            <p className="text-2xl text-secondary mb-2">{player.ign}</p>
            <p className="text-xl text-muted-foreground mb-4">{player.role}</p>
            <button
              onClick={() => setShowAchievements(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-md transition-colors"
            >
              Achievements
            </button>
          </motion.div>
        </div>
      </div>
      {showAchievements && (
        <FullAchievements
          player={player}
          onClose={() => setShowAchievements(false)}
        />
      )}
    </section>
  );
}
