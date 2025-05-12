# Dictionary of products
products = {
    "manzanas": {"price": 1200.00, "units": 50},
    "pan": {"price": 800.00, "units": 30},
    "leche": {"price": 1500.00, "units": 20},
    "huevos": {"price": 2500.00, "units": 10},
    "arroz": {"price": 900.00, "units": 40},
    "pollo": {"price": 5000.00, "units": 15},
    "papel higiénico": {"price": 3000, "units": 25},
    "jugo": {"price": 2000.00, "units": 18},
    "queso": {"price": 4000.00, "units": 12},
    "cereal": {"price": 3500.00, "units": 8}
}
# List to record movements
movements_records = []
#Create a color for UX
DANGER = "\033[91m"
WARNING = "\033[93m"
SUCCESS = "\033[92m"
RESET = "\033[0m"
#
def record(action, product, detail):
    """
    take a recor of every movement.
    :param action: Acción realizada (Agregar, Actualizar, Eliminar).
    :param product: Nombre del producto afectado.
    :param detail: Detalles adicionales del movimiento.
    """
    movement = (action, product, detail)
    movements_records.append(movement)

def record_view():
    """
    show the record of movements
    """
    print("\nHistorial de movimientos:")
    if not movements_records:
        print("No hay movimientos registrados.")
    else:
        for idx, movements in enumerate(movements_records, start=1):
            action, product, detail = movements
            print(f"{idx}. Acción: {action}, Producto: {product}, Detalles: {detail}")

def products_view():
    """
    Show a every produc in the inventory.
    """
    print(SUCCESS+"Productos disponibles:"+RESET)
    for product, data_prod in products.items():
        print(f"{product}: Precio: {products[product]["price"]}, y hay: {products[product]["units"]} unidades")

def product_add():
    """
    Add new items to inventory.
    """
    while True:
        name = input("Ingrese el nombre del producto: ").lower()
        if name in products:
            print(WARNING+"El producto ya existe."+RESET)
        else:
                price = float(input("Ingrese el precio del producto: "))
                if price is None or price<=0:
                    print("ponga un valor valido")
                units = int(input("Ingrese la cantidad del producto: "))
                if units is None or units==0:
                    print("ponga un valor")
                products[name] = {"precio": price, "cantidad": units}
                print(f"Producto {name} agregado con éxito.")
                record("Agregar", name, f"Precio: {price:.2f}, Cantidad: {units}")

        add_more = input(WARNING+"¿Desea agregar otro producto? (si/no): "+RESET).lower()
        if add_more != "si":
            break

def uptd_product():
    """
    Uptdate a item from inventory.
    """
    while True:
        name = input("Ingrese el nombre del producto a actualizar: ").lower()
        if name in products:
            try:
                price = int(input("Ingrese el nuevo precio del producto: "))
                units = int(input("Ingrese la nueva cantidad del producto: "))
                products[name] = {"precio": price, "cantidad": units}
                print(f"Producto {name} actualizado con éxito.")
                record("Actualizar", name, f"Nuevo precio: {price}, Nueva cantidad: {units}")
            except ValueError:
                print("Por favor, ingrese valores válidos para precio y cantidad.")
        else:
            print("El producto no existe.")
            agg = input("¿Desea agregarlo? (si/no): ").lower()
            if agg == "si":
                product_add()
        uptd_more = input("¿Desea actualizar otro producto? (si/no): ").lower()
        if uptd_more != "si":
            break

def del_product():
    """
    Delete items by choise from inventory.
    """
    while True:
        name = input("Ingrese el nombre del producto a eliminar: ").lower()
        if name in products:
            del products[name]
            print(f"Producto {name} eliminado con éxito.")
            record("Eliminar", name, "Producto eliminado del inventario")
        else:
            print("El producto no existe.")
        del_more = input("¿Desea intentar con otro producto? (si/no): ").lower()
        if del_more != "si":
            break

def calc_total():
    """
    Calcula y muestra el valor total de los productos en el inventario.
    """
    calc = lambda price, units: price * units
    total = 0
    print(f"{'Producto':<20}\tPrie\tUnits\tSubtotal")
    for name, data in products.items():
        subtotal = calc(data["price"], data["units"])
        total += subtotal
        print(f"{name:<20}\t{data['price']}\t{data['units']}\t{subtotal}")
    print(f"\nValor total del inventario: ${total}")

def menu():
    """
    This is the main sistem.
    """
    while True:
        print("\nBienvenido al supermercado")
        print("1. Agregar productos")
        print("2. Actualizar productos")
        print("3. Eliminar productos")
        print("4. Ver productos")
        print("5. Ver historial de movimientos")
        print("6. Calcular valor total del inventario")
        print("7. Salir")
        try:
            option = int(input("Seleccione una opción: "))
            if option == 1:
                product_add()
            elif option == 2:
                uptd_product()
            elif option == 3:
                del_product()
            elif option == 4:
                products_view()
            elif option == 5:
                record_view()
            elif option == 6:
                calc_total()
            elif option == 7:
                print("Gracias por usar el sistema de supermercado.")
                break
            else:
                print("Opción no válida. Intente nuevamente.")
        except ValueError:
            print("Por favor, ingrese un número válido.")

# Ejecutar el menú principal
menu()
