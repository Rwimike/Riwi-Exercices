from rich.console import Console
from rich.table import Table
from rich import box
from rich.text import Text

usuarios = {
    "1": {
        "nombre": "Daniel",
        "apellido": "Herrera",
        "contacto": {
            "correo": "garyford@gmail.com",
            "telefono": "001-512-801-0651x67779",
            "direccion": {
                "calle": "178 Walker Island Suite 840",
                "ciudad": "Gonzalezmouth",
                "estado": "Michigan",
                "codigo_postal": "92488",
                "pais": "Bermuda"
            }
        },
        "perfil": {
            "username": "bradley18",
            "fecha_nacimiento": "1987-07-15",
            "genero": "Masculino",
            "ocupacion": "Financial planner"
        },
        "redes_sociales": {
            "twitter": "https://twitter.com/mistytaylor",
            "linkedin": "https://linkedin.com/in/nancythomas",
            "instagram": ""
        },
        "preferencias": {
            "idioma": "Francés",
            "newsletter": True,
            "temas_interes": ["arte", "moda", "tecnología"]
        }
    },
    "2": {
        "nombre": "Joseph",
        "apellido": "Sullivan",
        "contacto": {
            "correo": "grussell@hotmail.com",
            "telefono": "006-305-4158x3659",
            "direccion": {
                "calle": "9638 Hawkins Crossing Apt. 914",
                "ciudad": "Robertchester",
                "estado": "Illinois",
                "codigo_postal": "28682",
                "pais": "Ethiopia"
            }
        },
        "perfil": {
            "username": "kennethtaylor",
            "fecha_nacimiento": "1981-03-26",
            "genero": "Otro",
            "ocupacion": "Clinical psychologist"
        },
        "redes_sociales": {
            "twitter": "https://twitter.com/claire15",
            "linkedin": "",
            "instagram": "https://instagram.com/kellycooper"
        },
        "preferencias": {
            "idioma": "Francés",
            "newsletter": False,
            "temas_interes": ["deportes", "arte", "viajes"]
        }
    },
    "3": {
        "nombre": "Kristina",
        "apellido": "Bradley",
        "contacto": {
            "correo": "mark58@hotmail.com",
            "telefono": "771-464-1767",
            "direccion": {
                "calle": "9396 Martin Bridge Apt. 544",
                "ciudad": "South Ryan",
                "estado": "Iowa",
                "codigo_postal": "41958",
                "pais": "Philippines"
            }
        },
        "perfil": {
            "username": "christine51",
            "fecha_nacimiento": "1966-09-21",
            "genero": "Femenino",
            "ocupacion": "Restaurant manager, fast food"
        },
        "redes_sociales": {
            "twitter": "https://twitter.com/dickersonjustin",
            "linkedin": "https://linkedin.com/in/michaela78",
            "instagram": ""
        },
        "preferencias": {
            "idioma": "Español",
            "newsletter": True,
            "temas_interes": ["cocina", "tecnología", "viajes"]
        }
    },
    "4": {
        "nombre": "Monica",
        "apellido": "Molina",
        "contacto": {
            "correo": "daniel59@yahoo.com",
            "telefono": "(925)185-9544x03157",
            "direccion": {
                "calle": "53484 Garrett Wall",
                "ciudad": "East Sherri",
                "estado": "Washington",
                "codigo_postal": "81748",
                "pais": "Syrian Arab Republic"
            }
        },
        "perfil": {
            "username": "kayla97",
            "fecha_nacimiento": "1987-11-19",
            "genero": "Femenino",
            "ocupacion": "Company secretary"
        },
        "redes_sociales": {
            "twitter": "https://twitter.com/rgomez",
            "linkedin": "",
            "instagram": "https://instagram.com/sarah44"
        },
        "preferencias": {
            "idioma": "Español",
            "newsletter": True,
            "temas_interes": ["viajes", "deportes", "tecnología"]
        }
    },
    "5": {
        "nombre": "Angela",
        "apellido": "House",
        "contacto": {
            "correo": "pwaters@dixon.biz",
            "telefono": "(616)639-1141",
            "direccion": {
                "calle": "8264 Morgan Lights",
                "ciudad": "Dianetown",
                "estado": "North Dakota",
                "codigo_postal": "64546",
                "pais": "Bolivia"
            }
        },
        "perfil": {
            "username": "randy13",
            "fecha_nacimiento": "2006-02-20",
            "genero": "Masculino",
            "ocupacion": "Airline pilot"
        },
        "redes_sociales": {
            "twitter": "",
            "linkedin": "https://linkedin.com/in/watkinsjessica",
            "instagram": "https://instagram.com/longlaura"
        },
        "preferencias": {
            "idioma": "Inglés",
            "newsletter": False,
            "temas_interes": ["moda", "arte", "cocina"]
        }
    }
}

