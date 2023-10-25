import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useUserStore } from "../../hooks/auth";

export default function Chat(): JSX.Element {
  const { isAuthenticated, user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {}, [isAuthenticated]);

  return (
    <div>
      <ChatMessage />
      <ChatInput user={user || null} />
    </div>
  );
}
