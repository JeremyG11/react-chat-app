import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Message } from "../../types";
import { fetchMessages } from "../../utils/messageInstance";

export default function ChatMessage() {
  const [messages, setMessages] = useState<Message[] | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const data = await fetchMessages<Message[]>(
        `${process.env.REACT_APP_SERVER_URL}/api/messages`
      );
      setMessages(data);
      return data;
    },
  });
  useEffect(() => {
    console.log(messages);
  }, [isLoading, data, error]);
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn">LEAVE CHAT</button>
      </header>

      <div className="message__container">
        {messages?.map((message) => (
          <div className="message__chats" key={message.id}>
            <p className="sender__name">You</p>
            <div className="message__sender">
              <p>{message.content}</p>
            </div>
          </div>
        ))}

        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
}
