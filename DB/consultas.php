-- =============================================
-- STREAMHUB - SISTEMA DE GESTIÓN DE CONTENIDO
-- Implementación en PostgreSQL y MySQL
-- =============================================

-- ===== ESQUEMA DE BASE DE DATOS =====

-- Eliminar tablas si existen (PostgreSQL y MySQL)
DROP TABLE IF EXISTS valoraciones CASCADE;
DROP TABLE IF EXISTS lista_contenidos CASCADE;
DROP TABLE IF EXISTS listas_usuario CASCADE;
DROP TABLE IF EXISTS historial_visualizacion CASCADE;
DROP TABLE IF EXISTS contenido_generos CASCADE;
DROP TABLE IF EXISTS contenido_reparto CASCADE;
DROP TABLE IF EXISTS usuario_generos_preferidos CASCADE;
DROP TABLE IF EXISTS contenidos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Tabla usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,                    -- SERIAL en PostgreSQL, AUTO_INCREMENT en MySQL
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    pais VARCHAR(50),
    fecha_registro DATE NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla contenidos
CREATE TABLE contenidos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    tipo VARCHAR(20) NOT NULL,              -- 'película' o 'serie'
    duracion_min INTEGER,
    ano_lanzamiento INTEGER,
    fecha_estreno DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para géneros preferidos de usuarios (relación muchos a muchos)
CREATE TABLE usuario_generos_preferidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    genero VARCHAR(50) NOT NULL
);

-- Tabla para géneros de contenidos (relación muchos a muchos)
CREATE TABLE contenido_generos (
    id SERIAL PRIMARY KEY,
    contenido_id INTEGER REFERENCES contenidos(id) ON DELETE CASCADE,
    genero VARCHAR(50) NOT NULL
);

-- Tabla para reparto principal
CREATE TABLE contenido_reparto (
    id SERIAL PRIMARY KEY,
    contenido_id INTEGER REFERENCES contenidos(id) ON DELETE CASCADE,
    actor VARCHAR(100) NOT NULL,
    orden_aparicion INTEGER DEFAULT 1
);

-- Tabla valoraciones
CREATE TABLE valoraciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    contenido_id INTEGER REFERENCES contenidos(id) ON DELETE CASCADE,
    puntuacion INTEGER CHECK (puntuacion >= 1 AND puntuacion <= 5),
    comentario TEXT,
    fecha_valoracion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla listas de usuario
