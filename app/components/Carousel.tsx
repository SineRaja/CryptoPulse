import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import Link from 'next/link';
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../contexts/CryptoContext";
import 'react-alice-carousel/lib/alice-carousel.css';

interface Coin {
    id: string;
    image: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
}

function numberWithCommas(x: number | string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState<Coin[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Attempt to get data from localStorage
            const cachedData = localStorage.getItem('trendingCoins');
            if (cachedData) {
                setTrending(JSON.parse(cachedData));
                setIsLoading(false);
                return;
            }

            // Fetch from API if not cached
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
            localStorage.setItem('trendingCoins', JSON.stringify(data)); // Cache the response
        } catch (error) {
            setError('Error fetching trending coins. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link href={`components/CoinPage/${coin.id}`} key={coin.id} passHref>
                <div className="flex flex-col items-center cursor-pointer uppercase text-white p-4 mt-16 pt-16">
                    <img
                        src={coin.image}
                        alt={coin.name}
                        style={{ maxWidth: '80px', maxHeight: '80px' }}
                        className="mb-2"
                    />
                    <span>
                        {coin.symbol}
                        &nbsp;
                        <span className={`font-semibold ${profit ? 'text-green-500' : 'text-red-500'}`}>
                            {profit && "+"}{coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </span>
                    <span className="text-lg font-semibold">
                        {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                    </span>
                </div>
            </Link>
        );
    });

    return (
        <div className="flex items-center overflow-hidden">
            {isLoading ? (
                <div className="text-yellow-400">Loading...</div> // Simple loading indicator
            ) : error ? (
                <div className="text-red-500">{error}</div> // Error message
            ) : (
                <AliceCarousel
                    mouseTracking
                    infinite
                    autoPlayInterval={1000}
                    animationDuration={1500}
                    disableDotsControls
                    disableButtonsControls
                    responsive={{
                        0: { items: 2 },
                        512: { items: 4 },
                    }}
                    items={items}
                    autoPlay
                />
            )}
        </div>
    );
};

export default Carousel;
