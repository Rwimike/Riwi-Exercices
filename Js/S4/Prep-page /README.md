# Single Page Application

This is a fully functional Single Page Application (SPA) developed using only HTML, CSS, and JavaScript (vanilla). The app simulates a simple multi-view website with login, register, contact form, and dynamic routing without page reloads.

The application connects to a local JSON Server API to manage users and messages, implementing complete CRUD capabilities in the front-end.

---

##  Project Structure

```

/project-root
│
├── db.json                  # JSON Server database (users, messages)
│
├── index.html               # Main entry point (includes SPA logic)
├── README.md                # Project documentation (this file)
│
├── /views                   # HTML templates (loaded via router)
│   ├── landing.html
│   ├── home.html
│   ├── about.html
│   ├── contact.html
│   ├── login.html
│   ├── register.html
│   └── 404.html
│
├── /js                      # JavaScript modules and logic
│   └── main.js              # SPA router, forms, and authentication
│   └── routes.js            # Route path configuration
│
├── /css
│   └── style.css            # BEM-based CSS styling

````

---

##  How to Run the Project

1. **Install JSON Server** if you haven’t:
   ```bash
   npm install -g json-server
````

2. **Run the API locally**:

   ```bash
   json-server --watch db.json --port 3000
   ```

3. **Open `index.html`** in your browser:

   * Recommended via a live server extension (e.g., VSCode Live Server)
   * Or use: `python3 -m http.server` in the root directory

---

##  Features

*  **Single Page Routing** using `location.hash`
*  **Dynamic View Loader** with `fetch()`
*  **User Authentication**:

  * Register new users
  * Login with username or email
  * Session stored in `localStorage` / `sessionStorage`
*  **Contact Form**:

  * Sends messages to `messages` endpoint
*  **HTML structure with BEM**
*  **Responsive Design** using CSS Flexbox
*  **DOM Manipulation** using `getElementById`, `querySelector`, and classes
*  **All routes defined in a single object**
*  **Clean, modular JavaScript** (everything in `main.js`)

---

##  Routes Overview

| Path         | View      | Description               |
| ------------ | --------- | ------------------------- |
| `#/`         | Landing   | Initial welcome page      |
| `#/home`     | Home      | Protected user area       |
| `#/about`    | About     | Developer information     |
| `#/contact`  | Contact   | Contact form              |
| `#/login`    | Login     | Login form                |
| `#/register` | Register  | Account creation          |
| `#/landing`  | Landing   | Alternate path to welcome |
| `#/404`      | Not Found | Error view                |

---

##  Technologies Used

* **HTML5** with [BEM naming convention](http://getbem.com/)
* **CSS3** responsive design
* **JavaScript (ES6+)** vanilla
* **JSON Server** (fake REST API)
* No frameworks, no libraries, 100% vanilla

---

##  Test Users

```
username: migueDev
email: migue@example.com
password: 1234
```

Or create new ones via the Register page.

---

## 📌 Final Notes

This project demonstrates a complete SPA architecture with authentication and backend interaction, without using frameworks. It is ideal for practicing raw JavaScript logic, DOM manipulation, modular code, and interaction with REST APIs.
