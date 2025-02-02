export default interface StockData {
  symbol: string
  price: number
  marketCap: number
  volume: number
  history: { timestamp: number; price: number }[]
}
