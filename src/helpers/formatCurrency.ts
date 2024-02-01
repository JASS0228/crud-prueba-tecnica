// Formatea un número a moneda mexicana
export const formatCurrency = (value: number) => {
	return new Intl.NumberFormat('es-MX', {
		style: 'currency',
		currency: 'MXN',
	}).format(value)
}
