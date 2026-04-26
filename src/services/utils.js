// src/services/utils.js

export async function parseJSONSafe(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function handleResponse(response) {
  const data = await parseJSONSafe(response);

  if (!response.ok) {
    const errorMessage = data?.message || response.statusText || "Request failed";
    throw new Error(errorMessage);
  }

  return data;
}

export function getSession() {
  // Get token as string (not parsed)
  const token = sessionStorage.getItem("token");
  const cbid = sessionStorage.getItem("cbid");
  return { token, cbid };
}