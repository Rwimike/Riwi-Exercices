document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    setupTheme();
    setupMobileMenu();
    setupNavigation();
    setupCursor();
    setCurrentYear();
    loadInitialContent();
});

// Manejo del tema claro/oscuro
function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Verificar preferencia del usuario
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    updateThemeIcon();
}

// Menú móvil
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeButton = document.getElementById('close-mobile-menu');
    
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
    
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.mobile-menu .section-btn').forEach(button => {
        button.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Navegación SPA
function setupNavigation() {
    document.querySelectorAll('.section-btn').forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            loadContent(section);
            
            // Actualizar URL
            history.pushState(null, null, `#${section}`);
            
            // Scroll suave al principio
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Manejar el botón de retroceso
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.replace('#', '') || 'about';
        loadContent(hash);
    });
}

// Cursor personalizado
function setupCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    // Mover cursor con el ratón
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Efecto al hacer clic
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-5px, -5px) rotate(-30deg) scale(0.9)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-5px, -5px) rotate(0deg) scale(1)';
    });
    
    // Efecto al pasar sobre elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .gamer-btn, .skill-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-5px, -5px) scale(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-5px, -5px) scale(1)';
        });
    });
}

// Cargar contenido inicial
function loadInitialContent() {
    const hash = window.location.hash.replace('#', '') || 'about';
    loadContent(hash);
}

// Cargar contenido dinámico
function loadContent(section) {
    const contentDiv = document.getElementById('content');
    
    // Mostrar loader
    contentDiv.innerHTML = '<div class="loader">Cargando...</div>';
    
    // Simular carga asíncrona
    setTimeout(() => {
        switch(section) {
            case 'about':
                contentDiv.innerHTML = getAboutContent();
                break;
            case 'projects':
                contentDiv.innerHTML = getProjectsContent();
                break;
            default:
                contentDiv.innerHTML = getAboutContent();
        }
    }, 300);
}

// Contenido de las secciones
function getAboutContent() {
    return `
        <div class="section-content pixel-border">
            <h2><i class="fas fa-user"></i> Hola, Soy Miguel</h2>
            <div class="text-content">
                <p>
                    Soy Miguel Ángel Lopera Muñoz, desarrollador web de Medellín, Colombia, con 20 años de edad y una gran pasión por el aprendizaje constante. Especializado en tecnologías como Python, HTML y CSS, me enfoco en construir soluciones funcionales, limpias y eficientes.
                </p>
                <br>
                <p>
                    Me destaco por mi capacidad para liderar proyectos, coordinar equipos y mantener una visión clara desde la planificación hasta la entrega final.
                </p>
                <br>
                <p>
                    Actualmente resido en el sur de Medellín, donde combino mi entusiasmo por el desarrollo de software con una mentalidad proactiva y enfocada en resultados.
                </p>
                <br>
                <p>
                    Busco seguir creciendo profesionalmente en el mundo de la tecnología, aportando soluciones innovadoras y colaborando en proyectos que generen impacto real.
                </p>
            </div>
        </div>
    `;
}

function getProjectsContent() {
    return `
        <div class="section-content pixel-border">
            <h2><i class="fas fa-gamepad"></i> Mis Proyectos</h2>
            <div class="projects-grid">
                <a href="https://rwimike.github.io/Login-signup/" class="project-card" target="_blank">
                    <div class="screen">
                        <img src="log.png" alt="Login Project" class="project-img">
                    </div>
                    <div class="p-4">
                        <h3>LogIn & SignUp</h3>
                    </div>
                </a>
                
                <a href="https://rwimike.github.io/Multipages/" class="project-card" target="_blank">
                    <div class="screen">
                        <img src="Blog.png" alt="Multipage Project" class="project-img">
                    </div>
                    <div class="p-4">
                        <h3>Multipagina</h3>
                    </div>
                </a>
                
                <div class="project-card">
                    <div class="screen flex items-center justify-center bg-gray-100 dark:bg-gray-700 h-48">
                        <i class="fas fa-bars text-4xl text-gray-400"></i>
                    </div>
                    <div class="p-4">
                        <h3>Menú</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Próximamente</p>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="screen flex items-center justify-center bg-gray-100 dark:bg-gray-700 h-48">
                        <i class="fas fa-calendar-alt text-4xl text-gray-400"></i>
                    </div>
                    <div class="p-4">
                        <h3>Eventos</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Próximamente</p>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="screen flex items-center justify-center bg-gray-100 dark:bg-gray-700 h-48">
                        <i class="fas fa-store text-4xl text-gray-400"></i>
                    </div>
                    <div class="p-4">
                        <h3>Tienda Online</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Próximamente</p>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="screen flex items-center justify-center bg-gray-100 dark:bg-gray-700 h-48">
                        <i class="fas fa-chess text-4xl text-gray-400"></i>
                    </div>
                    <div class="p-4">
                        <h3>Juego de Ajedrez</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Próximamente</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Actual year 
function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}