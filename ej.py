ratings=[]
from funciones import validacion
id=1
subj_config={
	"matematicas":6,
	"filosofia":4,
	"ciencias":6,
	"historia":5,
	"caterdra":2
}
validacion()
def creation():
		global id
		print("Hola vamos a ingresar el nombre y las notas del estudiante")
		
		ingre=str(input("Nombre del estudiante: "))
		rating=[]
		while True:
			print("agregue las notas del estudiante")
			r1=validacion(f"ingrese las notas de ",ingre,": ",minimo=0.00, tipo=float)
			rating.append(r1)
			ask=str(input("ingrese si desea poner más notas (S/N)")).lower()
			if ask!="s":
				break
		ratings.append([id,ingre,r1])
  
def ingres():
	print("==-=="*10)
	print("==Hola un dia más usuario seleccione que va utilizar==")
	print("==-=="*10)
 
	op=int(int("ingrese un numero para acceder a la funcion"))
	print("1.Agregar notas del estudiante")
	print("2.Promediar las notas del estudiante")
	print("3.Agregar lista de promedios por salon")
	print("4.lista de promedios por salon")

	if op ==1:
   		print("")