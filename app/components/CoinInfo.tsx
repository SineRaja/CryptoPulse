import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import 'chart.js/auto'; // Ensure Chart.js auto-registration is imported for react-chartjs-2 to work correctly
import SelectButton from "./SelectButton"; // Ensure this is adapted to Tailwind CSS
import { chartDays } from "../config/data";
import { CryptoState } from "../contexts/CryptoContext";

interface Coin {
    id: string;
    // Add other properties here as needed, for example:
    name: string;
    image: {
      large: string;
    };
    market_data: {
      current_price: {
        [key: string]: number;
      };
      market_cap: {
        [key: string]: number;
      };
    };
    description: {
      en: string;
    };
    market_cap_rank: number;
  }


  
interface CoinInfoProps {
  coin: Coin;
}

const CoinInfo: React.FC<CoinInfoProps> = ({ coin }) => {
  const [historicData, setHistoricData] = useState<number[][]>([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [coin, days, currency]);

  return (
    <div className="flex flex-col items-center justify-center mt-6 p-10  w-full md:w-3/4">
      {!historicData.length || !flag ? (
        <div className="text-5xl text-yellow-500">Loading...</div> // Placeholder for loading state
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time = date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price (Past ${days} Days) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="flex mt-5 justify-around w-full">
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setFlag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
