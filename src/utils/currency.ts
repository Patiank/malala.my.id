/**
 * Autonomous Multi-Currency Converter for International Tourists
 * Fetches real-time exchange rates and formats prices in IDR, MYR, SGD, USD, EUR, AUD.
 */

export type CurrencyCode = 'IDR' | 'MYR' | 'SGD' | 'USD' | 'EUR' | 'AUD';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rateFromIdr: number; // 1 IDR = X Currency
}

export const DEFAULT_RATES: Record<CurrencyCode, CurrencyRate> = {
  IDR: { code: 'IDR', symbol: 'Rp', name: 'Rupiah Indonesia', flag: '🇮🇩', rateFromIdr: 1 },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Ringgit Malaysia', flag: '🇲🇾', rateFromIdr: 0.00028 },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', rateFromIdr: 0.000084 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rateFromIdr: 0.000062 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rateFromIdr: 0.000059 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rateFromIdr: 0.000095 },
};

let cachedRates = { ...DEFAULT_RATES };
let lastFetch = 0;

export async function fetchLiveExchangeRates(): Promise<Record<CurrencyCode, CurrencyRate>> {
  const now = Date.now();
  if (now - lastFetch < 60 * 60 * 1000) {
    return cachedRates;
  }

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/IDR', { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates) {
        const rates = data.rates;
        cachedRates = {
          IDR: { ...DEFAULT_RATES.IDR, rateFromIdr: 1 },
          MYR: { ...DEFAULT_RATES.MYR, rateFromIdr: rates.MYR || DEFAULT_RATES.MYR.rateFromIdr },
          SGD: { ...DEFAULT_RATES.SGD, rateFromIdr: rates.SGD || DEFAULT_RATES.SGD.rateFromIdr },
          USD: { ...DEFAULT_RATES.USD, rateFromIdr: rates.USD || DEFAULT_RATES.USD.rateFromIdr },
          EUR: { ...DEFAULT_RATES.EUR, rateFromIdr: rates.EUR || DEFAULT_RATES.EUR.rateFromIdr },
          AUD: { ...DEFAULT_RATES.AUD, rateFromIdr: rates.AUD || DEFAULT_RATES.AUD.rateFromIdr },
        };
        lastFetch = now;
      }
    }
  } catch (e) {
    console.warn('Using fallback currency exchange rates:', e);
  }

  return cachedRates;
}

/**
 * Parses numeric price from a string like "Rp 120.000 - Rp 180.000" or "Rp 150.000"
 */
export function extractIdrNumbers(priceStr: string): number[] {
  if (!priceStr) return [];
  const matches = priceStr.match(/\d[\d.,]*/g);
  if (!matches) return [];
  return matches.map(m => parseInt(m.replace(/[.,]/g, ''), 10)).filter(n => !isNaN(n) && n > 0);
}

/**
 * Converts price string or number to target currency
 */
export function formatToCurrency(
  idrAmount: number | string,
  targetCurrency: CurrencyCode = 'IDR',
  rates: Record<CurrencyCode, CurrencyRate> = cachedRates
): string {
  const rateInfo = rates[targetCurrency] || DEFAULT_RATES[targetCurrency] || DEFAULT_RATES.IDR;

  if (typeof idrAmount === 'number') {
    if (targetCurrency === 'IDR') {
      return `Rp ${idrAmount.toLocaleString('id-ID')}`;
    }
    const converted = idrAmount * rateInfo.rateFromIdr;
    return `${rateInfo.symbol} ${converted.toFixed(2)}`;
  }

  // If input is a range string like "Rp 120.000 - Rp 180.000"
  const numbers = extractIdrNumbers(idrAmount);
  if (numbers.length === 0) return idrAmount;

  if (targetCurrency === 'IDR') {
    if (numbers.length === 1) return `Rp ${numbers[0].toLocaleString('id-ID')}`;
    return `Rp ${numbers[0].toLocaleString('id-ID')} – Rp ${numbers[1].toLocaleString('id-ID')}`;
  }

  const convertedNums = numbers.map(n => (n * rateInfo.rateFromIdr).toFixed(2));
  if (convertedNums.length === 1) {
    return `${rateInfo.symbol} ${convertedNums[0]}`;
  }
  return `${rateInfo.symbol} ${convertedNums[0]} – ${rateInfo.symbol} ${convertedNums[1]}`;
}
