const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SellSathi Backend is running perfectly!' });
});

app.get('/api/shop/:shopId/products', (req, res) => {
    res.json({
        shopId: req.params.shopId,
        shopName: 'Ramesh Kirana Store',
        products: [
            { id: 1, name: 'Basmati Rice 5kg', category: 'Grocery', price: 280, oldPrice: 320, emoji: '🌾' },
            { id: 2, name: 'Fortune Refined Oil 1L', category: 'Grocery', price: 145, oldPrice: 160, emoji: '🫙' },
            { id: 3, name: 'Amul Butter 500g', category: 'Dairy', price: 260, oldPrice: 280, emoji: '🧈' },
            { id: 4, name: 'Tata Salt 1kg', category: 'Grocery', price: 24, oldPrice: 28, emoji: '🧂' },
            { id: 5, name: 'Parle-G Gold 800g', category: 'Biscuits', price: 55, oldPrice: 60, emoji: '🍪' },
            { id: 6, name: 'Colgate Active Salt 200g', category: 'Personal Care', price: 85, oldPrice: 95, emoji: '🪥' }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`SellSathi Backend running on http://localhost:${PORT}`);
});
