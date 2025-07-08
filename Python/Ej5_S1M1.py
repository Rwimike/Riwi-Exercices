print("hola ingrese valor de la cuenta ")
print("")
v=float(input(":"))
print("cuanto desea el comensal dejar de propina: 10%, 15%, 20%")
Key=float(input(":"))
if Key==10:
    result = v * (Key/100)+v
    print(result)
elif Key==15:
    result = v * (Key/100)+v
    print(result)
elif Key==20:
    result = v * (Key/100)+v
    print(result)
else: 
    print("numero equivoco")