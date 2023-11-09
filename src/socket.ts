import { io, Socket } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:7272";

export const socket: Socket = io(URL ?? "http://localhost:7272", {
  autoConnect: false,
});
