async function parseJSONSafe(response) {
  try {
    return await response.json();
  } catch {
    return null; // return null if response is not JSON
  }
}

export async function login(authDetail) {
  const response = await fetch(`${process.env.REACT_APP_HOST}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  });

  const data = await parseJSONSafe(response);

  if (!response.ok) {
    const errorMessage = data?.message || response.statusText || "Login failed";
    throw { message: errorMessage, status: response.status };   //eslint-disable-line
  }

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

  const data = await parseJSONSafe(response);

  if (!response.ok) {
    const errorMessage = data?.message || response.statusText || "Registration failed";
    throw { message: errorMessage, status: response.status };   //eslint-disable-line
  }

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
