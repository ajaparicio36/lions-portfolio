"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TeamPortfolio from "./components/TeamPortfolio";
import PlayerSection from "./components/PlayerSection";

const players = [
  {
    name: "Anthony John Aparicio",
    ign: "Tatayless",
    role: "Controller (Team Captain)",
    achievements: [
      "Mineski VxV 2021 Semifinalists",
      "E-Pulze Valorant - 2x Champions",
      "Mineski VxV 2023 Quarterfinalists",
      "JBL Tournament Quarterfinalists",
      "VCL 2022 Top 32",
      "VCL 2023 Top 24",
    ],
  },
  {
    name: "Jan Karl Soloma",
    ign: "Corazon",
    role: "Initiator (In-game Leader)",
    achievements: [
      "Nvidia invitational Top 5 PH representative",
      "TOP 6 (VCT) Valorant Challengers PH Split 1",
      "TOP 7 VCL Quali 1 2024",
      "Champion ZOTAC CUP Valorant 5v5 Asia #52 Champions",
      "Champion ONE Esports Community Tournament #3",
      "Champion ONE Esports VALORANT Community Tournament 2023 - South East Asia #1",
    ],
  },
  {
    name: "Lucky Eduard Figueroa",
    ign: "chasm",
    role: "Flex",
    achievements: [
      "Top 61 FNCS grand royale",
      "Top 36 semis FNCS",
      "1x finalist FNCS",
      "Pop-X Bacolod Champions",
    ],
  },
  {
    name: "Jay Seron",
    ign: "soz",
    role: "Duelist",
    achievements: [
      "ONI Tournament Champion",
      "Dark League Studio Valorant Quarter finalist",
      "GameFest 2023 Iloilo - 1st Runner Up",
      "MSI iCafe Attack 2nd Runner-Up",
      "VCL PH 2023 - Top 24",
    ],
  },
  {
    name: "Jim Eduard Perocho",
    ign: "monspeeT",
    role: "Sentinel",
    achievements: [
      "Honda x Estudyante Esports League Semi-Finalists",
      "MSI iCafe Attack 2nd Runner-up",
      "VCL PH 2023 - Top 24",
    ],
  },
];

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);

  const logoScale = useTransform(scrollY, [0, 300], [1, 0.6]);
  const logoY = useTransform(scrollY, [0, 300], [0, -50]);
  const textOpacity = useTransform(scrollY, [100, 300], [0, 1]);
  const textY = useTransform(scrollY, [100, 300], [50, 0]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        ref={heroRef}
        className="h-screen flex flex-col justify-center items-center relative overflow-hidden"
      >
        <div className="container h-full mx-auto px-4 py-8 flex flex-col justify-center items-center">
          <motion.div
            style={{ scale: logoScale, y: logoY }}
            className="flex justify-center mb-8 origin-center"
          >
            <Image
              src="/logo.jpg"
              alt="GLE Hiraya Logo"
              width={800}
              height={800}
              className="w-[600px] h-[600px] object-contain rounded-full"
              priority
            />
          </motion.div>
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-4 text-primary">GLE Hiraya</h1>
            <p className="text-2xl mb-2 text-secondary">Established 2023</p>
            <p className="text-xl mb-8 text-muted-foreground">
              {"Home of Iloilo's Finest Collegiate Team"}
            </p>
          </motion.div>
        </div>
      </section>

      {players.map((player, index) => (
        <PlayerSection key={player.ign} player={player} index={index} />
      ))}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-md z-50 text-xl shadow-lg"
        onClick={() => setShowPortfolio(true)}
      >
        Team Portfolio →
      </motion.button>
      {showPortfolio && (
        <TeamPortfolio onClose={() => setShowPortfolio(false)} />
      )}
    </main>
  );
}
