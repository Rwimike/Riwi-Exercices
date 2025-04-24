lista=[]
cont=True
proceso=True
id_actual=1
def agregacion():
    global id_actual
    print("hola querido ususario")
    print("necisitamos tus datos para inciar")
    while cont:
        Nom=input("Nombre: ")
        ape=input("Apellido: ")
        cor=input("Correo: ")
        edad=int(input("Edad: "))
        lista.append([id_actual,Nom,ape,cor,edad])
        id_actual+=1
        valor=input("ingrese S o N para continuar o cerrrar: ")
        if valor=="N"or valor=="n":
            cont=False
def lectura():
    print("Hola usuario quieres ver los datos?")
    print("Qué dato buscas")
    dato =input("Ingresa el dato que deseas buscar: ")

    for i in range(len(lista)):
        for j in range(len(lista[i])):
            if str(lista[i][j]).lower() == dato.lower():
                print("f\nDato encotrado en la sublista{i},posicion{j}")
                print(f"Datos al completo:{lista[i]}")
                return
    print("\ndato no encontrado")

