import React from 'react'
import StockData from '../../types/StockData'

interface StocksTableProps {
  stocksData: { [key: string]: StockData }
}

const StocksTable: React.FC<StocksTableProps> = ({ stocksData }) => {
  console.log(stocksData)

  return (
    <div>
      <h2>All Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stocksData).map((symbol) => {
            const stock = stocksData[symbol]
            const lastPrice =
              stock.history.length > 0
                ? stock.history[stock.history.length - 2].price
                : stock.price
            const priceColor =
              stock.price > lastPrice
                ? 'rgba(0, 204, 0, 1)'
                : stock.price < lastPrice
                ? 'rgba(204, 0, 0, 1)'
                : '#ffffffde'

            return (
              <tr key={symbol}>
                <td>{symbol}</td>
                <td style={{ color: priceColor }}>${stock.price.toFixed(2)}</td>
                <td>{stock.marketCap.toLocaleString()}</td>
                <td>{stock.volume.toLocaleString()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StocksTable
