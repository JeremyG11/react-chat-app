import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, Suspense, useState } from "react";

import ChatInput from "./ChatInput";
import { socket } from "../../socket";
import ChatMessage from "./ChatMessage";
import { Message, User } from "../../types";
import { useUserStore } from "../../hooks/auth";
import { queryConversationId } from "../../utils/messageInstance";

export default function Chat() {
  const { user } = useUserStore();
  const { receiverId } = useParams();
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

  const { isLoading, data } = useQuery({
    queryKey: ["messages", user?.id],
    queryFn: async () => {
      const data = await queryConversationId(
        `${process.env.REACT_APP_SERVER_URL}/api/messages/conversation`,
        { receiverId }
      );
      const { messages } = data;
      console.log(messages);
      setChatHistoryMessages(messages as []);
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
  }, [messages, data, socket, isLoading]);

  return (
    <div className="bg-gray-50 h-[560px] rlative md:px-40 xl:px-64">
      <Suspense fallback={<Loading />}>
        <div className="h-[90%] overflow-y-auto">
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
