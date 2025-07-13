// js/auth.js
import { API } from './api.js';

export class AuthService {
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

  isLoggedIn() {
    return !!sessionStorage.getItem("auth");
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("auth"));
  }
}
