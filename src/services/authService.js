
const BASE_URL = process.env.REACT_APP_HOST;


export async function login(authDetail) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  });

  if (!response.ok) {
    let errorMessage = response.statusText;
    try {
      const errorData = await response.json();
      if (errorData?.message) errorMessage = errorData.message;
    } catch (err) {
      // ignore JSON parsing errors
    }
    throw { message: errorMessage, status: response.status };
  }

  const data = await response.json();

  if (data.accessToken && data.user) {
    sessionStorage.setItem("token", data.accessToken);
    sessionStorage.setItem("cbid", data.user.id);
  }

  return data;
}

export async function register(authDetail) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  });

  if (!response.ok) {
    let errorMessage = response.statusText;
    try {
      const errorData = await response.json();
      if (errorData?.message) errorMessage = errorData.message;
    } catch (err) {
      // ignore JSON parsing errors
    }
    throw { message: errorMessage, status: response.status };
  }

  const data = await response.json();

  if (data.accessToken && data.user) {
    sessionStorage.setItem("token", data.accessToken);
    sessionStorage.setItem("cbid", data.user.id);
  }

  return data;
}
