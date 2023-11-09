import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, Suspense, useState } from "react";

import ChatInput from "./ChatInput";
import { socket } from "../../socket";
import ChatMessage from "./ChatMessage";
import { Message, User } from "../../types";
import { useUserStore } from "../../hooks/auth";
import { useChatScroll } from "../../hooks/scroll";
import { queryConversationId } from "../../utils/messageInstance";

export default function Chat() {
  const { user } = useUserStore();
  const params = useParams();
  const [chatHistoryMessages, setChatHistoryMessages] = useState<
    Message[] | null
  >([]);
  const [messages, setMessages] = useState<
    {
      content: string;
      to: string;
      from: User;
    }[]
  >([]);

  const ref = useChatScroll(messages);

  const { isLoading, data } = useQuery({
    queryKey: ["messages", user?.id],
    queryFn: async () => {
      const data = await queryConversationId<Message[]>(
        `${process.env.REACT_APP_SERVER_URL}/api/messages/conversation`,
        { params: params.receiverId }
      );
      console.log(data);
      setChatHistoryMessages(data as []);
      return data;
    },
  });

  // Chat history
  useEffect(() => {
    socket.on("private message", (data) => {
      console.log(data);
      setMessages([...messages, data]);
    });
    return () => {
      socket.off("private message");
    };
  }, [messages, socket, isLoading]);

  return (
    <div className="h-[632px] bg-gray-100 rlative md:px-40 xl:px-64">
      <Suspense fallback={<Loading />}>
        <div ref={ref} className="h-[87%] overflow-y-auto">
          <ChatMessage
            messages={messages}
            chatHistoryMessages={chatHistoryMessages}
          />
        </div>
      </Suspense>
      <ChatInput user={user} socket={socket} />
    </div>
  );
}

function Loading() {
  return (
    <div className="flex h-screen justify-center items-center">
      <h2 className="text-9xl">🌀 Loading...</h2>;
    </div>
  );
}
