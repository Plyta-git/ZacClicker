import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useState, useEffect, useRef } from "react";

type EmoteProps = {
  id: number;
  src: string;
};

const Emote = ({ id, src }: EmoteProps) => {
  const [position, setPosition] = useState({ left: 50, top: 50 });
  const velocity = useRef({ dx: 0, dy: 0 });

  useEffect(() => {
    setPosition({
      left: Math.random() * 90,
      top: Math.random() * 90,
    });

    const speed = 0.15 + Math.random() * 0.05;
    const angle = Math.random() * 2 * Math.PI;
    velocity.current = {
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
    };

    let animationFrameId: number;
    const animate = () => {
      setPosition((pos) => {
        let newLeft = pos.left + velocity.current.dx;
        let newTop = pos.top + velocity.current.dy;

        if (newLeft <= 0 || newLeft >= 95) {
          console.log(`Emote ${id} hit horizontal wall`);
          velocity.current.dx *= -1;
          newLeft = pos.left + velocity.current.dx;
        }
        if (newTop <= 0 || newTop >= 95) {
          console.log(`Emote ${id} hit vertical wall`);
          velocity.current.dy *= -1;
          newTop = pos.top + velocity.current.dy;
        }

        return { left: newLeft, top: newTop };
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [id]);

  return (
    <img
      src={src}
      alt="emote"
      className="absolute pointer-events-none"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        transform: "scale(0.5)",
      }}
    />
  );
};

export default function GucciArmia() {
  const gucciCount = useGameStore((store) => store.eq.get(2) || 0);
  const [emotes, setEmotes] = useState<{ id: number }[]>([]);

  useEffect(() => {
    setEmotes((currentEmotes) => {
      const currentCount = currentEmotes.length;
      const difference = gucciCount - currentCount;

      if (difference > 0) {
        const newEmotes = Array.from({ length: difference }, () => ({
          id: Date.now() + Math.random(),
        }));
        return [...currentEmotes, ...newEmotes];
      }

      if (difference < 0) {
        return currentEmotes.slice(0, gucciCount);
      }

      return currentEmotes;
    });
  }, [gucciCount]);

  return (
    <div className="absolute w-full h-full overflow-hidden pointer-events-none">
      {emotes.map((e) => (
        <Emote key={e.id} id={e.id} src={"/gucciKiedyFortnajt.gif"} />
      ))}
    </div>
  );
}
