# Ejercicios Riwi
lo que se puede apreciar en este repo es todos los trabajos de la semanas todo esto con el objetivo de conservar la informacion aprendida

## ayudas para encarpetar

/mi-proyecto
│
├── index.html
├── README.md
├── db.json
│
├── /css
│   └── style.css
│
├── /js
│   ├── main.js
│   └── routes.js
│
├── /views
│   ├── home.html
│   ├── about.html
│   └── 404.html


# Mejoras UX/UI para la Aplicación de Gestión de Eventos

Analicé tu aplicación y he identificado varias oportunidades para mejorar la experiencia de usuario y la interfaz. Implementaré las siguientes mejoras:

## Problemas identificados:
1. Interfaz minimalista sin estilos visuales
2. Falta de feedback visual en las acciones
3. Diseño no responsivo
4. Navegación poco intuitiva
5. Escasez de elementos visuales que guíen al usuario
6. Mensajes de alerta básicos

## Mejoras propuestas:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Manager - Gestión de Eventos</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #4361ee;
            --secondary: #3f37c9;
            --success: #4cc9f0;
            --danger: #f72585;
            --warning: #f8961e;
            --light: #f8f9fa;
            --dark: #212529;
            --gray: #6c757d;
            --light-gray: #e9ecef;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f0f2f5;
            color: var(--dark);
            min-height: 100vh;
        }
        
        /* Estilos generales */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }
        
        .card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        .btn {
            padding: 10px 20px;
            border-radius: 6px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .btn-primary {
            background: var(--primary);
            color: white;
        }
        
        .btn-primary:hover {
            background: var(--secondary);
        }
        
        .btn-outline {
            background: transparent;
            border: 1px solid var(--primary);
            color: var(--primary);
        }
        
        .btn-outline:hover {
            background: var(--primary);
            color: white;
        }
        
        .btn-danger {
            background: var(--danger);
            color: white;
        }
        
        .btn-danger:hover {
            background: #e11570;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }
        
        .form-control:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--dark);
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 15px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: 700;
        }
        
        .logo i {
            font-size: 28px;
        }
        
        /* Dashboard */
        .dashboard-container {
            display: flex;
            min-height: calc(100vh - 60px);
        }
        
        .sidebar {
            width: 280px;
            background: white;
            padding: 20px 0;
            border-right: 1px solid var(--light-gray);
            box-shadow: 2px 0 10px rgba(0,0,0,0.03);
            position: sticky;
            top: 60px;
            height: calc(100vh - 60px);
            overflow-y: auto;
        }
        
        .user-info {
            padding: 0 20px 20px;
            border-bottom: 1px solid var(--light-gray);
            margin-bottom: 20px;
        }
        
        .user-info h2 {
            font-size: 20px;
            margin-bottom: 5px;
        }
        
        .user-info .role {
            background: var(--light-gray);
            color: var(--gray);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
        }
        
        .nav-item {
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--dark);
            text-decoration: none;
            transition: all 0.2s ease;
            font-weight: 500;
            border-left: 3px solid transparent;
        }
        
        .nav-item:hover, .nav-item.active {
            background: rgba(67, 97, 238, 0.05);
            color: var(--primary);
            border-left-color: var(--primary);
        }
        
        .nav-item i {
            width: 24px;
            text-align: center;
        }
        
        .main-content {
            flex: 1;
            padding: 30px;
        }
        
        .section-title {
            font-size: 24px;
            margin-bottom: 25px;
            color: var(--dark);
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        /* Eventos */
        .events-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }
        
        .event-card {
            padding: 20px;
            position: relative;
        }
        
        .event-card .event-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--dark);
        }
        
        .event-card .event-description {
            color: var(--gray);
            margin-bottom: 15px;
            line-height: 1.5;
        }
        
        .event-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }
        
        .capacity {
            background: rgba(76, 201, 240, 0.15);
            color: #0a9396;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
        }
        
        .registered {
            background: rgba(248, 150, 30, 0.15);
            color: var(--warning);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
        }
        
        .event-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        .event-form {
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
        }
        
        /* Formularios de autenticación */
        .auth-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa, #e4edf9);
        }
        
        .auth-card {
            width: 100%;
            max-width: 500px;
            padding: 40px 30px;
        }
        
        .auth-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .auth-header h2 {
            font-size: 28px;
            color: var(--dark);
            margin-bottom: 10px;
        }
        
        .auth-header p {
            color: var(--gray);
            font-size: 16px;
        }
        
        .form-footer {
            text-align: center;
            margin-top: 20px;
            color: var(--gray);
        }
        
        /* Toast notifications */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 1000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        }
        
        .toast.show {
            transform: translateX(0);
        }
        
        .toast.success {
            border-left: 4px solid #2ecc71;
        }
        
        .toast.error {
            border-left: 4px solid #e74c3c;
        }
        
        .toast.warning {
            border-left: 4px solid #f39c12;
        }
        
        .toast i {
            font-size: 20px;
        }
        
        .toast.success i {
            color: #2ecc71;
        }
        
        .toast.error i {
            color: #e74c3c;
        }
        
        .toast.warning i {
            color: #f39c12;
        }
        
        /* Responsive */
        @media (max-width: 992px) {
            .sidebar {
                width: 250px;
            }
        }
        
        @media (max-width: 768px) {
            .dashboard-container {
                flex-direction: column;
            }
            
            .sidebar {
                width: 100%;
                height: auto;
                position: relative;
                top: 0;
                border-right: none;
                border-bottom: 1px solid var(--light-gray);
            }
            
            .main-content {
                padding: 20px;
            }
            
            .events-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 576px) {
            .header-content {
                flex-direction: column;
                gap: 15px;
            }
            
            .event-actions {
                flex-direction: column;
            }
        }
        
        /* Animaciones */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- El contenido se renderizará dinámicamente aquí -->
    </div>
    
    <!-- Toast container -->
    <div id="toast-container"></div>

    <script>
        // Simulación de base de datos (json-server)
        const API_URL = 'http://localhost:3000'; 
        
        // Utilidades de LocalStorage para sesión
        function saveSession(user) {
            localStorage.setItem('session', JSON.stringify(user));
        }
        
        function getSession() {
            return JSON.parse(localStorage.getItem('session'));
        }
        
        function clearSession() {
            localStorage.removeItem('session');
        }
        
        // Mostrar notificación
        function showToast(message, type = 'success') {
            const toastContainer = document.getElementById('toast-container');
            const icons = {
                success: 'check-circle',
                error: 'exclamation-circle',
                warning: 'exclamation-triangle'
            };
            
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <i class="fas fa-${icons[type]}"></i>
                <span>${message}</span>
            `;
            
            toastContainer.appendChild(toast);
            
            // Mostrar toast
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // Ocultar y eliminar después de 4 segundos
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 4000);
        }
        
        // Renderizado SPA 
        function render(view) {
            const app = document.getElementById('app');
            app.innerHTML = '';
            app.appendChild(view);
        }
        
        // Formulario de registro
        function registerForm() {
            const div = document.createElement('div');
            div.className = 'auth-container fade-in';
            div.innerHTML = `
                <div class="auth-card card">
                    <div class="auth-header">
                        <h2><i class="fas fa-user-plus"></i> Crear cuenta</h2>
                        <p>Completa el formulario para registrarte</p>
                    </div>
                    <form id="register">
                        <div class="form-group">
                            <label for="username"><i class="fas fa-user"></i> Nombre de usuario</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Ingresa tu usuario" required>
                        </div>
                        <div class="form-group">
                            <label for="password"><i class="fas fa-lock"></i> Contraseña</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Crea una contraseña" required>
                        </div>
                        <div class="form-group">
                            <label for="role"><i class="fas fa-user-tag"></i> Rol</label>
                            <select class="form-control" id="role" name="role">
                                <option value="visitante">Visitante</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                            <i class="fas fa-user-plus"></i> Registrarse
                        </button>
                    </form>
                    <div class="form-footer">
                        <p>¿Ya tienes una cuenta? <a href="#" id="toLogin">Inicia sesión</a></p>
                    </div>
                </div>
            `;
            
            div.querySelector('#register').onsubmit = async (e) => {
                e.preventDefault();
                const button = e.target.querySelector('button[type="submit"]');
                const originalHTML = button.innerHTML;
                button.innerHTML = '<div class="loading"></div> Registrando...';
                button.disabled = true;
                
                const data = Object.fromEntries(new FormData(e.target));
                
                try {
                    // Registro en json-server
                    await fetch(`${API_URL}/users`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    
                    showToast('¡Registro exitoso! Ahora puedes iniciar sesión', 'success');
                    
                    // Pequeño retraso para que el usuario vea el mensaje
                    setTimeout(() => {
                        render(loginForm());
                    }, 1500);
                } catch (error) {
                    showToast('Error en el registro. Inténtalo de nuevo', 'error');
                    button.innerHTML = originalHTML;
                    button.disabled = false;
                }
            };
            
            div.querySelector('#toLogin').onclick = (e) => {
                e.preventDefault();
                render(loginForm());
            };
            
            return div;
        }
        
        // Formulario de login
        function loginForm() {
            const div = document.createElement('div');
            div.className = 'auth-container fade-in';
            div.innerHTML = `
                <div class="auth-card card">
                    <div class="auth-header">
                        <h2><i class="fas fa-sign-in-alt"></i> Iniciar sesión</h2>
                        <p>Ingresa tus credenciales para continuar</p>
                    </div>
                    <form id="login">
                        <div class="form-group">
                            <label for="username"><i class="fas fa-user"></i> Usuario</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Tu nombre de usuario" required>
                        </div>
                        <div class="form-group">
                            <label for="password"><i class="fas fa-lock"></i> Contraseña</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Tu contraseña" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                            <i class="fas fa-sign-in-alt"></i> Ingresar
                        </button>
                    </form>
                    <div class="form-footer">
                        <p>¿No tienes cuenta? <a href="#" id="toRegister">Regístrate aquí</a></p>
                    </div>
                </div>
            `;
            
            div.querySelector('#login').onsubmit = async (e) => {
                e.preventDefault();
                const button = e.target.querySelector('button[type="submit"]');
                const originalHTML = button.innerHTML;
                button.innerHTML = '<div class="loading"></div> Iniciando sesión...';
                button.disabled = true;
                
                const data = Object.fromEntries(new FormData(e.target));
                
                try {
                    // Autenticación en json-server
                    const res = await fetch(`${API_URL}/users?username=${data.username}&password=${data.password}`);
                    const users = await res.json();
                    
                    if (users.length) {
                        saveSession(users[0]);
                        showToast(`¡Bienvenido ${users[0].username}!`, 'success');
                        setTimeout(routeGuard, 1000);
                    } else {
                        showToast('Usuario o contraseña incorrectos', 'error');
                        button.innerHTML = originalHTML;
                        button.disabled = false;
              # Mejoras UX/UI para la Aplicación de Gestión de Eventos

Analicé tu aplicación y he identificado varias oportunidades para mejorar la experiencia de usuario y la interfaz. Implementaré las siguientes mejoras:

## Problemas identificados:
1. Interfaz minimalista sin estilos visuales
2. Falta de feedback visual en las acciones
3. Diseño no responsivo
4. Navegación poco intuitiva
5. Escasez de elementos visuales que guíen al usuario
6. Mensajes de alerta básicos

## Mejoras propuestas:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Manager - Gestión de Eventos</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #4361ee;
            --secondary: #3f37c9;
            --success: #4cc9f0;
            --danger: #f72585;
            --warning: #f8961e;
            --light: #f8f9fa;
            --dark: #212529;
            --gray: #6c757d;
            --light-gray: #e9ecef;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f0f2f5;
            color: var(--dark);
            min-height: 100vh;
        }
        
        /* Estilos generales */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }
        
        .card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        .btn {
            padding: 10px 20px;
            border-radius: 6px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .btn-primary {
            background: var(--primary);
            color: white;
        }
        
        .btn-primary:hover {
            background: var(--secondary);
        }
        
        .btn-outline {
            background: transparent;
            border: 1px solid var(--primary);
            color: var(--primary);
        }
        
        .btn-outline:hover {
            background: var(--primary);
            color: white;
        }
        
        .btn-danger {
            background: var(--danger);
            color: white;
        }
        
        .btn-danger:hover {
            background: #e11570;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }
        
        .form-control:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--dark);
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 15px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: 700;
        }
        
        .logo i {
            font-size: 28px;
        }
        
        /* Dashboard */
        .dashboard-container {
            display: flex;
            min-height: calc(100vh - 60px);
        }
        
        .sidebar {
            width: 280px;
            background: white;
            padding: 20px 0;
            border-right: 1px solid var(--light-gray);
            box-shadow: 2px 0 10px rgba(0,0,0,0.03);
            position: sticky;
            top: 60px;
            height: calc(100vh - 60px);
            overflow-y: auto;
        }
        
        .user-info {
            padding: 0 20px 20px;
            border-bottom: 1px solid var(--light-gray);
            margin-bottom: 20px;
        }
        
        .user-info h2 {
            font-size: 20px;
            margin-bottom: 5px;
        }
        
        .user-info .role {
            background: var(--light-gray);
            color: var(--gray);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
        }
        
        .nav-item {
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--dark);
            text-decoration: none;
            transition: all 0.2s ease;
            font-weight: 500;
            border-left: 3px solid transparent;
        }
        
        .nav-item:hover, .nav-item.active {
            background: rgba(67, 97, 238, 0.05);
            color: var(--primary);
            border-left-color: var(--primary);
        }
        
        .nav-item i {
            width: 24px;
            text-align: center;
        }
        
        .main-content {
            flex: 1;
            padding: 30px;
        }
        
        .section-title {
            font-size: 24px;
            margin-bottom: 25px;
            color: var(--dark);
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        /* Eventos */
        .events-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }
        
        .event-card {
            padding: 20px;
            position: relative;
        }
        
        .event-card .event-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--dark);
        }
        
        .event-card .event-description {
            color: var(--gray);
            margin-bottom: 15px;
            line-height: 1.5;
        }
        
        .event-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }
        
        .capacity {
            background: rgba(76, 201, 240, 0.15);
            color: #0a9396;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
        }
        
        .registered {
            background: rgba(248, 150, 30, 0.15);
            color: var(--warning);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
        }
        
        .event-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        .event-form {
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
        }
        
        /* Formularios de autenticación */
        .auth-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa, #e4edf9);
        }
        
        .auth-card {
            width: 100%;
            max-width: 500px;
            padding: 40px 30px;
        }
        
        .auth-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .auth-header h2 {
            font-size: 28px;
            color: var(--dark);
            margin-bottom: 10px;
        }
        
        .auth-header p {
            color: var(--gray);
            font-size: 16px;
        }
        
        .form-footer {
            text-align: center;
            margin-top: 20px;
            color: var(--gray);
        }
        
        /* Toast notifications */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 1000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        }
        
        .toast.show {
            transform: translateX(0);
        }
        
        .toast.success {
            border-left: 4px solid #2ecc71;
        }
        
        .toast.error {
            border-left: 4px solid #e74c3c;
        }
        
        .toast.warning {
            border-left: 4px solid #f39c12;
        }
        
        .toast i {
            font-size: 20px;
        }
        
        .toast.success i {
            color: #2ecc71;
        }
        
        .toast.error i {
            color: #e74c3c;
        }
        
        .toast.warning i {
            color: #f39c12;
        }
        
        /* Responsive */
        @media (max-width: 992px) {
            .sidebar {
                width: 250px;
            }
        }
        
        @media (max-width: 768px) {
            .dashboard-container {
                flex-direction: column;
            }
            
            .sidebar {
                width: 100%;
                height: auto;
                position: relative;
                top: 0;
                border-right: none;
                border-bottom: 1px solid var(--light-gray);
            }
            
            .main-content {
                padding: 20px;
            }
            
            .events-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 576px) {
            .header-content {
                flex-direction: column;
                gap: 15px;
            }
            
            .event-actions {
                flex-direction: column;
            }
        }
        
        /* Animaciones */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- El contenido se renderizará dinámicamente aquí -->
    </div>
    
    <!-- Toast container -->
    <div id="toast-container"></div>

    <script>
        // Simulación de base de datos (json-server)
        const API_URL = 'http://localhost:3000'; 
        
        // Utilidades de LocalStorage para sesión
        function saveSession(user) {
            localStorage.setItem('session', JSON.stringify(user));
        }
        
        function getSession() {
            return JSON.parse(localStorage.getItem('session'));
        }
        
        function clearSession() {
            localStorage.removeItem('session');
        }
        
        // Mostrar notificación
        function showToast(message, type = 'success') {
            const toastContainer = document.getElementById('toast-container');
            const icons = {
                success: 'check-circle',
                error: 'exclamation-circle',
                warning: 'exclamation-triangle'
            };
            
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <i class="fas fa-${icons[type]}"></i>
                <span>${message}</span>
            `;
            
            toastContainer.appendChild(toast);
            
            // Mostrar toast
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // Ocultar y eliminar después de 4 segundos
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 4000);
        }
        
        // Renderizado SPA 
        function render(view) {
            const app = document.getElementById('app');
            app.innerHTML = '';
            app.appendChild(view);
        }
        
        // Formulario de registro
        function registerForm() {
            const div = document.createElement('div');
            div.className = 'auth-container fade-in';
            div.innerHTML = `
                <div class="auth-card card">
                    <div class="auth-header">
                        <h2><i class="fas fa-user-plus"></i> Crear cuenta</h2>
                        <p>Completa el formulario para registrarte</p>
                    </div>
                    <form id="register">
                        <div class="form-group">
                            <label for="username"><i class="fas fa-user"></i> Nombre de usuario</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Ingresa tu usuario" required>
                        </div>
                        <div class="form-group">
                            <label for="password"><i class="fas fa-lock"></i> Contraseña</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Crea una contraseña" required>
                        </div>
                        <div class="form-group">
                            <label for="role"><i class="fas fa-user-tag"></i> Rol</label>
                            <select class="form-control" id="role" name="role">
                                <option value="visitante">Visitante</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                            <i class="fas fa-user-plus"></i> Registrarse
                        </button>
                    </form>
                    <div class="form-footer">
                        <p>¿Ya tienes una cuenta? <a href="#" id="toLogin">Inicia sesión</a></p>
                    </div>
                </div>
            `;
            
            div.querySelector('#register').onsubmit = async (e) => {
                e.preventDefault();
                const button = e.target.querySelector('button[type="submit"]');
                const originalHTML = button.innerHTML;
                button.innerHTML = '<div class="loading"></div> Registrando...';
                button.disabled = true;
                
                const data = Object.fromEntries(new FormData(e.target));
                
                try {
                    // Registro en json-server
                    await fetch(`${API_URL}/users`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    
                    showToast('¡Registro exitoso! Ahora puedes iniciar sesión', 'success');
                    
                    // Pequeño retraso para que el usuario vea el mensaje
                    setTimeout(() => {
                        render(loginForm());
                    }, 1500);
                } catch (error) {
                    showToast('Error en el registro. Inténtalo de nuevo', 'error');
                    button.innerHTML = originalHTML;
                    button.disabled = false;
                }
            };
            
            div.querySelector('#toLogin').onclick = (e) => {
                e.preventDefault();
                render(loginForm());
            };
            
            return div;
        }
        
        // Formulario de login
        function loginForm() {
            const div = document.createElement('div');
            div.className = 'auth-container fade-in';
            div.innerHTML = `
                <div class="auth-card card">
                    <div class="auth-header">
                        <h2><i class="fas fa-sign-in-alt"></i> Iniciar sesión</h2>
                        <p>Ingresa tus credenciales para continuar</p>
                    </div>
                    <form id="login">
                        <div class="form-group">
                            <label for="username"><i class="fas fa-user"></i> Usuario</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Tu nombre de usuario" required>
                        </div>
                        <div class="form-group">
                            <label for="password"><i class="fas fa-lock"></i> Contraseña</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Tu contraseña" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                            <i class="fas fa-sign-in-alt"></i> Ingresar
                        </button>
                    </form>
                    <div class="form-footer">
                        <p>¿No tienes cuenta? <a href="#" id="toRegister">Regístrate aquí</a></p>
                    </div>
                </div>
            `;
            
            div.querySelector('#login').onsubmit = async (e) => {
                e.preventDefault();
                const button = e.target.querySelector('button[type="submit"]');
                const originalHTML = button.innerHTML;
                button.innerHTML = '<div class="loading"></div> Iniciando sesión...';
                button.disabled = true;
                
                const data = Object.fromEntries(new FormData(e.target));
                
                try {
                    // Autenticación en json-server
                    const res = await fetch(`${API_URL}/users?username=${data.username}&password=${data.password}`);
                    const users = await res.json();
                    
                    if (users.length) {
                        saveSession(users[0]);
                        showToast(`¡Bienvenido ${users[0].username}!`, 'success');
                        setTimeout(routeGuard, 1000);
                    } else {
                        showToast('Usuario o contraseña incorrectos', 'error');
                        button.innerHTML = originalHTML;
                        button.disabled = false;
              
