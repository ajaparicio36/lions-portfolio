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
      className="min-h-screen relative flex items-center overflow-hidden bg-gradient-to-br from-background to-muted px-4"
    >
      <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-center">
        <motion.div
          className="w-full md:w-1/2 mb-8 md:mb-0"
          style={{ scale: imageScale, x: imageX }}
        >
          <Image
            src={`/players/${player.ign.toLowerCase()}.jpg`}
            alt={player.name}
            width={600}
            height={600}
            className="w-full max-w-[300px] md:max-w-[600px] h-auto object-contain mx-auto"
            priority={index === 0}
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          style={{ opacity: contentOpacity, x: contentX }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {player.name}
          </h2>
          <p className="text-xl md:text-2xl text-secondary mb-2">
            {player.ign}
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            {player.role}
          </p>
          <button
            onClick={() => setShowAchievements(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-md transition-colors"
          >
            Full Achievements
          </button>
        </motion.div>
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
