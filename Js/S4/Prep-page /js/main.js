// js/main.js
import { routes } from './routes.js';

const app = document.getElementById("app");
const API = "http://localhost:3000";

// SPA Router
async function loadView(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("View not found");
    const html = await res.text();
    app.innerHTML = html;
  } catch (error) {
    console.error(error);
    loadView(routes["404"]);
  }
}

function getCurrentRoute() {
  const hash = location.hash.slice(1).toLowerCase() || "/";
  return routes[hash] || routes["404"];
}

window.addEventListener("hashchange", () => {
  loadView(getCurrentRoute());
});

window.addEventListener("DOMContentLoaded", () => {
  loadView(getCurrentRoute());
});

// Botón de bienvenida (Landing)
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "welcomeBtn") {
    location.hash = "/landing";
  }
});

// DOM Helpers
function get(id) {
  return document.getElementById(id);
}

// Auth Class
class AuthService {
  constructor() {
    this.usersEndpoint = `${API}/users`;
  }

  async login(identifier, password) {
    try {
      const res = await fetch(this.usersEndpoint);
      const users = await res.json();

      const user = users.find(u =>
        (u.email === identifier || u.username === identifier) &&
        u.password === password
      );

      if (user) {
        sessionStorage.setItem("auth", JSON.stringify(user));
        localStorage.setItem("auth", JSON.stringify(user));
        alert("Login successful!");
        location.hash = "/home";
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async register(newUser) {
    try {
      const res = await fetch(this.usersEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) throw new Error("Registration failed");

      alert("Registration successful!");
      location.hash = "/login";
    } catch (error) {
      console.error("Register error:", error);
    }
  }

  logout() {
    sessionStorage.removeItem("auth");
    localStorage.removeItem("auth");
    location.hash = "/landing";
  }
}

const auth = new AuthService();

// Form Submit Handlers
document.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.matches("#loginForm")) {
    const identifier = get("loginEmail").value.trim();
    const password = get("loginPassword").value.trim();
    auth.login(identifier, password);
  }

  if (e.target.matches("#registerForm")) {
    const newUser = {
      username: get("registerUsername").value.trim(),
      email: get("registerEmail").value.trim(),
      password: get("registerPassword").value.trim()
    };
    auth.register(newUser);
  }

  if (e.target.matches("#contactForm")) {
    const message = {
      name: get("contactName").value,
      email: get("contactEmail").value,
      message: get("contactMessage").value,
      date: new Date().toISOString()
    };

    fetch(`${API}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    })
    .then(res => res.json())
    .then(() => alert("Message sent!"))
    .catch(err => console.error("Contact error:", err));
  }
});