def impresion():
    console = Console()
    
    while True:
        console.print("\n¿De qué usuario quieres imprimir sus datos?", style="bold")
        console.print("1) Daniel Herrera")
        console.print("2) Joseph Sullivan")
        console.print("3) Kristina Bradley")
        console.print("4) Monica Molina")
        console.print("5) Angela House")
        console.print("6) Salir")

        try:
            opcion = input("Ingrese una opción (1-6): ")
            
            if opcion == "6":
                console.print("Saliendo...", style="bold green")
                break

            if opcion not in ["1", "2", "3", "4", "5"]:
                console.print("Opción no válida. Intenta con un número del 1 al 5.", style="red")
                continue

            usuario = usuarios[opcion]

            def formatear_dato(valor, nombre_dato="Dato"):
                return valor if valor else Text(f"{nombre_dato} no disponible", style="red")

            # Crear tabla
            table = Table(title=f"Datos de {usuario['nombre']} {usuario['apellido']}", box=box.ROUNDED)
            table.add_column("Campo", style="cyan", no_wrap=True)
            table.add_column("Valor", style="magenta")

            # Preparar datos para la tabla
            datos = [
                ["Nombre", f"{usuario['nombre']} {usuario['apellido']}"],
                ["Correo", formatear_dato(usuario['contacto']['correo'], "Correo")],
                ["Teléfono", formatear_dato(usuario['contacto']['telefono'], "Teléfono")],
                ["Dirección", formatear_dato(
                    f"{usuario['contacto']['direccion']['calle']}, "
                    f"{usuario['contacto']['direccion']['ciudad']}, "
                    f"{usuario['contacto']['direccion']['estado']}, "
                    f"{usuario['contacto']['direccion']['codigo_postal']}, "
                    f"{usuario['contacto']['direccion']['pais']}", "Dirección"
                )],
                ["Username", formatear_dato(usuario['perfil']['username'], "Username")],
                ["Fecha de nacimiento", formatear_dato(usuario['perfil']['fecha_nacimiento'], "Fecha de nacimiento")],
                ["Género", formatear_dato(usuario['perfil']['genero'], "Género")],
                ["Ocupación", formatear_dato(usuario['perfil']['ocupacion'], "Ocupación")],
                ["Twitter", formatear_dato(usuario['redes_sociales']['twitter'], "Twitter")],
                ["LinkedIn", formatear_dato(usuario['redes_sociales']['linkedin'], "LinkedIn")],
                ["Instagram", formatear_dato(usuario['redes_sociales']['instagram'], "Instagram")],
                ["Idioma", formatear_dato(usuario['preferencias']['idioma'], "Idioma")],
                ["Newsletter", "Sí" if usuario['preferencias']['newsletter'] else "No"],
                ["Temas de interés", formatear_dato(", ".join(usuario['preferencias']['temas_interes']), "Temas de interés")]
            ]

            # Agregar datos a la tabla
            for campo, valor in datos:
                table.add_row(campo, valor)

            # Imprimir tabla
            console.print(table)

        except KeyboardInterrupt:
            console.print("\nPrograma terminado por el usuario.", style="bold yellow")
            break
        except Exception as e:
            console.print(f"Error: {e}. Por favor, intenta de nuevo.", style="bold red")

if __name__ == "__main__":
    impresion()
