"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type CryptoContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  symbol: string;
};

const Crypto = createContext<CryptoContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const CryptoProvider: React.FC<Props> = ({ children }) => {
    const [currency, setCurrency] = useState("GBP");
    const [symbol, setSymbol] = useState("£");
  
    useEffect(() => {
    switch (currency) {
      case "USD":
        setSymbol("$");
        break;
      case "GBP":
        setSymbol("£");
        break;
      default:
        setSymbol("");
    }
}, [currency]);

return (
  <Crypto.Provider value={{ currency, setCurrency, symbol }}>
    {children}
  </Crypto.Provider>
);
};

export default CryptoContextType;

export const CryptoState = (): CryptoContextType => {
    const context = useContext(Crypto);
    if (context === undefined) {
      throw new Error('CryptoState must be used within a CryptoProvider');
    }
    return context;
  };