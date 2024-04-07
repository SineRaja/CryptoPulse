import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../contexts/CryptoContext";
import Image from 'next/image';
import Link from 'next/link';

interface Coin {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    image: string;
}


function numberWithCommas(x: number | string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export default function CoinsTable() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const { currency, symbol } = CryptoState();
    const [error, setError] = useState<string | null>(null);


    const fetchCoins = async () => {
        setLoading(true);
        setError(null);

        try {
            // Attempt to get data from localStorage
            const cachedData = localStorage.getItem('coinList');
            if (cachedData) {
                setCoins(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            // Fetch from API if not cached
            const { data } = await axios.get(CoinList(currency));
            setCoins(data);
            localStorage.setItem('coinList', JSON.stringify(data)); // Cache the response
        } catch (error) {
            setError('Error fetching coin data. Please try again.'); // More informative error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const handleSearch = () => {
        return coins.filter(
            (coin) => coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    };
      

    return (
        <div className="text-center p-5 w-[100%] bg-black text-white">
            <h2 className="text-4xl font-bold my-6">
                Cryptocurrency Prices by Market Cap
            </h2>
            <input
                type="text"
                placeholder="Search For a Crypto Currency..."
                className="mb-5 p-2 text-base border border-gray-400 rounded outline-none w-[60%]"
                onChange={(e) => setSearch(e.target.value)}
            />
            {loading ? (
                <div className="h-2 bg-yellow-400"></div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-[95%] m-8">
                        <thead className="bg-yellow-500 text-black">
                            <tr>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <th key={head} className="px-4 py-2">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;
                                    return (
                                        <tr key={row.name} className="cursor-pointer bg-[#16171a] hover:bg-[#131111] text-white">
                                            <Link href={`components/CoinPage/${row.id}`} key={row.id} passHref>
                                                <td className="flex items-center gap-4 p-4">
                                                    <Image src={row.image} alt={row.name} width="50" height="50" />
                                                    <div>
                                                        <span className="uppercase font-bold">{row.symbol}</span>
                                                        <span className="block text-gray-400">{row.name}</span>
                                                    </div>
                                                </td>
                                            </Link>
                                            <td className="text-right pr-4">{symbol} {numberWithCommas(row.current_price.toFixed(2))}</td>
                                            <td className={`text-right pr-4 ${profit ? 'text-green-500' : 'text-red-500'}`}>
                                                {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                                            </td>
                                            <td className="text-right pr-4">{symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="flex justify-center mt-8">
                <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded ml-2"
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
