export async function login(authDetail) {
  try {
    const response = await fetch(`${process.env.REACT_APP_HOST}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authDetail),
    });

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {}
      throw { message: errorMessage, status: response.status };   //eslint-disable-line
    }

    const data = await response.json();

    if (data.accessToken && data.user) {
      sessionStorage.setItem("token", data.accessToken);
      sessionStorage.setItem("cbid", data.user.id);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function register(authDetail) {
  try {
    const response = await fetch(`${process.env.REACT_APP_HOST}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authDetail),
    });

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {}
      throw { message: errorMessage, status: response.status };  //eslint-disable-line
    }

    const data = await response.json();

    if (data.accessToken && data.user) {
      sessionStorage.setItem("token", data.accessToken);
      sessionStorage.setItem("cbid", data.user.id);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("cbid");
}
