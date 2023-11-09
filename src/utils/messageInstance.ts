import axios from "axios";
import { ZodMessageSchema } from "./schemas/messageSchema";

export const fetchMessages = async <T>(
  url: string,
  headers = {}
): Promise<T | null> => {
  try {
    const { data } = await axios.get<T>(url, {
      headers,
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export const queryConversationId = async <T>(
  url: string,
  params: Record<string, any>
): Promise<T | null> => {
  try {
    const { data } = await axios.get<T>(url, {
      withCredentials: true,
      params: params,
    });
    return data;
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export const sendMessage = async <T>(
  url: string,
  body: ZodMessageSchema,
  params: Record<string, any>
): Promise<T | null> => {
  try {
    const { data } = await axios.post<T>(url, body, {
      withCredentials: true,
      params: params,
    });
    return data;
  } catch (err: any) {
    console.log(err);
    return null;
  }
};
