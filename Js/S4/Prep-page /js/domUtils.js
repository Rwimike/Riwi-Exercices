// js/domUtils.js
export function get(id) {
  return document.getElementById(id);
}

export function qs(selector) {
  return document.querySelector(selector);
}

export function qsa(selector) {
  return document.querySelectorAll(selector);
}

export function clearInputs(formId) {
  const form = get(formId);
  if (!form) return;
  form.querySelectorAll("input, textarea").forEach(input => input.value = "");
}
