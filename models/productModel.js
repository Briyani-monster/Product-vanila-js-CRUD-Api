const products = require('../data/products');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils/common');
function all() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function get(id) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex(
            (val) => val.id === Number.parseInt(id, 10)
        );
        if (index !== -1) resolve(products[index]);
        else resolve(null);
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: products.length + 1, ...product };
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    });
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        products[index] = { id, ...product };
        writeDataToFile('./data/products.json', products);
        resolve(products[index]);
    });
}
function remove(id) {
    return new Promise((resolve, reject) => {
        console.log(
            'id ',
            typeof id,
            products.filter((val) => val.id !== Number.parseInt(id, 10))
        );
        const newProducts = products.filter(
            (val) => val.id !== Number.parseInt(id, 10)
        );
        const deleteProduct = products.filter(
            (val) => val.id === Number.parseInt(id, 10)
        );
        writeDataToFile('./data/products.json', newProducts);
        resolve(deleteProduct);
    });
}
module.exports = {
    all,
    get,
    create,
    update,
    remove,
};
