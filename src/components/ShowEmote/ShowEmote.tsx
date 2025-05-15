import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useState, useEffect } from "react";

type EmoteType = {
  id: number;
  src: string;
  left: number;
  top: number;
  leaving: boolean;
};

const EMOTES = ["/gucciKiedyFortnajt.gif", "/gucioF.png"];
const Emote = ({ src, left, top, leaving }: EmoteType) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <img
      src={src}
      alt="emote"
      className={` 
                absolute pointer-events-none
                transition-opacity ease-out
                duration-200
                ${visible && !leaving ? "opacity-100" : "opacity-0"}
            `}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: "scale(0.5)",
      }}
    />
  );
};

export default function ShowEmote() {
  const [emotes, setEmotes] = useState<EmoteType[]>([]);
  const showEmotes = useGameStore((store) => store.activeEvents.showemotes);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    function scheduleNext() {
      const delay = 2000 + Math.random() * 10000;
      timer = setTimeout(() => {
        spawnEmote();
        scheduleNext();
      }, delay);
    }

    function spawnEmote() {
      const id = Date.now();
      const src = EMOTES[Math.floor(Math.random() * EMOTES.length)];
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      setEmotes((list) => [...list, { id, src, left, top, leaving: false }]);
      setTimeout(() => {
        setEmotes((list) =>
          list.map((e) =>
            e.id === id
              ? {
                  ...e,
                  leaving: true,
                }
              : e
          )
        );
      }, 2000);

      setTimeout(() => {
        setEmotes((list) => list.filter((e) => e.id !== id));
      }, 3000);
    }

    scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  if (!showEmotes) return <></>;
  return (
    <div className="absolute w-full h-full overflow-hidden pointer-events-none">
      {emotes.map((e) => (
        <Emote key={e.id} {...e} />
      ))}
    </div>
  );
}
