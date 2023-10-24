import { User } from "../../types";
import { socket } from "../../socket";
import React, { useState } from "react";

interface ChatInputProps {
  user: User | null;
}
export default function ChatInput({ user }: ChatInputProps) {
  console.log(user);
  const [msg, setMessage] = useState("");

  const handleSendMessage: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const requestBody = {
      message: msg,
      userId: user?.id,
      receiverId: "6534cd7fbfd0e645ea2f55c4",
    };
    try {
      socket.emit("message", requestBody);
      const res = await fetch("http://localhost:7272/api/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      console.log(data);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="chat__footer">
        <form className="form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Write message"
            className="message"
            value={msg}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendBtn">SEND</button>
        </form>
      </div>
    </div>
  );
}
