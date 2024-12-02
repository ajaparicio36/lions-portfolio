"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";

interface PlayerCardProps {
  name: string;
  ign: string;
  role: string;
  achievements: string[];
  index: number;
}

export default function PlayerCard({
  name,
  ign,
  role,
  achievements,
  index,
}: PlayerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0.1, 0.3], [1, 0.6]);
  const imageY = useTransform(scrollYProgress, [0.1, 0.3], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);

  return (
    <Card
      ref={cardRef}
      className="w-full max-w-sm mx-auto bg-card text-card-foreground overflow-hidden min-h-[600px]"
    >
      <div className="relative h-full">
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="relative"
        >
          <Image
            src={`/players/${ign.toLowerCase()}.jpg`}
            alt={`${name} portrait`}
            width={400}
            height={400}
            className="w-full h-[400px] object-cover object-top rounded-full"
            priority={index < 3}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-card"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          >
            <h3 className="text-2xl font-bold text-primary mb-2">{name}</h3>
            <p className="text-xl text-secondary">{ign}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute top-0 left-0 right-0 p-6 pt-[300px]"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <h3 className="text-2xl font-bold text-primary mb-2">{name}</h3>
          <p className="text-xl text-secondary mb-1">{ign}</p>
          <p className="text-lg mb-4 text-muted-foreground">{role}</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">
              Notable Achievements:
            </h4>
            <ul className="list-disc list-inside text-muted-foreground">
              {achievements.map((achievement, index) => (
                <li key={index} className="text-sm">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Card>
  );
}
