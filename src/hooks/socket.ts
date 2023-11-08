import { User } from "../types";
import { socket } from "../socket";

const socketFn = {
  onConnectGetUsers: (
    user: User,
    setActiveUsers: React.Dispatch<React.SetStateAction<User[]>>
  ) => {
    socket.emit("user-connected", user.id);
    // socket.on("active-users", (users) => setActiveUsers(users));
    socket.on("active-users", (users) => {
      console.log(users);
    });
  },
};

export default socketFn;
