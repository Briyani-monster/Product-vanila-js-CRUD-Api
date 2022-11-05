const Products = require('../models/productModel');
const { getPostData } = require('../utils/common');
/**
 * @desc Gets All Products
 * @route Get /api/products
 * @param {*} req
 * @param {*} res
 */
async function getProducts(req, res) {
    try {
        const products = await Products.all();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

/**
 * @desc Gets one Product
 * @route Get /api/products/:id
 * @param {*} req
 * @param {*} res
 * @param {Number} id
 */
async function getProduct(req, res, id) {
    try {
        const product = await Products.get(id);
        if (product) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    error: 404,
                    message: `product with ${id} not found`,
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @desc create a Product
 * @route POST /api/products body have data for creation
 * @param {*} req
 * @param {*} res
 */
async function createProduct(req, res) {
    try {
        const body = JSON.parse(await getPostData(req));
        const { title, description, price } = body;

        const product = {
            title,
            description,
            price,
        };

        const newProduct = await Products.create(product);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

/**
 * @desc update a Product
 * @route PUT /api/products/id  body have update data
 * @param {*} req
 * @param {*} res
 * @param {Number} id
 */
async function updateProduct(req, res, id) {
    try {
        const currProduct = await Products.get(id);
        if (currProduct) {
            const body = JSON.parse(await getPostData(req));
            const { title, description, price } = body;

            const product = {
                title: title || currProduct.title,
                description: description || currProduct.description,
                price: price || currProduct.price,
            };
            console.log('body  ', body, title, description, price, product);
            const updateProduct = await Products.update(id, product);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(updateProduct));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    error: 404,
                    message: `product with ${id} not found update failed`,
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @desc delete a Product
 * @route DELETE /api/products/id
 * @param {*} req
 * @param {*} res
 * @param {Number} id
 */
async function deleteProduct(req, res, id) {
    try {
        const product = await Products.remove(id);
        if (product) {
            console.log(product);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `product ${id} id removed` }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    error: 404,
                    message: `product with ${id} not found for delete`,
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
