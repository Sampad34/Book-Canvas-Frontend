// src/services/dataService.js

import { getSession, handleResponse } from "./utils";

export async function getUser() {
  const { token, cbid } = getSession();

  if (!token || !cbid) {
    throw new Error("Not authenticated");
  }

  // First try to get from session storage for quick access
  const cachedUser = sessionStorage.getItem("user");
  if (cachedUser) {
    try {
      const user = JSON.parse(cachedUser);
      // Return cached user data
      return user;
    } catch (e) {
      console.error("Failed to parse cached user", e);
    }
  }

  // Fallback to API call
  try {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/600/users/${cbid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const userData = await handleResponse(response);

    // Cache user data
    if (userData && userData.email) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          name: userData.name,
          email: userData.email,
          id: userData.id,
        }),
      );
    }

    return userData;
  } catch (error) {
    console.error("Failed to fetch user from API", error);
    throw error;
  }
}

export async function getUserOrders() {
  const { token, cbid } = getSession();

  if (!token || !cbid) {
    return [];
  }

  const response = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders?user.id=${cbid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return await handleResponse(response);
}

export async function createOrder(cartList, total, user) {
  const { token, cbid } = getSession();

  const order = {
    cartList,
    amount_paid: total,
    quantity: cartList.length,
    userId: cbid,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  return await handleResponse(response);
}
