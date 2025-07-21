import AlertBox from "./components/AlertBox/AlertBox";
import AdsVideo from "./components/AdsVideo/AdsVideo";
import SongRequest from "./components/MediaPlayer/SongRequest";
import ShowEmote from "./components/ShowEmote/ShowEmote";
import Store from "./components/Store/Store";
import SlotMachine from "./components/SlotMachine/SlotMachine";
import ZacInfo from "./components/ZacBox/ZacInfo";
import ZacButton from "./components/ZacBox/ZacButton";
import GucciArmia from "./components/ShowEmote/GucciArmia";
import TwitchChat from "./components/TwitchChat/TwitchChat";
import ReactionTimeTest from "./components/ReactionTimeTest/ReactionTimeTest";
import DevStats from "./components/DevPanel/DevStats";
import MediaRequest from "./components/MediaPlayer/MediaRequest";
// import WttgHack from "./components/WttgHack/WttgHack";

/* TODO:
- chat sabotuje
- banowanie wiadomości
- jakieś quizy czasowe na prawo A B C D

- human benchmark [done]
- sponsorki [done]
- hacki jak w wttg [todo]

- mammon i viewboty [todo]
- aimlab [todo]
- podmienienie ikonek [todo]

- w sklepie można kupić fragment kodu jak w wttg
- jak wykupisz 6 fragmentów kodu to pojawia się opcja wpisania kodu
- po wpisaniu kodu gra się kończy
*/

function App() {
  return (
    <div className=" select-none flex flex-row content-center justify-between min-h-svh w-full">
      <div className="w-1/5  bg-sidebar-bg border-r-2 border-color-border  ">
        <Store />
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute top-0 w-full text-center mt-4 pointer-events-none">
          <ZacInfo />
        </div>
        <div>
          <ZacButton />
        </div>
      </div>
      <div className="w-1/5 h-lvh bg-chat border-color-border border-l-2  ">
        <TwitchChat />
      </div>
      <AlertBox />
      <AdsVideo />
      <MediaRequest />
      <SongRequest />
      <ShowEmote />
      <GucciArmia />
      <SlotMachine />
      <ReactionTimeTest />
      <DevStats />
      {/* <WttgHack /> */}
    </div>
  );
}

export default App;
