"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AvatarNovaX({ mode = "idle" }: { mode?: string }) {
  const avatars = {
    idle: {
      src: "/novax-idle.png",
      alt: "NovaX Idle",
      className: "opacity-80",
    },
    scan: {
      src: "/novax-scan.png",
      alt: "NovaX Scanning",
      className: "animate-pulse",
    },
    sync: {
      src: "/novax-sync.png",
      alt: "NovaX Synchronisé",
      className: "animate-spin-slow",
    },
    alert: {
      src: "/novax-alert.png",
      alt: "NovaX Alerte",
      className: "animate-shake",
    },
    ultramode: {
      src: "/novax-ultra.png",
      alt: "NovaX Ultra Mode",
      className: "animate-ping",
    },
  };

  const avatar = avatars[mode as keyof typeof avatars] || avatars.idle;

  return (
    <motion.div
      className="flex justify-center mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Image
        src={avatar.src}
        alt={avatar.alt}
        width={160}
        height={160}
        className={`rounded-full shadow-2xl border border-cyan-500/30 ${avatar.className}`}
      />
    </motion.div>
  );
}
