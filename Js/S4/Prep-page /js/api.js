// js/api.js
export const API = "http://localhost:3000";

export async function getData(endpoint) {
  const res = await fetch(`${API}/${endpoint}`);
  return await res.json();
}

export async function postData(endpoint, data) {
  const res = await fetch(`${API}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function putData(endpoint, id, data) {
  const res = await fetch(`${API}/${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function deleteData(endpoint, id) {
  await fetch(`${API}/${endpoint}/${id}`, { method: "DELETE" });
}
