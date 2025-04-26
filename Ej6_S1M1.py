import os
print("inteta adivinar el numero")
Player=int(input("ingrese el valor que crees: "))
import random
numero=int(random.uniform(1,10))
if numero==Player:
    print("felicidades GANASTE")
elif numero<=Player:
    print("Te pasaste")
elif numero>=Player:
    print("Te falta poco")
print("este era el numero",numero)