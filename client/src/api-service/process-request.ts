export const processRequest = async ({
  path,
  payload,
  method = "GET",
}: {
  path: string;
  payload?: Record<string, unknown>;
  method?: "GET" | "PUT" | "POST" | "DELETE";
}) => {
  // TODO pull the path from env vars
  const response = await fetch(`http://localhost:3000/${path}`, {
    body: payload && JSON.stringify(payload),
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return response.json();
};
