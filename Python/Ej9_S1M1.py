print("Quieres saber si el año es bisiesto")
anio=int(input("ingrese aqui el año"))

if anio.isnumeric():
    if (anio %4 == 0 and anio%100 !=0)or (anio%400==0):
        print("Es un año bisiesto")
    else:
        print("el año no es bisiesto") 
else:
    print("ingrese un caracter valido")