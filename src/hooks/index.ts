import { create } from "zustand";

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

type UserAction = {
  setUser: (
    name: User["name"],
    email: User["email"],
    imageUrl: User["imageUrl"]
  ) => void;
};

export const useAuth = create<User & UserAction>((set) => ({
  name: "",
  email: "",
  imageUrl: "",
  setUser: (name, email, imageUrl) =>
    set(() => ({ name: name, email: email, imageUrl: imageUrl })),
}));
