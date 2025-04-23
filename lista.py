numeros=[]
print("hola veamos cual es menor de tres elementos")
for i in range(3):
    num=int(input(f"ingrese el numero {i+1}: "))
    numeros.append(num)

a=numeros[0]
b=numeros[1]
c=numeros[2]
print(f"los numeros son {a}, {b}, {c}")
if a<b and a<c:
    print(f"el menor es {a}")
elif b<a and b<c:
    print(f"el menor es {b}")
elif c<a and c<b:
    print(f"el menor es {c}")
else:
    print("hay numeros iguales")

