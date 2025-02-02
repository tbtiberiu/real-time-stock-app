import { Line } from 'react-chartjs-2'
import StockData from '../../types/StockData'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface StockChartProps {
  stock: StockData
}

const StockChart: React.FC<StockChartProps> = ({ stock }) => {
  const chartData = {
    labels: stock.history.map((entry) =>
      new Date(entry.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: `${stock.symbol} Price`,
        data: stock.history.map((entry) => entry.price),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  }

  return <Line data={chartData} />
}

export default StockChart
