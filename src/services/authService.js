// src/services/authService.js

import { handleResponse } from "./utils";

export async function login(authDetail) {
  const response = await fetch(`${process.env.REACT_APP_HOST}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  });

  const data = await handleResponse(response);

  if (data?.accessToken && data?.user) {
    // Store token directly as string (no JSON.stringify)
    sessionStorage.setItem("token", data.accessToken);
    sessionStorage.setItem("cbid", data.user.id.toString());

    // Also store user info for quick access
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        name: data.user.name,
        email: data.user.email,
        id: data.user.id,
      }),
    );
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
    // Store token directly as string (no JSON.stringify)
    sessionStorage.setItem("token", data.accessToken);
    sessionStorage.setItem("cbid", data.user.id.toString());

    // Also store user info for quick access
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        name: data.user.name,
        email: data.user.email,
        id: data.user.id,
      }),
    );
  }

  return data;
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("cbid");
  sessionStorage.removeItem("user");
}
