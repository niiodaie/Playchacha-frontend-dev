import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

const SUPPORTED_CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', code: 'USD' },
  EUR: { symbol: '€', name: 'Euro', code: 'EUR' },
  GBP: { symbol: '£', name: 'British Pound', code: 'GBP' },
  JPY: { symbol: '¥', name: 'Japanese Yen', code: 'JPY' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', code: 'CAD' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', code: 'AUD' },
  CHF: { symbol: 'Fr', name: 'Swiss Franc', code: 'CHF' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', code: 'CNY' },
  BTC: { symbol: '₿', name: 'Bitcoin', code: 'BTC' },
  ETH: { symbol: 'Ξ', name: 'Ethereum', code: 'ETH' },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored currency preference
    const storedCurrency = localStorage.getItem('currency');
    if (storedCurrency && SUPPORTED_CURRENCIES[storedCurrency]) {
      setCurrency(storedCurrency);
    } else {
      // Detect currency based on user location
      detectUserCurrency();
    }
    
    // Fetch exchange rates
    fetchExchangeRates();
  }, []);

  const detectUserCurrency = async () => {
    try {
      // This would typically use a geolocation service
      const response = await fetch('/api/location/detect');
      if (response.ok) {
        const data = await response.json();
        const detectedCurrency = data.currency;
        if (SUPPORTED_CURRENCIES[detectedCurrency]) {
          setCurrency(detectedCurrency);
          localStorage.setItem('currency', detectedCurrency);
        }
      }
    } catch (error) {
      console.error('Error detecting user currency:', error);
    }
  };

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/currency/rates');
      if (response.ok) {
        const rates = await response.json();
        setExchangeRates(rates);
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeCurrency = (newCurrency) => {
    if (SUPPORTED_CURRENCIES[newCurrency]) {
      setCurrency(newCurrency);
      localStorage.setItem('currency', newCurrency);
    }
  };

  const formatAmount = (amount, currencyCode = currency) => {
    const currencyInfo = SUPPORTED_CURRENCIES[currencyCode];
    if (!currencyInfo) return amount.toString();

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'BTC' || currencyCode === 'ETH' ? 6 : 2,
      maximumFractionDigits: currencyCode === 'BTC' || currencyCode === 'ETH' ? 6 : 2,
    });

    return formatter.format(amount);
  };

  const convertAmount = (amount, fromCurrency, toCurrency = currency) => {
    if (fromCurrency === toCurrency) return amount;
    
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    
    return (amount / fromRate) * toRate;
  };

  const value = {
    currency,
    currencies: SUPPORTED_CURRENCIES,
    exchangeRates,
    isLoading,
    changeCurrency,
    formatAmount,
    convertAmount,
    getCurrentCurrency: () => SUPPORTED_CURRENCIES[currency],
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

