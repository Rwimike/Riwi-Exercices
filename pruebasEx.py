ratings = []
id = 1

# Diccionario con materias y cantidad de notas
materias_config = {
    "matemática": 6,
    "filosofía": 4,
    "historia": 5,
    "ciencias": 3
}

def validacion(prompt, minimo=0, maximo=None, tipo=float):
    while True:
        try:
            valor = tipo(input(prompt))
            if valor < minimo or (maximo is not None and valor > maximo):
                raise ValueError
            return valor
        except ValueError:
            print(f"Ingrese un número válido ({tipo.__name__}) entre {minimo} y {maximo if maximo is not None else '∞'}")

def creation():
    global id
    print("Vamos a registrar un estudiante y sus notas.")
    
    nombre = input("Nombre del estudiante: ")
    materia = input("Materia del estudiante: ").strip().lower()
    
    if materia not in materias_config:
        print("Materia no registrada. Agregándola al sistema...")
        cantidad = validacion(f"¿Cuántas notas debe tener {materia}? ", minimo=1, tipo=int)
        materias_config[materia] = cantidad
    
    notas = []
    for i in range(materias_config[materia]):
        nota = validacion(f"Ingrese la nota {i+1} para {materia}: ", minimo=0.0, tipo=float)
        notas.append(nota)

    ratings.append([id, nombre, materia, notas])
    id += 1
    print(f"\nEstudiante: {nombre} | Materia: {materia.capitalize()} | Notas: {notas}\n")

# Ejemplo de uso
creation()
print("Base de datos:", ratings)