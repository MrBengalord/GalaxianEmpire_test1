const express = require('express');
const { TonClient } = require('@tonclient/core');
const { libNode } = require('@tonclient/lib-node');

TonClient.useBinaryLibrary(libNode);

const app = express();
app.use(express.json());

const client = new TonClient({
    network: {
        endpoints: ['https://toncenter.com/api/v2/jsonRPC']
    }
});

// Получение данных флота
app.get('/fleet', async (req, res) => {
    // Здесь будет запрос к смарт-контракту
    const fleet = [
        { name: "Ship 1", level: 1 },
        { name: "Ship 2", level: 2 }
    ];
    res.json(fleet);
});

// Получение данных маркетплейса
app.get('/marketplace', async (req, res) => {
    // Здесь будет запрос к смарт-контракту
    const items = [
        { name: "Planet A", price: "100 TON" },
        { name: "Planet B", price: "200 TON" }
    ];
    res.json(items);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});