print("a ver gorda hp diga su peso en kg y su altura en Mt ")
peso=float(input("peso:"))
altura=float(input("peso:"))
imc=peso/(altura**2)
if imc <= 18.5:
    print("estas en bajo peso")