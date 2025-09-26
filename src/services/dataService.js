// services/dataService.js
import { getSession, handleResponse } from "./utils";

export async function getUser() {
  const { token, cbid } = getSession();

  const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${cbid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await handleResponse(response);
}

export async function getUserOrders() {
  const { token, cbid } = getSession();

  const response = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders?user.id=${cbid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await handleResponse(response);
}

export async function createOrder(cartList, total, user) {
  const { token } = getSession();

  const order = {
    cartList,
    amount_paid: total,
    quantity: cartList.length,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
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
