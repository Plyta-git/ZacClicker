const Array1 = [
  "1",
  "2",
  "3",
  "1",
  "2",
  "3",
  "1",
  "2",
  "3",
  "1",
  "2",
  "3",
  "1",
  "2",
  "3",
];

const SlotMachine = () => {
  return (
    <div className="w-1/4 h-1/3 absolute bottom-0 left-1/5 flex flex-col bg-amber-500 overflow-hidden">
      <div className="h-full w-1/3 overflow-y-scroll">
        {Array1.map((e) => (
          <div className=" w-full h-14 border-2 border-amber-950 ">{e}</div>
        ))}
      </div>
    </div>
  );
};

export default SlotMachine;
