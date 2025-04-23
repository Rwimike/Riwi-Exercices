numeros=(1,2,3,4,5,6,7,8,9,10)
print("veamos si tu nuemro esta en la lista")
jugador=int(input("ingrese el numero: "))
if jugador in numeros:
    print(f"el numero {jugador} esta en la lista")
else:
    print(f"el numero {jugador} no esta en la lista")