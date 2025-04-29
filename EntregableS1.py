#limitadores en el algoritmo 
def validacion(prompt, minimo=0, maximo=None, tipo=float):
    while True:
        try:
            valor = tipo(input(prompt))
            if valor < minimo or (maximo is not None and valor > maximo):
                raise ValueError
            return valor
        except ValueError:
            print(f"Ingrese un número válido ({tipo.__name__}) entre {minimo} y {maximo if maximo is not None else '∞'}")

def nombre_valido(nombre):
    return all(c.isalnum() or c.isspace() for c in nombre)
#definir sistema
def sistema():
    productos = []

    print("=== Bienvenido al sistema ===")
    while True:
        # Validar nombre
        while True:
            nom_prod = input("Ingrese el nombre del producto: ")
            if nombre_valido(nom_prod):
                break
            else:
                print("El nombre solo puede tener letras, números y espacios.")

        precio = validacion(f"Precio de {nom_prod}: $", minimo=0.01, tipo=float)
        cantidad = validacion(f"¿Cuántos {nom_prod} vas a llevar?: ", minimo=1, tipo=int)
        descuento = validacion(f"Descuento para {nom_prod} (% entre 0 y 100): ", minimo=0, maximo=100, tipo=float)

        productos.append([nom_prod, precio, cantidad, descuento])

        seguir = input("¿Desea continuar agregando productos? (S/N): ").lower()
        if seguir != "s":
            break

    # Imprimir tabla
    print("\n=== Recibo de compra ===")

    # Encabezado de la tabla
    print("+----------------------+------------------+-----------+---------------+--------------+----------------+")
    print("| Producto             | Precio unitario  | Cantidad  | Subtotal      | Descuento %  | Total c/desc.   |")
    print("+----------------------+------------------+-----------+---------------+--------------+----------------+")

    total_general = 0

    for producto in productos:
        nombre, precio, cantidad, descuento = producto
        subtotal = precio * cantidad
        total_con_descuento = subtotal * (1 - descuento/100)
        total_general += total_con_descuento

        print(f"| {nombre:<20} | ${precio:<13.2f} | {cantidad:<9} | ${subtotal:<13.2f} | {descuento:<12.2f} | ${total_con_descuento:<14.2f} |")

    print("+----------------------+------------------+-----------+---------------+--------------+----------------+")
    print(f"| {'Total a pagar':<82} | ${total_general:<14f} |")
    print("+-----------------------------------------------------------------------------------------------------+")

# Ejecutar el sistema
sistema()