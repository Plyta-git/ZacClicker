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

/* TODO:
- chat sabotuje
- banowanie wiadomości
- hacki

- human benchmark [done]

- sponsorki [todo]
- mammon i viewboty [todo]
- aimlab [todo]
- podmienienie ikonek [todo]
*/

function App() {
  return (
    <div className=" select-none flex flex-row content-center justify-between min-h-svh w-full">
      <AlertBox />
      <AdsVideo />
      <MediaRequest />
      <SongRequest />
      <ShowEmote />
      <GucciArmia />
      <SlotMachine />
      <ReactionTimeTest />
      <DevStats />
      <div className="w-1/5  bg-sidebar-bg border-r-2 border-color-border  ">
        <Store />
      </div>
      <div className=" flex justify-center flex-col content-center">
        <div className=" flex justify-center flex-col content-center bg-sidebar-bg py-4 px-6 m-2 rounded-lg border-color-border border-2">
          <ZacInfo />
          <ZacButton />
        </div>
      </div>
      <div className="w-1/5 h-lvh bg-chat border-color-border border-l-2  ">
        <TwitchChat />
      </div>
    </div>
  );
}

export default App;
