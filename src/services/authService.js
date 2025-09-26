// services/authService.js
import { handleResponse } from "./utils";  // removed parseJSONSafe

export async function login(authDetail) {
  const response = await fetch(`${process.env.REACT_APP_HOST}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  });

  const data = await handleResponse(response);

  if (data?.accessToken && data?.user) {
    sessionStorage.setItem("token", data.accessToken);
    sessionStorage.setItem("cbid", data.user.id);
  }

  return data;
}

export async function register(authDetail) {
  const response = await fetch(`${process.env.REACT_APP_HOST}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  });

  const data = await handleResponse(response);

  if (data?.accessToken && data?.user) {
    sessionStorage.setItem("token", data.accessToken);
    sessionStorage.setItem("cbid", data.user.id);
  }

  return data;
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("cbid");
}
