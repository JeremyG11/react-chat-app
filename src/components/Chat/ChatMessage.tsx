import { Fragment } from "react";
import { Skeleton } from ".././ui/skeleton";

import { Message, User } from "../../types";
import { useUserStore } from "../../hooks/auth";
import { useChatScroll } from "../../hooks/scroll";

interface ChatMessageProps {
  messages: {
    content: string;
    to: string;
    from: User;
  }[];
  chatHistoryMessages: Message[] | null;
}
export default function ChatMessage({
  messages,
  chatHistoryMessages,
}: ChatMessageProps) {
  const { user } = useUserStore();
  const ref = useChatScroll(messages);

  return (
    <div className="justify-end h-full bg-gray-100 relative">
      <div
        ref={ref}
        className="h-full w-full bg-board flex-1 p-4 overflow-y-auto"
      >
        <Fragment>
          {chatHistoryMessages?.map((message) => {
            return (
              <div
                key={message.id}
                className="group w-full flex flex-col space-y-4 p-2 relative "
              >
                <div
                  className={`flex items-center w-full bg-transparent ${
                    user?.id !== message.senderId ? "" : "justify-end "
                  } `}
                >
                  <div className="rounded-full cursor-pointer bg-transparent m-2">
                    {user?.id !== message.senderId ? (
                      <img
                        src={message?.senderProfile?.imageUrl}
                        className="w-7 h-7  rounded-full"
                      />
                    ) : null}
                  </div>
                  <div
                    className={`bg-white chat p-2.5 px-4 ${
                      user?.id !== message.senderId ? "text" : "text-received "
                    } `}
                  >
                    <p className="text-sm  text-gray-500">{message.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {messages.map((message, i) => (
            <div
              key={i}
              className="group w-full flex flex-col space-y-4 p-2 relative "
            >
              <div
                className={`flex items-center w-full bg-transparent ${
                  user?.id !== message.from.id ? "" : "justify-end "
                } `}
              >
                <div className="rounded-full cursor-pointer bg-transparent m-2">
                  {user?.id !== message.from.id ? (
                    <img
                      src={message?.from?.imageUrl}
                      className="w-7 h-7  rounded-full"
                    />
                  ) : null}
                </div>
                <div
                  className={`bg-white chat p-2.5 px-4 ${
                    user?.id !== message.to ? "text" : "text-received "
                  } `}
                >
                  <p className="text-sm  text-gray-500">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      </div>
    </div>
  );
}
