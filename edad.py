seguir = True
while seguir: 
   
    edad=int(input("pon tu edad: "))
    if edad>0 and edad <18:
        print("menor de edad ")
        seguir = False
    elif edad>=18:
        print("Eres mayor de edad")
        seguir= False
    else:
        print("ingrese un valor valido")
    
