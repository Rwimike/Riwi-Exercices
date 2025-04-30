def validacion(prompt, minimo=0, maximo=None, tipo=float):
	while True:
		try:
			valor = tipo(input(prompt))
			if valor < minimo or (maximo is not None and valor > maximo):
				raise ValueError
			return valor
		except ValueError:
			print(f"Ingrese un número válido ({tipo.__name__}) entre {minimo} y {maximo if maximo is not None else '∞'}")