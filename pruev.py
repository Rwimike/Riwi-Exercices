lista=["miguel","lopera",19,"correo@mail.com"]
print("Hola usuario quieres ver los datos?")
print("Qué dato buscas")
dato =input("Ingresa el dato que deseas buscar: ")
encontrado = False
for i in range(len(lista)):
    for j in range(len(lista[i])):
        if lista[i][j] == dato:
            print(f"Encontrado en la sublista {i}, posición {j}")
            encontrado = True
if not encontrado:
    print("El valor no está en la lista.")
