import items from "@/const/items";
import useGameStore from "@/hooks/useGameStore/useGameStore";

const DevStats = () => {
  const itemSpent = useGameStore((s) => s.itemSpent);
  const itemGenerated = useGameStore((s) => s.itemGenerated);

  return (
    <div className="absolute left-0 bottom-0 m-2 p-2 bg-sidebar-bg/90 text-white text-xs rounded border border-color-border max-h-1/3 overflow-y-auto">
      <div className="font-bold mb-1">DEV STATS</div>
      {items.map((item) => {
        const spent = itemSpent.get(item.id) ?? 0;
        const generated = itemGenerated.get(item.id) ?? 0;
        if (spent === 0 && generated === 0) return null;
        return (
          <div
            key={item.id}
            className="flex justify-between gap-2 whitespace-nowrap"
          >
            <span className="overflow-hidden text-ellipsis max-w-[120px]">
              {item.name}
            </span>
            <span>Spent: {spent}</span>
            <span>Gen: {generated}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DevStats;
