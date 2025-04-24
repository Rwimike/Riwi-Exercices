lista=[]
cont=True
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