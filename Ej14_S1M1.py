edad = input("Ingresa tu edad: ")
if edad.isnumeric():
    edad = int(edad)
    if 0 <=edad <= 120:
        print("Es una edad validad.")
    else:
        print("No es una edad valida.")
else:
    print("Ingrese un caracter valido.")