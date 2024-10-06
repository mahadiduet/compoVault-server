const express = require('express')
const cors = require('cors');
const app = express()
const fs = require('fs');
const path = require('path');
const port = 5000

app.use(express.json());

app.use(cors({
    origin: [
       'http://localhost:5173',
       'https://compovault.web.app',
    ],
    credentials: true
 }));

app.get('/', (req, res) => {
    res.send('Server running.............')
})

app.get('/api/products', (req, res) => {
    const filePath = path.join('data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading the JSON file', error: err });
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    const filePath = path.join('data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading the JSON file', error: err });
        }

        const products = JSON.parse(data); 

        const product = products.find(pro => pro._id === productId);

        if (!product) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json(product);
    });


});

app.listen(port, () => {
    console.log(`CompuVault listening on port ${port}`)
})