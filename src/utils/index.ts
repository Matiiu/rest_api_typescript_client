export function formatCurrency(price: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
}

export function toBoolean(str: string) {
	return str.toLowerCase() === 'true';
}
