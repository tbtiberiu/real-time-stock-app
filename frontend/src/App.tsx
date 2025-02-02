import './App.css'
import { useEffect, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import SearchBar from './components/SearchBar/SearchBar'
import StockData from './types/StockData'
import StockDetails from './components/StockDetails/StockDetails'
import StocksTable from './components/StocksTable/StocksTable'

const useSocket = (onData: (data: { [key: string]: StockData }) => void) => {
  useEffect(() => {
    const socket: Socket = io('http://localhost:5000')

    socket.emit('subscribeToStocks')

    socket.on('stocksUpdate', onData)

    return () => {
      socket.disconnect()
    }
  }, [onData])
}

const App = () => {
  const [symbol, setSymbol] = useState('AAPL')
  const [stocksData, setStocksData] = useState<{ [key: string]: StockData }>({})
  const [error, setError] = useState('')

  const handleStocksData = useCallback(
    (data: { [key: string]: StockData }) => {
      setStocksData(data)

      if (!data[symbol]) {
        setError('No data available for this symbol.')
      } else {
        setError('')
      }
    },
    [symbol]
  )

  useSocket(handleStocksData)

  const stock = stocksData[symbol]

  return (
    <div className="App">
      <h1>Real-Time Stock App</h1>
      <SearchBar symbol={symbol} setSymbol={setSymbol} error={error} />

      {error && <p style={{ color: 'rgba(204, 0, 0, 1)' }}>{error}</p>}

      {stock && <StockDetails stock={stock} />}

      <StocksTable stocksData={stocksData} />
    </div>
  )
}

export default App
