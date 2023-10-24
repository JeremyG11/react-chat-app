import { useNavigate } from "react-router-dom";
import { useMutation as Query } from "@tanstack/react-query";

import { LogoutResponse } from "../../types";
import { useUserStore } from "../../hooks/auth";
import { authLogout } from "../../utils/authInstance";

export const UserAvatarDropdown = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const { user } = useUserStore();

  const handleLogout = async () => {
    const data = await authLogout<LogoutResponse | null>(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/sessions`
    );
    setUser(null, false);
    return data;
  };

  return (
    <div className="z-10 absolute top-10 right-0 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 md:block">
      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div className="font-medium">{user?.name}</div>
        <div className="truncate">{user?.email}</div>
      </div>
      <div className="py-2">
        <button
          onClick={handleLogout}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          {false ? "loading..." : "Sign out"}
        </button>
      </div>
    </div>
  );
};
