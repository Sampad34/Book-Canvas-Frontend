// services/utils.js

export async function parseJSONSafe(response) {
  try {
    return await response.json();
  } catch {
    return null; // Return null if response body is not JSON
  }
}

export function getSession() {
  const token = sessionStorage.getItem("token");
  const cbid = sessionStorage.getItem("cbid");

  return {
    token: token ? token : null,
    cbid: cbid ? cbid : null,
  };
}

export async function handleResponse(response) {
  const data = await parseJSONSafe(response);

  if (!response.ok) {
    const errorMessage = data?.message || response.statusText || "Request failed";
    throw { message: errorMessage, status: response.status }; //eslint-disable-line
  }

  return data;
}
