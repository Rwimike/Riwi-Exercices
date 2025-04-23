lista=[]
cont=True
proceso=True
print("Bienvenido a la base de datos")
while proceso=True:
    key=int(input("ingrese una de las opciones"))
    if key == 1:
        print("hola querido ususario")
        print("necisitamos tus datos para inciar")
        while cont:

            Nom=input("Nombre: ")
            ape=input("Apellido: ")
            cor=input("Correo: ")
            edad=int(input("Edad: "))
            lista.append([Nom,ape,cor,edad])
            valor=input("ingrese S o N para continuar o cerrrar: ")
            if valor=="N"or valor=="n":
                cont=False

    elif key==2:
        

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



    elif key ==3:
        print("Hola usario qué dato vas a eliminar")
    elif key==4:
        print("Hola usuario que dato buscas reemplazar")