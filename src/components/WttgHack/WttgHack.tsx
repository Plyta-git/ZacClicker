import { useState, useEffect, useRef, useCallback } from "react";
import { csharpSnippets } from "../../const/csharpSnippets";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "../../hooks/useTypewriter";
import useSound from "use-sound";
import { useRandomTimeout } from "../../hooks/useRandomTimeout";
import useGameStore from "@/hooks/useGameStore/useGameStore";

const WttgHack = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [snippet, setSnippet] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const playerPoints = useGameStore((store) => store.playerPoints);
  const decreasePoints = useGameStore((store) => store.decreasePoints);

  const displayedSnippet = useTypewriter(snippet, 50);
  const [playBuyItemSound] = useSound("/buyitem.wav", { volume: 0.2 });
  const [playHackSound] = useSound("/hack.mp3", { volume: 0.1 });

  const showHack = useCallback(() => {
    playHackSound();
    setSnippet(
      csharpSnippets[Math.floor(Math.random() * csharpSnippets.length)]
    );
    setUserInput("");
    setTimeLeft(30);
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [playHackSound]);

  const { run: scheduleNextHack } = useRandomTimeout(
    showHack,
    60 * 1000 * 0.5,
    60 * 1000 * 1.5
    // 60 * 100 * 0.5,
    // 60 * 100 * 1.5
  );

  useEffect(() => {
    scheduleNextHack();
  }, [scheduleNextHack]);

  useEffect(() => {
    if (!isOpen) return;

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      handleTimeout();
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, timeLeft]);

  const handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isOpen) return;
    const { value } = e.target;
    setUserInput(value);
    playBuyItemSound();
    if (value === snippet) {
      handleSuccess();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    scheduleNextHack();
  };

  const handleSuccess = () => {
    handleClose();
  };

  const handleTimeout = () => {
    const pointsToTake = Math.floor(playerPoints * 0.2);
    decreasePoints(pointsToTake);
    handleClose();
  };

  const renderColoredInput = () => {
    if (!userInput) {
      return <span className="invisible">_</span>;
    }

    let firstMismatchIndex = -1;
    for (let i = 0; i < userInput.length; i++) {
      if (i >= snippet.length || userInput[i] !== snippet[i]) {
        firstMismatchIndex = i;
        break;
      }
    }

    if (firstMismatchIndex === -1) {
      return <span className="text-green-500">{userInput}</span>;
    }

    const correctPart = userInput.substring(0, firstMismatchIndex);
    const incorrectPart = userInput.substring(firstMismatchIndex);

    return (
      <>
        <span className="text-green-500">{correctPart}</span>
        <span className="text-red-500">{incorrectPart}</span>
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-gray-950 flex items-center justify-center "
        >
          <div className="relative w-1/2  p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-white">Przepisz kod</h2>
            <div className="text-lg text-red-500 mb-4">Czas: {timeLeft}s</div>
            <div className="flex-grow flex flex-col gap-4">
              <pre className="bg-gray-800 p-4 rounded-md text-white overflow-auto font-mono whitespace-pre">
                <code>{displayedSnippet}</code>
              </pre>
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleUserInput}
                  className="absolute inset-0 z-10 bg-transparent text-transparent caret-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto font-mono whitespace-pre"
                  spellCheck="false"
                  rows={1}
                />
                <div
                  className="bg-gray-800 p-4 rounded-md overflow-auto font-mono whitespace-pre"
                  aria-hidden="true"
                >
                  {renderColoredInput()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WttgHack;
