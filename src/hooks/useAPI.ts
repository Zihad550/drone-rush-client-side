import { useEffect, useState } from "react";

type StatusType = "idle" | "pending" | "success" | "error";
const useAPI = <T>(asyncService: () => Promise<T>, reload?: number) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType>("idle");

  useEffect(() => {
    setStatus("pending");
    setError(null);
    asyncService()
      .then((data) => {
        setData(data);
        setStatus("success");
      })
      .catch((error) => setError(error));
  }, [reload]);
  return {
    data,
    error,
    status,
    isSuccess: status === "success",
  };
};

export default useAPI;
