export const moneyFormat = (value: any) => {
	if (isNaN(parseFloat(value))) value = 0.0;
    const currency = `${value < 0 ? '-' : ''}Rp`; 
	return currency + String(
		new Intl.NumberFormat('id-ID').format(parseFloat(value < 0 ? value * -1 : value))
	);
};