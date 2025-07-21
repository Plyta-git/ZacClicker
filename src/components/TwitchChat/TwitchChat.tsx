import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import tmi from "tmi.js";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { TWITCH_CHAT_CONFIG } from "@/const/config";

type EmoteUrl = {
  size: "1x" | "2x" | "3x" | "4x";
  url: string;
};

type Emote = {
  provider: number;
  code: string;
  urls: EmoteUrl[];
};

type EmoteMap = Map<string, Emote>;

type ChatMessage = {
  id: string;
  user: string;
  text: string;
  color?: string;
};

/**
 * 1. Pobiera emotki z API i zwraca je jako Map.
 */
const fetchEmotes = async (): Promise<EmoteMap> => {
  try {
    const response = await fetch(
      "https://emotes.adamcy.pl/v1/channel/h2p_gucio/emotes/7tv.bttv.ffz"
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch emotes: ${response.statusText}`);
    }
    const emotesData: Emote[] = await response.json();
    return new Map(emotesData.map((emote) => [emote.code, emote]));
  } catch (error) {
    console.error("Error fetching emotes:", error);
    return new Map();
  }
};

/**
 * 2. Parsuje wiadomość, zastępując kody emotek obrazkami.
 */
const parseMessageWithEmotes = (
  text: string,
  emotes: EmoteMap
): (string | React.JSX.Element)[] => {
  // Sprawdź, czy emotki są aktywne
  const emoteChatActive = useGameStore.getState().activeEvents.emotechat;
  if (!emoteChatActive) {
    // Emotki wyłączone, zwróć tekst bez zamiany
    return [text];
  }
  const words = text.split(" ");
  return words.flatMap((word, index) => {
    const emote = emotes.get(word);
    const isLastWord = index === words.length - 1;

    let element: string | React.JSX.Element = word;
    if (emote) {
      const emoteUrl =
        emote.urls.find((u) => u.size === "1x")?.url || emote.urls[0]?.url;
      if (emoteUrl) {
        element = (
          <img
            key={`${emote.code}-${index}`}
            src={emoteUrl}
            alt={emote.code}
            className="inline-block h-7 align-middle"
          />
        );
      }
    }

    return isLastWord ? [element] : [element, " "];
  });
};

const MessageBox = ({
  user,
  text,
  color,
  emotes,
}: Omit<ChatMessage, "id"> & { emotes: EmoteMap }) => {
  const memoizedParse = useCallback(
    (text: string) => parseMessageWithEmotes(text, emotes),
    [emotes]
  );
  return (
    <div className="mb-1 break-words">
      <span style={{ color: color || "#FFFFFF", fontWeight: "bold" }}>
        {user}
      </span>
      : {memoizedParse(text)}
    </div>
  );
};

const client = new tmi.Client({
  channels: ["h2p_gucio", "natanzgorzyk"],
});

client.connect().catch(console.error);

const TwitchChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [emotes, setEmotes] = useState<EmoteMap>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number | null>(null);
  const { MAX_MESSAGES, SCROLL_THRESHOLD_RATIO } = TWITCH_CHAT_CONFIG;
  const twitchChatActive = useGameStore(
    (state) => state.activeEvents.twitchchat
  );

  useEffect(() => {
    const loadEmotes = async () => {
      try {
        const emoteMap = await fetchEmotes();
        setEmotes(emoteMap);
      } catch (err: unknown) {
        setError(`Failed to load emotes: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };
    loadEmotes();
  }, []);

  useEffect(() => {
    const handleMessage = (
      _channel: string,
      tags: tmi.ChatUserstate,
      message: string,
      self: boolean
    ) => {
      if (self || !tags["display-name"] || !tags.id) return;

      const newMessage: ChatMessage = {
        id: `${tags.id}-${tags["tmi-sent-ts"]}`, // Ensure unique key
        user: tags["display-name"],
        text: message,
        color: tags.color,
      };

      setMessages((prevMessages) =>
        [...prevMessages, newMessage].slice(-MAX_MESSAGES)
      );
    };

    client.on("message", handleMessage);

    return () => {
      client.removeListener("message", handleMessage);
    };
  }, [MAX_MESSAGES]);

  useLayoutEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      if (prevScrollHeightRef.current === null) {
        // On first load, scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
      } else {
        const { scrollTop, clientHeight } = chatContainer;
        const scrollHeightBeforeUpdate = prevScrollHeightRef.current;
        const scrollBottomBeforeUpdate = scrollTop + clientHeight;

        // Threshold is 10% of the visible height
        const threshold = clientHeight * SCROLL_THRESHOLD_RATIO;

        // If user was within the threshold of the bottom before the update, auto-scroll
        if (scrollBottomBeforeUpdate >= scrollHeightBeforeUpdate - threshold) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }
      // Store the current scrollHeight for the next update check
      prevScrollHeightRef.current = chatContainer.scrollHeight;
    }
  }, [SCROLL_THRESHOLD_RATIO, messages]);

  if (loading) return <div>Loading chat...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!twitchChatActive) return <></>;

  return (
    <div ref={chatContainerRef} className="h-full overflow-y-auto p-2">
      {messages.map((msg) => (
        <MessageBox
          key={msg.id}
          user={msg.user}
          text={msg.text}
          color={msg.color}
          emotes={emotes}
        />
      ))}
    </div>
  );
};

export default TwitchChat;
