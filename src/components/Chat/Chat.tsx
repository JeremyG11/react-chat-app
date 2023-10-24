import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChatInput from "./ChatInput";
import { socket } from "../../socket";
import ChatMessage from "./ChatMessage";
import { useUserStore } from "../../hooks/auth";

export default function Chat(): JSX.Element {
  const { isAuthenticated, user } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      return navigate("/login");
    }
  }, [socket, isAuthenticated]);

  return (
    <div>
      <ChatMessage />
      <ChatInput user={user || null} />
    </div>
  );
}
