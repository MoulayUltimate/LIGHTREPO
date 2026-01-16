"use client"

import React, { createContext, useContext, useState } from 'react'
import { Currency, CURRENCY_CONFIG } from '@/lib/currency'

interface CurrencyContextType {
    currency: Currency
    price: number
    originalPrice: number
    symbol: string
    label: string
    setCurrency: (c: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({
    children,
    initialCurrency
}: {
    children: React.ReactNode
    initialCurrency: Currency
}) {
    const [currency, setCurrency] = useState<Currency>(initialCurrency)

    const config = CURRENCY_CONFIG[currency]

    return (
        <CurrencyContext.Provider value={{
            currency,
            price: config.price,
            originalPrice: config.originalPrice,
            symbol: config.symbol,
            label: config.label,
            setCurrency
        }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export function useCurrency() {
    const context = useContext(CurrencyContext)
    if (!context) throw new Error('useCurrency must be used within CurrencyProvider')
    return context
}
