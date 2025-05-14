print("Ingresa un numero")
numero = input(":")

if numero.isnumeric():
  numero = int(numero)
  if 1 <= numero <= 10:
      print("El número está dentro del rango entre 1-10")
  else:
    print("El número está fuera del rango entre 1-10")
else:
  print("Ingresa un caracter/numero valido")
