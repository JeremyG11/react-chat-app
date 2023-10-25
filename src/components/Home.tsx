import { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { authFetcher } from "../utils/authInstance";
import { useUserStore } from "../hooks/auth";

export default function Home() {
  const { user, setUser } = useUserStore();
  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await authFetcher<User | null>(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/user`
      );
      setUser(data, data ? true : false);

      if (isSuccess) {
        setUser(data, data ? true : false);
      } else if (isError) {
        setUser(null, false);
      }
      return user;
    },
  });

  useEffect(() => {}, [isLoading]);
  if (isLoading) {
    return <>loading ...</>;
  }
  return (
    <div className="flex bg-red-50 justify-between items-center h-screen w-full">
      {" "}
      Welcome
      {/* {data?.name} */}
    </div>
  );
}
