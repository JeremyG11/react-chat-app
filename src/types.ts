export type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  session: string;
  iat: number;
  exp: number;
};
export interface ActiveUser {
  socketId: string;
  user: User;
}

export interface Message {
  id: string;
  content: string;
  fileUrl: string | null;
  conversationId: string | null;
  deleted: boolean;
  senderId: string;
  createdAt: Date;
  updatedAt: Date;
  senderProfile: Pick<User, "id" | "name" | "email" | "imageUrl">;
}

export type Conversation = {
  id: string;
  userProfileOne: User;
  userProfileTwo: User;
};

export interface LogoutResponse {
  accessToken: null;
  refreshToken: null;
}

export interface Notification {
  id: string;
  sender: User;
  receiver: User;
  isSeen: boolean;
}
