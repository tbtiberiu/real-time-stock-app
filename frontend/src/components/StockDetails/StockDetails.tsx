import StockData from '../../types/StockData'
import StockChart from '../StockChart/StockChart'

interface StockDetailsProps {
  stock: StockData
}

const StockDetails: React.FC<StockDetailsProps> = ({ stock }) => {
  return (
    <div>
      <h2>{stock.symbol} Stock Data</h2>
      <p>Price: ${stock.price.toFixed(2)}</p>
      <p>Market Cap: {stock.marketCap}</p>
      <p>Volume: {stock.volume.toLocaleString()}</p>
      <StockChart stock={stock} />
    </div>
  )
}

export default StockDetails
