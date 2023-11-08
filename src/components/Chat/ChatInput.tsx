import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ZodMessageSchema,
  messageSchema,
} from "../../utils/schemas/messageSchema";
import { User } from "../../types";
import { EmojiPicker } from "./Emoji";
import { useEffect, useState } from "react";

interface ChatInputProps {
  socket: Socket;
  user: User | null;
}
export default function ChatInput({ socket, user }: ChatInputProps) {
  const params = useParams();
  const [isTyping, setIsTyping] = useState(false);

  const { control, reset, handleSubmit } = useForm<ZodMessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (content: ZodMessageSchema) => {
    socket.emit("private message", {
      content,
      to: params.receiverId,
    });
    reset();
  };

  // Listening to keystroke
  useEffect(() => {
    const handleKeystroke = (e: KeyboardEvent) => {
      socket.emit("typing", params.receiverId);
    };

    let timer: NodeJS.Timeout;

    document.addEventListener("keydown", handleKeystroke);

    socket.on("broadcast typing", (data) => {
      console.log(data);
      setIsTyping(true);

      clearTimeout(timer);

      timer = setTimeout(() => {
        setIsTyping(false);
      }, 5000);
    });

    return () => {
      document.removeEventListener("keydown", handleKeystroke);
      socket.off("typing");
    };
  }, [socket]);
  return (
    <div className="relative left-0 -bottom-2 md:px-10">
      <div className="absolute -top-14">
        <div className="m-3 p-3">
          {isTyping ? (
            <div className="typing items-center bg-white justify-center rounded-full p-4 shadow-2xl">
              <span className="dot rounded-full"></span>
              <span className="dot rounded-full"></span>
              <span className="dot rounded-full"></span>
            </div>
          ) : null}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex p-2">
        <Controller
          control={control}
          name="content"
          render={({ field }) => {
            return (
              <div className="flex flex-row items-center rounded-xl w-full">
                <div>
                  <button className="p-1.5 rounded-full flex items-center justify-center text-gray-400 bg-gray-100 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-emerald-500"
                    >
                      <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                      <path
                        fillRule="evenodd"
                        d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <button className="p-1.5 ml-2 rounded-full flex items-center justify-center text-gray-400 bg-gray-100 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-emerald-500"
                    >
                      <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                      <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-2">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border-2 text-gray-500 text-sm rounded-3xl focus:outline-none focus:border-gray-300 pl-4 h-10"
                      placeholder="Your message..."
                      {...field}
                    />

                    <span className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value} ${emoji}`)
                        }
                      />
                    </span>
                  </div>
                </div>
                <div className="ml-1.5">
                  <button className="p-1.5 rounded-full shadow-xl flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 "
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          }}
        />
      </form>
    </div>
  );
}
