const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 5000;

const stocks = {
    AAPL: { symbol: 'AAPL', price: 150, marketCap: '2.5T', volume: 80000000, history: [] },
    TSLA: { symbol: 'TSLA', price: 700, marketCap: '800B', volume: 30000000, history: [] },
    GOOGL: { symbol: 'GOOGL', price: 2800, marketCap: '1.8T', volume: 15000000, history: [] },
    AMZN: { symbol: 'AMZN', price: 3300, marketCap: '1.6T', volume: 25000000, history: [] },
    MSFT: { symbol: 'MSFT', price: 300, marketCap: '2.3T', volume: 50000000, history: [] },
    NFLX: { symbol: 'NFLX', price: 600, marketCap: '250B', volume: 10000000, history: [] },
    META: { symbol: 'META', price: 350, marketCap: '900B', volume: 40000000, history: [] },
    NVDA: { symbol: 'NVDA', price: 750, marketCap: '1.2T', volume: 20000000, history: [] },
    AMD: { symbol: 'AMD', price: 110, marketCap: '180B', volume: 30000000, history: [] },
    IBM: { symbol: 'IBM', price: 140, marketCap: '130B', volume: 7000000, history: [] }
};

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5174',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('subscribeToStocks', async () => {
        socket.emit('stocksUpdate', stocks);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const updateStockPrices = () => {
    Object.keys(stocks).forEach((symbol) => {
        const change = (Math.random() - 0.5) * 10;
        const newPrice = Math.max(1, stocks[symbol].price + change);

        stocks[symbol].price = newPrice;
        stocks[symbol].history.push({
            timestamp: new Date().toISOString(),
            price: newPrice
        });

        if (stocks[symbol].history.length > 100) {
            stocks[symbol].history.shift();
        }
    });
    io.emit('stocksUpdate', stocks);
};

setInterval(updateStockPrices, 1000);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