CREATE TABLE listas_usuario (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla contenidos en listas (relación muchos a muchos)
CREATE TABLE lista_contenidos (
    id SERIAL PRIMARY KEY,
    lista_id INTEGER REFERENCES listas_usuario(id) ON DELETE CASCADE,
    contenido_id INTEGER REFERENCES contenidos(id) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla historial de visualización
CREATE TABLE historial_visualizacion (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    contenido_id INTEGER REFERENCES contenidos(id) ON DELETE CASCADE,
    fecha_visualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tiempo_visto INTEGER -- minutos vistos
);

-- ===== INSERCIÓN DE DATOS =====

-- Insertar usuarios
INSERT INTO usuarios (nombre, email, pais, fecha_registro, activo) VALUES
('Juan Pérez', 'juan@example.com', 'Colombia', '2025-08-08', TRUE),
('Ana López', 'ana@example.com', 'México', '2025-08-05', TRUE),
('Carlos Rodríguez', 'carlos@example.com', 'España', '2025-07-15', TRUE);

-- Insertar géneros preferidos de usuarios
INSERT INTO usuario_generos_preferidos (usuario_id, genero) VALUES
(1, 'Acción'), (1, 'Ciencia ficción'),
(2, 'Drama'), (2, 'Romance'),
(3, 'Thriller'), (3, 'Misterio');

-- Insertar contenidos
INSERT INTO contenidos (titulo, tipo, duracion_min, ano_lanzamiento, fecha_estreno) VALUES
('Matrix', 'película', 136, 1999, '1999-03-31'),
('Breaking Bad', 'serie', 50, 2008, '2008-01-20'),
('Inception', 'película', 148, 2010, '2010-07-16'),
('Stranger Things', 'serie', 55, 2016, '2016-07-15');

-- Insertar géneros de contenidos
INSERT INTO contenido_generos (contenido_id, genero) VALUES
(1, 'Ciencia ficción'), (1, 'Acción'),
(2, 'Drama'), (2, 'Crimen'),
(3, 'Ciencia ficción'), (3, 'Thriller'),
(4, 'Ciencia ficción'), (4, 'Horror'), (4, 'Drama');

-- Insertar reparto principal
INSERT INTO contenido_reparto (contenido_id, actor, orden_aparicion) VALUES
(1, 'Keanu Reeves', 1), (1, 'Laurence Fishburne', 2), (1, 'Carrie-Anne Moss', 3),
(2, 'Bryan Cranston', 1), (2, 'Aaron Paul', 2), (2, 'Anna Gunn', 3),
(3, 'Leonardo DiCaprio', 1), (3, 'Marion Cotillard', 2), (3, 'Tom Hardy', 3),
(4, 'Millie Bobby Brown', 1), (4, 'Finn Wolfhard', 2), (4, 'David Harbour', 3);

-- Insertar valoraciones
INSERT INTO valoraciones (usuario_id, contenido_id, puntuacion, comentario, fecha_valoracion) VALUES
(1, 1, 5, '¡Película revolucionaria!', '2025-08-08 14:30:00'),
(2, 1, 4, 'Muy buena, efectos increíbles', '2025-08-07 20:15:00'),
(1, 2, 5, 'La mejor serie de todos los tiempos', '2025-08-06 19:45:00'),
(3, 4, 4, 'Nostalgia de los 80s perfecta', '2025-08-05 21:20:00'),
(1, 3, 5, 'Obra maestra de Nolan', '2025-08-09 16:10:00');

-- Insertar listas de usuario
INSERT INTO listas_usuario (usuario_id, nombre, fecha_creacion) VALUES
(1, 'Mis Favoritas', '2025-08-08 10:00:00'),
(3, 'Para ver después', '2025-07-20 15:30:00');

-- Insertar contenidos en listas
INSERT INTO lista_contenidos (lista_id, contenido_id, fecha_agregado) VALUES
(1, 1, '2025-08-08 10:05:00'), (1, 3, '2025-08-08 10:06:00'),
(2, 2, '2025-07-20 15:35:00'), (2, 4, '2025-07-20 15:36:00');

-- Insertar historial de visualización
INSERT INTO historial_visualizacion (usuario_id, contenido_id, fecha_visualizacion, tiempo_visto) VALUES
(1, 1, '2025-08-07 20:00:00', 136),
(1, 2, '2025-08-06 21:00:00', 50),
(2, 1, '2025-08-07 19:30:00', 136),
(3, 4, '2025-08-05 20:45:00', 55);

-- ===== CONSULTAS BÁSICAS =====

-- 1. Películas con más de 120 minutos
SELECT c.titulo, c.duracion_min, c.ano_lanzamiento
FROM contenidos c
WHERE c.tipo = 'película' AND c.duracion_min > 120
ORDER BY c.duracion_min DESC;

-- 2. Usuarios registrados después del 1 de agosto de 2025
SELECT u.nombre, u.email, u.pais, u.fecha_registro
FROM usuarios u
WHERE u.fecha_registro > '2025-08-01'
ORDER BY u.fecha_registro DESC;

-- 3. Contenidos de ciencia ficción
SELECT DISTINCT c.titulo, c.tipo, c.ano_lanzamiento
FROM contenidos c
INNER JOIN contenido_generos cg ON c.id = cg.contenido_id
WHERE cg.genero = 'Ciencia ficción'
ORDER BY c.ano_lanzamiento DESC;

-- 4. Películas de más de 120 min Y de acción (usando AND)
SELECT DISTINCT c.titulo, c.duracion_min
FROM contenidos c
INNER JOIN contenido_generos cg ON c.id = cg.contenido_id
WHERE c.tipo = 'película' 
  AND c.duracion_min > 120 
  AND cg.genero = 'Acción';

-- 5. Contenidos de Drama O Thriller (usando OR con UNION)
SELECT DISTINCT c.titulo, c.tipo, cg.genero
FROM contenidos c
INNER JOIN contenido_generos cg ON c.id = cg.contenido_id
WHERE cg.genero IN ('Drama', 'Thriller')
ORDER BY c.titulo;

-- 6. Contenidos que contienen 'ing' en el título (equivalente a $regex)
SELECT c.titulo, c.tipo, c.ano_lanzamiento
FROM contenidos c
WHERE c.titulo ILIKE '%ing%'  -- ILIKE en PostgreSQL, LIKE en MySQL (case insensitive)
ORDER BY c.titulo;

-- 7. Usuarios de Colombia
SELECT u.nombre, u.email, u.fecha_registro
FROM usuarios u
WHERE u.pais = 'Colombia';

-- ===== ACTUALIZACIONES =====

-- 8. Agregar valoración (ya insertada arriba como ejemplo)
-- Equivalente a agregar valoración a "Inception"
INSERT INTO valoraciones (usuario_id, contenido_id, puntuacion, comentario)
SELECT 1, c.id, 5, 'Obra maestra de Nolan'
FROM contenidos c
WHERE c.titulo = 'Inception'
AND NOT EXISTS (
    SELECT 1 FROM valoraciones v 
    WHERE v.usuario_id = 1 AND v.contenido_id = c.id
);

-- 9. Actualizar géneros preferidos (agregar uno nuevo)
INSERT INTO usuario_generos_preferidos (usuario_id, genero)
SELECT u.id, 'Comedia'
FROM usuarios u
WHERE u.email = 'ana@example.com'
AND NOT EXISTS (
    SELECT 1 FROM usuario_generos_preferidos ugp
    WHERE ugp.usuario_id = u.id AND ugp.genero = 'Comedia'
);

-- 10. Actualizar campo en todos los usuarios (ya tienen activo=true por default)
UPDATE usuarios SET activo = TRUE WHERE activo IS NULL;

-- ===== ELIMINACIONES =====

-- 11. Eliminar valoraciones de contenido específico (ejemplo)
DELETE FROM valoraciones 
WHERE contenido_id IN (
    SELECT id FROM contenidos WHERE titulo = 'ContenidoEjemplo'
);

-- ===== ÍNDICES =====

-- 12. Crear índices para optimizar búsquedas
CREATE INDEX idx_contenidos_titulo ON contenidos(titulo);
CREATE INDEX idx_contenidos_tipo ON contenidos(tipo);
CREATE INDEX idx_contenidos_ano ON contenidos(ano_lanzamiento);
CREATE INDEX idx_valoraciones_contenido ON valoraciones(contenido_id);
CREATE INDEX idx_valoraciones_usuario ON valoraciones(usuario_id);
CREATE INDEX idx_usuarios_email ON usuarios(email); -- Ya es único
CREATE INDEX idx_usuarios_pais ON usuarios(pais);
CREATE INDEX idx_contenido_generos_genero ON contenido_generos(genero);

-- 13. Ver índices (PostgreSQL)
-- SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'contenidos';

-- Ver índices (MySQL)
-- SHOW INDEX FROM contenidos;

-- ===== AGREGACIONES AVANZADAS =====

-- 15. Promedio de calificación por contenido
SELECT 
    c.titulo,
    c.tipo,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio_calificacion,  -- ::NUMERIC en PostgreSQL, solo AVG() en MySQL
    COUNT(v.id) as total_valoraciones
FROM contenidos c
INNER JOIN valoraciones v ON c.id = v.contenido_id
GROUP BY c.id, c.titulo, c.tipo
HAVING COUNT(v.id) > 0
ORDER BY promedio_calificacion DESC, total_valoraciones DESC;

-- 16. Conteo de contenidos por género
SELECT 
    cg.genero,
    COUNT(DISTINCT cg.contenido_id) as total_contenidos
FROM contenido_generos cg
GROUP BY cg.genero
ORDER BY total_contenidos DESC;

-- 17. Estadísticas por tipo de contenido
SELECT 
    c.tipo,
    COUNT(*) as total,
    ROUND(AVG(c.duracion_min), 0) as duracion_promedio,
    MAX(c.ano_lanzamiento) as ano_mas_reciente,
    MIN(c.ano_lanzamiento) as ano_mas_antiguo
FROM contenidos c
GROUP BY c.tipo
ORDER BY total DESC;

-- 18. Usuarios más activos (con más listas creadas)
SELECT 
    u.nombre,
    u.email,
    u.pais,
    COUNT(l.id) as total_listas,
    COUNT(DISTINCT lc.contenido_id) as contenidos_en_listas
FROM usuarios u
LEFT JOIN listas_usuario l ON u.id = l.usuario_id
LEFT JOIN lista_contenidos lc ON l.id = lc.lista_id
GROUP BY u.id, u.nombre, u.email, u.pais
ORDER BY total_listas DESC, contenidos_en_listas DESC;

-- 19. Contenidos mejor valorados (promedio >= 4)
SELECT 
    c.titulo,
    c.tipo,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio,
    COUNT(v.id) as total_resenas
FROM contenidos c
INNER JOIN valoraciones v ON c.id = v.contenido_id
GROUP BY c.id, c.titulo, c.tipo
HAVING AVG(v.puntuacion) >= 4
ORDER BY AVG(v.puntuacion) DESC, COUNT(v.id) DESC;

-- 20. Géneros preferidos por país
SELECT 
    u.pais,
    ugp.genero,
    COUNT(ugp.usuario_id) as usuarios_con_preferencia
FROM usuarios u
INNER JOIN usuario_generos_preferidos ugp ON u.id = ugp.usuario_id
GROUP BY u.pais, ugp.genero
ORDER BY u.pais, usuarios_con_preferencia DESC;

-- 21. Análisis de visualizaciones por usuario
SELECT 
    u.nombre,
    u.pais,
    COUNT(hv.id) as total_visualizaciones,
    SUM(hv.tiempo_visto) as minutos_totales_vistos,
    ROUND(AVG(hv.tiempo_visto), 0) as promedio_minutos_por_sesion
FROM usuarios u
LEFT JOIN historial_visualizacion hv ON u.id = hv.usuario_id
GROUP BY u.id, u.nombre, u.pais
ORDER BY total_visualizaciones DESC;

-- 22. Top actores por apariciones
SELECT 
    cr.actor,
    COUNT(DISTINCT cr.contenido_id) as apariciones,
    STRING_AGG(c.titulo, ', ') as contenidos  -- GROUP_CONCAT en MySQL
FROM contenido_reparto cr
INNER JOIN contenidos c ON cr.contenido_id = c.id
GROUP BY cr.actor
ORDER BY apariciones DESC;

-- 23. Contenidos más populares (más valorados)
SELECT 
    c.titulo,
    c.tipo,
    c.ano_lanzamiento,
    COUNT(v.id) as total_valoraciones,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio_puntuacion,
    COUNT(DISTINCT lc.lista_id) as apariciones_en_listas
FROM contenidos c
LEFT JOIN valoraciones v ON c.id = v.contenido_id
LEFT JOIN lista_contenidos lc ON c.id = lc.contenido_id
GROUP BY c.id, c.titulo, c.tipo, c.ano_lanzamiento
ORDER BY total_valoraciones DESC, promedio_puntuacion DESC;

-- ===== CONSULTAS DE VALIDACIÓN =====

-- 24. Conteo de registros en cada tabla
SELECT 'usuarios' as tabla, COUNT(*) as total FROM usuarios
UNION ALL
SELECT 'contenidos' as tabla, COUNT(*) as total FROM contenidos
UNION ALL
SELECT 'valoraciones' as tabla, COUNT(*) as total FROM valoraciones
UNION ALL
SELECT 'listas_usuario' as tabla, COUNT(*) as total FROM listas_usuario
ORDER BY total DESC;

-- 25. Usuario completo con todos sus datos relacionados
SELECT 
    u.nombre,
    u.email,
    u.pais,
    u.fecha_registro,
    STRING_AGG(DISTINCT ugp.genero, ', ') as generos_preferidos,
    COUNT(DISTINCT l.id) as total_listas,
    COUNT(DISTINCT v.id) as total_valoraciones,
    COUNT(DISTINCT hv.id) as total_visualizaciones
FROM usuarios u
LEFT JOIN usuario_generos_preferidos ugp ON u.id = ugp.usuario_id
LEFT JOIN listas_usuario l ON u.id = l.usuario_id
LEFT JOIN valoraciones v ON u.id = v.usuario_id
LEFT JOIN historial_visualizacion hv ON u.id = hv.usuario_id
WHERE u.nombre = 'Juan Pérez'
GROUP BY u.id, u.nombre, u.email, u.pais, u.fecha_registro;

-- 26. Contenido completo con todos sus datos relacionados
SELECT 
    c.titulo,
    c.tipo,
    c.duracion_min,
    c.ano_lanzamiento,
    STRING_AGG(DISTINCT cg.genero, ', ') as generos,
    STRING_AGG(DISTINCT cr.actor, ', ') as reparto_principal,
    COUNT(DISTINCT v.id) as total_valoraciones,
    COALESCE(ROUND(AVG(v.puntuacion::NUMERIC), 2), 0) as promedio_valoracion
FROM contenidos c
LEFT JOIN contenido_generos cg ON c.id = cg.contenido_id
LEFT JOIN contenido_reparto cr ON c.id = cr.contenido_id
LEFT JOIN valoraciones v ON c.id = v.contenido_id
WHERE c.titulo = 'Matrix'
GROUP BY c.id, c.titulo, c.tipo, c.duracion_min, c.ano_lanzamiento;

-- ===== EJERCICIOS ADICIONALES AVANZADOS =====

-- 27. Usuarios que han visto más de 1 contenido
SELECT 
    u.nombre,
    u.email,
    COUNT(DISTINCT hv.contenido_id) as contenidos_vistos,
    SUM(hv.tiempo_visto) as minutos_totales
FROM usuarios u
INNER JOIN historial_visualizacion hv ON u.id = hv.usuario_id
GROUP BY u.id, u.nombre, u.email
HAVING COUNT(DISTINCT hv.contenido_id) > 1
ORDER BY contenidos_vistos DESC;

-- 28. Contenidos sin valoraciones
SELECT c.titulo, c.tipo, c.ano_lanzamiento
FROM contenidos c
LEFT JOIN valoraciones v ON c.id = v.contenido_id
WHERE v.id IS NULL
ORDER BY c.ano_lanzamiento DESC;

-- 29. Usuarios con géneros preferidos que coinciden con contenido disponible
SELECT DISTINCT 
    u.nombre,
    ugp.genero,
    COUNT(DISTINCT c.id) as contenidos_disponibles
FROM usuarios u
INNER JOIN usuario_generos_preferidos ugp ON u.id = ugp.usuario_id
INNER JOIN contenido_generos cg ON ugp.genero = cg.genero
INNER JOIN contenidos c ON cg.contenido_id = c.id
GROUP BY u.id, u.nombre, ugp.genero
ORDER BY contenidos_disponibles DESC;

-- 30. Películas vs Series: Análisis comparativo
SELECT 
    c.tipo,
    COUNT(*) as total_contenidos,
    ROUND(AVG(c.duracion_min), 2) as duracion_promedio,
    COUNT(DISTINCT v.id) as total_valoraciones,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as puntuacion_promedio
FROM contenidos c
LEFT JOIN valoraciones v ON c.id = v.contenido_id
GROUP BY c.tipo
ORDER BY total_contenidos DESC;

-- 31. Top 3 géneros más valorados
SELECT 
    cg.genero,
    COUNT(v.id) as total_valoraciones,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio_puntuacion,
    COUNT(DISTINCT c.id) as contenidos_del_genero
FROM contenido_generos cg
INNER JOIN contenidos c ON cg.contenido_id = c.id
INNER JOIN valoraciones v ON c.id = v.contenido_id
GROUP BY cg.genero
ORDER BY promedio_puntuacion DESC, total_valoraciones DESC
LIMIT 3;

-- 32. Usuarios que no han creado listas
SELECT u.nombre, u.email, u.pais, u.fecha_registro
FROM usuarios u
LEFT JOIN listas_usuario l ON u.id = l.usuario_id
WHERE l.id IS NULL
ORDER BY u.fecha_registro DESC;

-- 33. Contenidos agregados a más listas (más populares en listas)
SELECT 
    c.titulo,
    c.tipo,
    COUNT(lc.lista_id) as veces_en_listas,
    COUNT(DISTINCT lc.lista_id) as listas_diferentes
FROM contenidos c
INNER JOIN lista_contenidos lc ON c.id = lc.contenido_id
GROUP BY c.id, c.titulo, c.tipo
ORDER BY veces_en_listas DESC;

-- 34. Análisis temporal: Contenidos por década
SELECT 
    CASE 
        WHEN c.ano_lanzamiento >= 2020 THEN '2020s'
        WHEN c.ano_lanzamiento >= 2010 THEN '2010s'
        WHEN c.ano_lanzamiento >= 2000 THEN '2000s'
        WHEN c.ano_lanzamiento >= 1990 THEN '1990s'
        ELSE 'Anteriores'
    END as decada,
    COUNT(*) as total_contenidos,
    ROUND(AVG(c.duracion_min), 0) as duracion_promedio
FROM contenidos c
GROUP BY 
    CASE 
        WHEN c.ano_lanzamiento >= 2020 THEN '2020s'
        WHEN c.ano_lanzamiento >= 2010 THEN '2010s'
        WHEN c.ano_lanzamiento >= 2000 THEN '2000s'
        WHEN c.ano_lanzamiento >= 1990 THEN '1990s'
        ELSE 'Anteriores'
    END
ORDER BY decada DESC;

-- 35. Usuarios más críticos (promedio de puntuaciones más bajo)
SELECT 
    u.nombre,
    COUNT(v.id) as total_valoraciones,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio_puntuaciones
FROM usuarios u
INNER JOIN valoraciones v ON u.id = v.usuario_id
GROUP BY u.id, u.nombre
HAVING COUNT(v.id) >= 2  -- Solo usuarios con al menos 2 valoraciones
ORDER BY promedio_puntuaciones ASC;

-- 36. Contenidos con mayor variabilidad en puntuaciones
SELECT 
    c.titulo,
    COUNT(v.id) as total_valoraciones,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio,
    MIN(v.puntuacion) as puntuacion_minima,
    MAX(v.puntuacion) as puntuacion_maxima,
    (MAX(v.puntuacion) - MIN(v.puntuacion)) as rango_puntuaciones
FROM contenidos c
INNER JOIN valoraciones v ON c.id = v.contenido_id
GROUP BY c.id, c.titulo
HAVING COUNT(v.id) > 1
ORDER BY rango_puntuaciones DESC;

-- 37. Actores que aparecen en múltiples contenidos
SELECT 
    cr.actor,
    COUNT(DISTINCT cr.contenido_id) as apariciones,
    STRING_AGG(DISTINCT c.tipo, ', ') as tipos_contenido,
    MIN(c.ano_lanzamiento) as primer_trabajo,
    MAX(c.ano_lanzamiento) as ultimo_trabajo
FROM contenido_reparto cr
INNER JOIN contenidos c ON cr.contenido_id = c.id
GROUP BY cr.actor
HAVING COUNT(DISTINCT cr.contenido_id) > 1
ORDER BY apariciones DESC;

-- 38. Análisis de actividad por mes (basado en fecha de valoración)
SELECT 
    EXTRACT(YEAR FROM v.fecha_valoracion) as ano,
    EXTRACT(MONTH FROM v.fecha_valoracion) as mes,
    COUNT(v.id) as valoraciones_del_mes,
    COUNT(DISTINCT v.usuario_id) as usuarios_activos,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio_puntuaciones
FROM valoraciones v
GROUP BY EXTRACT(YEAR FROM v.fecha_valoracion), EXTRACT(MONTH FROM v.fecha_valoracion)
ORDER BY ano DESC, mes DESC;

-- 39. Recomendaciones: Contenidos similares por género para un usuario
WITH usuario_generos AS (
    SELECT DISTINCT cg.genero
    FROM usuarios u
    INNER JOIN valoraciones v ON u.id = v.usuario_id
    INNER JOIN contenidos c ON v.contenido_id = c.id
    INNER JOIN contenido_generos cg ON c.id = cg.contenido_id
    WHERE u.nombre = 'Juan Pérez' AND v.puntuacion >= 4
)
SELECT DISTINCT
    c.titulo,
    c.tipo,
    c.ano_lanzamiento,
    cg.genero,
    COALESCE(ROUND(AVG(v.puntuacion::NUMERIC), 2), 0) as promedio_valoraciones
FROM contenidos c
INNER JOIN contenido_generos cg ON c.id = cg.contenido_id
INNER JOIN usuario_generos ug ON cg.genero = ug.genero
LEFT JOIN valoraciones v ON c.id = v.contenido_id
LEFT JOIN valoraciones v_usuario ON c.id = v_usuario.contenido_id 
    AND v_usuario.usuario_id = (SELECT id FROM usuarios WHERE nombre = 'Juan Pérez')
WHERE v_usuario.id IS NULL  -- Contenidos que el usuario no ha valorado
GROUP BY c.id, c.titulo, c.tipo, c.ano_lanzamiento, cg.genero
ORDER BY promedio_valoraciones DESC;

-- 40. Estadísticas completas por usuario
SELECT 
    u.nombre,
    u.pais,
    DATE_PART('day', CURRENT_DATE - u.fecha_registro) as dias_registrado,
    COUNT(DISTINCT v.id) as total_valoraciones,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio_valoraciones_dadas,
    COUNT(DISTINCT hv.id) as visualizaciones_totales,
    SUM(hv.tiempo_visto) as minutos_totales_vistos,
    COUNT(DISTINCT l.id) as listas_creadas,
    COUNT(DISTINCT lc.contenido_id) as contenidos_en_listas
FROM usuarios u
LEFT JOIN valoraciones v ON u.id = v.usuario_id
LEFT JOIN historial_visualizacion hv ON u.id = hv.usuario_id
LEFT JOIN listas_usuario l ON u.id = l.usuario_id
LEFT JOIN lista_contenidos lc ON l.id = lc.lista_id
GROUP BY u.id, u.nombre, u.pais, u.fecha_registro
ORDER BY total_valoraciones DESC;

-- ===== CONSULTAS CON SUBCONSULTAS =====

-- 41. Contenidos mejor valorados que el promedio general
WITH promedio_general AS (
    SELECT AVG(puntuacion::NUMERIC) as promedio FROM valoraciones
)
SELECT 
    c.titulo,
    c.tipo,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio_contenido,
    (SELECT ROUND(promedio, 2) FROM promedio_general) as promedio_plataforma
FROM contenidos c
INNER JOIN valoraciones v ON c.id = v.contenido_id
GROUP BY c.id, c.titulo, c.tipo
HAVING AVG(v.puntuacion::NUMERIC) > (SELECT promedio FROM promedio_general)
ORDER BY AVG(v.puntuacion::NUMERIC) DESC;

-- 42. Usuarios que han valorado más contenidos que el promedio
WITH promedio_valoraciones AS (
    SELECT AVG(total) as promedio FROM (
        SELECT COUNT(*) as total 
        FROM valoraciones 
        GROUP BY usuario_id
    ) sub
)
SELECT 
    u.nombre,
    COUNT(v.id) as total_valoraciones,
    (SELECT ROUND(promedio, 2) FROM promedio_valoraciones) as promedio_plataforma
FROM usuarios u
INNER JOIN valoraciones v ON u.id = v.usuario_id
GROUP BY u.id, u.nombre
HAVING COUNT(v.id) > (SELECT promedio FROM promedio_valoraciones)
ORDER BY total_valoraciones DESC;

-- 43. Géneros con más contenidos que la media
WITH promedio_por_genero AS (
    SELECT AVG(total) as promedio FROM (
        SELECT COUNT(*) as total 
        FROM contenido_generos 
        GROUP BY genero
    ) sub
)
SELECT 
    cg.genero,
    COUNT(*) as total_contenidos,
    (SELECT ROUND(promedio, 2) FROM promedio_por_genero) as promedio_contenidos
FROM contenido_generos cg
GROUP BY cg.genero
HAVING COUNT(*) > (SELECT promedio FROM promedio_por_genero)
ORDER BY total_contenidos DESC;

-- ===== CONSULTAS CON VENTANAS (WINDOW FUNCTIONS) =====

-- 44. Ranking de contenidos por puntuación con ventanas
SELECT 
    c.titulo,
    c.tipo,
    ROUND(AVG(v.puntuacion::NUMERIC), 2) as promedio_puntuacion,
    COUNT(v.id) as total_valoraciones,
    RANK() OVER (ORDER BY AVG(v.puntuacion::NUMERIC) DESC) as ranking_puntuacion,
    ROW_NUMBER() OVER (PARTITION BY c.tipo ORDER BY AVG(v.puntuacion::NUMERIC) DESC) as ranking_por_tipo
FROM contenidos c
INNER JOIN valoraciones v ON c.id = v.contenido_id
GROUP BY c.id, c.titulo, c.tipo
ORDER BY ranking_puntuacion;

-- 45. Evolución temporal de valoraciones por usuario
SELECT 
    u.nombre,
    v.fecha_valoracion::DATE as fecha,
    v.puntuacion,
    c.titulo,
    AVG(v.puntuacion::NUMERIC) OVER (
        PARTITION BY v.usuario_id 
        ORDER BY v.fecha_valoracion 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as promedio_movil_3_valoraciones
FROM usuarios u
INNER JOIN valoraciones v ON u.id = v.usuario_id
INNER JOIN contenidos c ON v.contenido_id = c.id
ORDER BY u.nombre, v.fecha_valoracion;

-- ===== PROCEDIMIENTOS ALMACENADOS Y FUNCIONES =====

-- 46. Función para obtener recomendaciones personalizadas
-- (Nota: Sintaxis puede variar entre PostgreSQL y MySQL)

-- PostgreSQL version:
CREATE OR REPLACE FUNCTION obtener_recomendaciones(usuario_nombre VARCHAR)
RETURNS TABLE(titulo VARCHAR, tipo VARCHAR, genero VARCHAR, promedio_valoracion NUMERIC) AS $
BEGIN
    RETURN QUERY
    WITH generos_usuario AS (
        SELECT DISTINCT cg.genero
        FROM usuarios u
        INNER JOIN valoraciones v ON u.id = v.usuario_id
        INNER JOIN contenidos c ON v.contenido_id = c.id
        INNER JOIN contenido_generos cg ON c.id = cg.contenido_id
        WHERE u.nombre = usuario_nombre AND v.puntuacion >= 4
    )
    SELECT DISTINCT
        c.titulo,
        c.tipo,
        cg.genero,
        COALESCE(ROUND(AVG(v.puntuacion), 2), 0::NUMERIC) as promedio_valoracion
    FROM contenidos c
    INNER JOIN contenido_generos cg ON c.id = cg.contenido_id
    INNER JOIN generos_usuario gu ON cg.genero = gu.genero
    LEFT JOIN valoraciones v ON c.id = v.contenido_id
    LEFT JOIN valoraciones v_usuario ON c.id = v_usuario.contenido_id 
        AND v_usuario.usuario_id = (SELECT id FROM usuarios WHERE nombre = usuario_nombre)
    WHERE v_usuario.id IS NULL
    GROUP BY c.titulo, c.tipo, cg.genero
    ORDER BY AVG(v.puntuacion) DESC NULLS LAST;
END;
$ LANGUAGE plpgsql;

-- Usar la función:
-- SELECT * FROM obtener_recomendaciones('Juan Pérez');

-- ===== TRIGGERS Y AUTOMATIZACIÓN =====

-- 47. Trigger para actualizar timestamp de última actividad
ALTER TABLE usuarios ADD COLUMN ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- PostgreSQL trigger:
CREATE OR REPLACE FUNCTION actualizar_ultima_actividad()
RETURNS TRIGGER AS $
BEGIN
    UPDATE usuarios 
    SET ultima_actividad = CURRENT_TIMESTAMP 
    WHERE id = NEW.usuario_id;
    RETURN NEW;
END;
$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actividad_valoracion
    AFTER INSERT ON valoraciones
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_ultima_actividad();

-- ===== VISTAS MATERIALIZADAS PARA REPORTES =====

-- 48. Vista materializada para dashboard de métricas
CREATE MATERIALIZED VIEW IF NOT EXISTS dashboard_metricas AS
SELECT 
    (SELECT COUNT(*) FROM usuarios) as total_usuarios,
    (SELECT COUNT(*) FROM contenidos) as total_contenidos,
    (SELECT COUNT(*) FROM valoraciones) as total_valoraciones,
    (SELECT ROUND(AVG(puntuacion::NUMERIC), 2) FROM valoraciones) as promedio_valoraciones_global,
    (SELECT COUNT(DISTINCT usuario_id) FROM valoraciones) as usuarios_activos,
    (SELECT genero FROM contenido_generos GROUP BY genero ORDER BY COUNT(*) DESC LIMIT 1) as genero_mas_popular;

-- Para refrescar la vista:
-- REFRESH MATERIALIZED VIEW dashboard_metricas;

-- ===== CONSULTAS DE ANÁLISIS DE NEGOCIO =====

-- 49. Análisis de retención: Usuarios activos en últimos 30 días
SELECT 
    'Últimos 7 días' as periodo,
    COUNT(DISTINCT v.usuario_id) as usuarios_activos
FROM valoraciones v
WHERE v.fecha_valoracion >= CURRENT_DATE - INTERVAL '7 days'
UNION ALL
SELECT 
    'Últimos 30 días' as periodo,
    COUNT(DISTINCT v.usuario_id) as usuarios_activos
FROM valoraciones v
WHERE v.fecha_valoracion >= CURRENT_DATE - INTERVAL '30 days'
UNION ALL
SELECT 
    'Total registrados' as periodo,
    COUNT(*) as usuarios_activos
FROM usuarios;

-- 50. Análisis de contenido: Diversidad y cobertura
WITH stats AS (
    SELECT 
        COUNT(DISTINCT c.id) as total_contenidos,
        COUNT(DISTINCT cg.genero) as total_generos,
        COUNT(DISTINCT cr.actor) as total_actores,
        AVG(c.duracion_min) as duracion_promedio
    FROM contenidos c
    LEFT JOIN contenido_generos cg ON c.id = cg.contenido_id
    LEFT JOIN contenido_reparto cr ON c.id = cr.contenido_id
)
SELECT 
    'Diversidad de catálogo' as metrica,
    CONCAT(
        'Contenidos: ', total_contenidos, 
        ', Géneros: ', total_generos,
        ', Actores: ', total_actores,
        ', Duración prom: ', ROUND(duracion_promedio, 0), ' min'
    ) as valor
FROM stats;

-- ===== DIFERENCIAS ENTRE POSTGRESQL Y MYSQL =====

/*
DIFERENCIAS PRINCIPALES Y EJERCICIOS ESPECÍFICOS:

1. SERIAL vs AUTO_INCREMENT:
   - PostgreSQL: id SERIAL PRIMARY KEY
   - MySQL: id INT AUTO_INCREMENT PRIMARY KEY

2. Tipos de datos:
   - PostgreSQL: BOOLEAN, TEXT, NUMERIC
   - MySQL: TINYINT(1), LONGTEXT, DECIMAL

3. Casting:
   - PostgreSQL: puntuacion::NUMERIC
   - MySQL: CAST(puntuacion AS DECIMAL(3,2))

4. String aggregation:
   - PostgreSQL: STRING_AGG(campo, ', ')
   - MySQL: GROUP_CONCAT(campo SEPARATOR ', ')

5. Case insensitive search:
   - PostgreSQL: ILIKE
   - MySQL: LIKE (with COLLATE utf8_general_ci)

6. Date functions:
   - PostgreSQL: DATE_PART, EXTRACT, INTERVAL
   - MySQL: YEAR(), MONTH(), DATE_SUB()

7. Window functions:
   - PostgreSQL: Soporte completo
   - MySQL: Disponible desde 8.0

8. Procedimientos:
   - PostgreSQL: PL/pgSQL
   - MySQL: MySQL stored procedure syntax

9. Triggers:
   - PostgreSQL: Funciones separadas + triggers
   - MySQL: Triggers directos

10. Ver índices:
    - PostgreSQL: SELECT indexname FROM pg_indexes WHERE tablename = 'tabla';
    - MySQL: SHOW INDEX FROM tabla;

EJERCICIOS MYSQL ESPECÍFICOS:
*/

-- Versión MySQL para algunas consultas:
/*
-- Casting en MySQL:
SELECT 
    c.titulo,
    ROUND(AVG(CAST(v.puntuacion AS DECIMAL(3,2))), 2) as promedio
FROM contenidos c
INNER JOIN valoraciones v ON c.id = v.contenido_id
GROUP BY c.titulo;

-- String aggregation en MySQL:
SELECT 
    c.titulo,
    GROUP_CONCAT(DISTINCT cg.genero SEPARATOR ', ') as generos
FROM contenidos c
INNER JOIN contenido_generos cg ON c.id = cg.contenido_id
GROUP BY c.titulo;

-- Date functions en MySQL:
SELECT 
    YEAR(v.fecha_valoracion) as ano,
    MONTH(v.fecha_valoracion) as mes,
    COUNT(*) as valoraciones
FROM valoraciones v
GROUP BY YEAR(v.fecha_valoracion), MONTH(v.fecha_valoracion);
*/