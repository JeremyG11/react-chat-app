import axios from "axios";
import { ZodLoginSchema } from "./schemas/loginSchema";

export const authFetcher = async <T>(
  url: string,
  headers = {}
): Promise<T | null> => {
  try {
    const { data } = await axios.get<T>(url, {
      headers,
      withCredentials: true,
    });

    return data;
  } catch (e) {
    return null;
  }
};

export const authLogin = async <T>(
  url: string,
  body: ZodLoginSchema
): Promise<T | null> => {
  try {
    const { data } = await axios.post<T>(url, body, {
      withCredentials: true,
    });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const authLogout = async <T>(
  url: string,
  headers = {}
): Promise<T | null> => {
  try {
    const { data } = await axios.delete<T>(url, {
      headers,
      withCredentials: true,
    });

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
