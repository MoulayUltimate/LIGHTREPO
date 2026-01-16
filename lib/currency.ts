export type Currency = 'USD' | 'EUR' | 'GBP'

export const CURRENCY_CONFIG = {
    USD: { price: 69.72, originalPrice: 249.00, symbol: '$', label: 'USD' },
    EUR: { price: 57.72, originalPrice: 209.00, symbol: '€', label: 'EUR' },
    GBP: { price: 50.00, originalPrice: 179.00, symbol: '£', label: 'GBP' },
}

const EUROPE_COUNTRIES = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
    'CH', 'NO', 'IS', 'LI', 'AL', 'AD', 'AM', 'AZ', 'BY', 'BA', 'GE', 'MD', 'MC', 'ME', 'MK', 'RS', 'SM', 'UA', 'VA'
]

export function getCurrencyFromCountry(countryCode: string | null | undefined): Currency {
    if (!countryCode) return 'USD'
    const code = countryCode.toUpperCase()
    if (code === 'GB') return 'GBP'
    if (EUROPE_COUNTRIES.includes(code)) return 'EUR'
    return 'USD'
}
