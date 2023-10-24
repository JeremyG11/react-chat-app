import axios from "axios";

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
