print("a ver gorda hp diga su peso en kg y su altura en Mt ")
peso=float(input("peso:"))
altura=float(input("peso:"))
imc=peso/(altura**2)
if imc <= 18.4:
    print("estas en bajo peso")
elif imc>=18.5 or imc<=24.9:
    print("estas en tu peso ideal")
elif imc>=25.0 or imc<=29.9:
    print("estas en sobrepeso cuidado")
elif imc>=30.0:
    print("te encuentras en obesidad mucho cuidado")