"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { SingleCoin } from '../../../config/api';
import { CryptoState } from '../../../contexts/CryptoContext';
import CoinInfo from '../../../components/CoinInfo';
import Header from '../../Header';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: {
    large: string; // Updated to match the nested structure
  };
  description: {
    en: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      [key: string]: number;
    };
    market_cap: {
      [key: string]: number;
    };
  };
}

const CoinPage = () => {
  const pathname = usePathname();
  const segments = pathname.split('/'); // Split the pathname by '/'
  const id = segments.pop();
  const [coin, setCoin] = useState<Coin | null>(null);
  const { currency, symbol } = CryptoState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchCoin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!id) return; // Ensures id is not undefined
      const { data } = await axios.get(SingleCoin(id.toString()));
      setCoin(data);
    } catch (error) {
      setError('Error fetching coin details.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [id, currency]);

  if (!coin) return <div className="h-2 bg-yellow-400 w-full"></div>; // Loading state

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 p-6 bg-gray-800 text-white">
        <div className="w-full h-[82vh] md:w-1/3 flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-md overflow-hidden">
          {isLoading && (
            <div className="w-full bg-yellow-500" style={{ height: '2px' }}></div> // Tailwind does not have h-2 utility for width
          )}
          {error && (
            <div className="p-3 mb-5 bg-red-500 text-white text-center rounded">
              {error}
            </div>
          )}
          {!isLoading && !error && coin && (
            <>
              <img
                src={coin.image.large}
                alt={coin.name}
                className="w-40 h-40 mb-5 object-cover rounded-full shadow-lg" // Adjusted for a rounded image
              />
              <h3 className="text-xl font-bold mb-2 text-center break-words">
                {coin.name}
              </h3>
              <p className="text-sm text-gray-400 text-center px-2">
                {coin.description.en.split('. ')[0]}.
              </p>

              <div className="mt-4 flex flex-col w-full justify-center text-center">
                <div>
                  <span className="text-lg font-bold inline-flex items-center">
                    Rank: <span className="ml-2 text-yellow-500">{coin.market_cap_rank}</span>
                  </span>
                </div>
                <div>
                  <span className="text-lg font-bold ml-4 mt-2 md:mt-0">
                    Current Price: <span className="text-green-500">{symbol} {coin.market_data.current_price[currency.toLowerCase()]}</span>
                  </span>
                </div>
                <div>
                  <span className="text-lg font-bold ml-4 mt-2 md:mt-0">
                    Market Cap: <span className="text-blue-500">{symbol} {coin.market_data.market_cap[currency.toLowerCase()]}</span>
                  </span>
                </div>



              </div>

              {/* Additional coin data here */}
              {/* <CoinInfo coin={coin} /> */}
            </>
          )}
        </div>
        <div className="w-full md:w-2/3 p-4 bg-gray-700 rounded-lg shadow-md">
          <div className="w-full">
            {/* Assuming CoinInfo includes the chart */}
            <CoinInfo coin={coin} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinPage;
