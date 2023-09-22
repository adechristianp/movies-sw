
export const moneyFormat = (value: any) => {
	if (isNaN(parseFloat(value))) value = 0.0;
	return 'Rp' + String(
		new Intl.NumberFormat( 'id-ID').format(parseFloat(value))
	);
};