import { create } from "zustand";
import { User } from "../types";

type UserAuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null, isAuthenticated: boolean) => void;
};

export const useUserStore = create<UserAuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user, isAuthenticated) =>
    set(() => ({
      isAuthenticated,
      user,
    })),
}));
