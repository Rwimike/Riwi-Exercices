lista_invitados = [
    "maría", "carlos", "sofia",
    "samuel", "tomás", "esteban", "sebastián", "sara",
    "valeria", "isabela", "camila", "verónica",
    "adriana", "miguel", "jorge", "natalia"
]

nombre = input("Ingresa tu nombre: ").lower()

if nombre in lista_invitados:
    print("Estás en la lista de invitados. ¡Eres bienvenido!")
else:
    print("No estás en la lista de invitados. ¡No eres bienvenido!")