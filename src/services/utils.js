// services/utils.js
export async function parseJSONSafe(response) {
  try {
    return await response.json();
  } catch {
    return null; // non-JSON response
  }
}

export async function handleResponse(response) {
  const data = await parseJSONSafe(response);

  if (!response.ok) {
    const errorMessage = data?.message || response.statusText || "Request failed";
    throw { message: errorMessage, status: response.status }; //eslint-disable-line
  }

  return data;
}

export function getSession() {
  const token = JSON.parse(sessionStorage.getItem("token") || "null");
  const cbid = JSON.parse(sessionStorage.getItem("cbid") || "null");
  return { token, cbid };
}
