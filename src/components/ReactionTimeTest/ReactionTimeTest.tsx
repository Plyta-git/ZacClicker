import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useReactionTimeTest } from "./useReactionTimeTest";

const getBgColor = (phase: string) => {
  switch (phase) {
    case "waiting":
      return "bg-reaction-waiting";
    case "ready":
      return "bg-reaction-ready";
    case "result":
    case "cooldown":
    default:
      return "bg-reaction-result";
  }
};

const ReactionTimeTest = () => {
  const {
    phase,
    message,
    reactionTime,
    points,
    cooldownLeft,
    handleStart,
    handleScreenClick,
  } = useReactionTimeTest();

  const bgColor = getBgColor(phase);

  const reactionTimeEvent = useGameStore(
    (store) => store.activeEvents.reactiontimetest
  );

  if (!reactionTimeEvent) return <></>;

  return (
    <div
      className={`w-1/6 h-1/5 absolute top-0 right-1/5 flex flex-col items-center justify-center rounded-lg shadow-lg cursor-pointer select-none transition-colors duration-200 ${bgColor}`}
      style={{ minHeight: 180 }}
      onClick={
        phase === "waiting" || phase === "ready" ? handleScreenClick : undefined
      }
    >
      <div className="mb-4 text-center font-semibold">
        {message}
        {phase === "cooldown" && (
          <div className="mt-2 text-sm text-gray-400">
            Pozostało: {Math.ceil(cooldownLeft / 1000)}s
          </div>
        )}
      </div>
      {(phase === "idle" || phase === "result") && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleStart();
          }}
          disabled={false}
        >
          START
        </button>
      )}
      {reactionTime !== null && (
        <div className="mt-2 text-lg font-bold">{reactionTime} ms</div>
      )}
      {points !== null && phase === "result" && (
        <div className="mt-1 text-md font-semibold">
          {points > 0 ? `+${points} punktów!` : "Brak punktów"}
        </div>
      )}
    </div>
  );
};

export default ReactionTimeTest;
