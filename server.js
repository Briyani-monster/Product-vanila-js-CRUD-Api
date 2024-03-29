const http = require('http');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('./controllers/productController');

const server = http.createServer((req, res) => {
     // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res);
    } else if (
        req.url.match(/\/api\/products\/([0-9]+)/) &&
        req.method === 'GET'
    ) {
        console.log(req.url);
        const id = req.url.split('/')[3];
        getProduct(req, res, id);
    } else if (req.url === '/api/products' && req.method === 'POST') {
        console.log(req.url, req.method);
        createProduct(req, res);
    } else if (
        req.url.match(/\/api\/products\/([0-9]+)/) &&
        req.method === 'PUT'
    ) {
        const id = req.url.split('/')[3];
        updateProduct(req, res, id);
    } else if (
        req.url.match(/\/api\/products\/([0-9]+)/) &&
        req.method === 'DELETE'
    ) {
        const id = req.url.split('/')[3];
        deleteProduct(req, res, id);
    } else {
 res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/products endpoint',
      })
    );
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT);
module.exports = server;
