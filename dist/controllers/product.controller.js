"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsByList = exports.updateProductById = exports.deleteProductById = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = require("../models/product.model");
const lista_model_1 = require("../models/lista.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.query;
    const { name, price, amount } = req.body;
    if (!name || !price || !amount) {
        res.status(400).send({ msg: "Introduce a valid user" });
    }
    try {
        const newProduct = new product_model_1.ProductModel({ name, amount, price, listId });
        const list = yield lista_model_1.ListModel.findById(listId);
        if (list) {
            const product = yield newProduct.save();
            if (product) {
                res.status(201).send(product);
            }
            else {
                res.status(401).send({ msg: "Error at create product" });
            }
        }
        else {
            res.status(404).send({ msg: "List not found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.ProductModel.find({});
        res.status(200).send(products);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.query;
    try {
        const product = yield product_model_1.ProductModel.findById(productId);
        if (product) {
            res.status(200).send(product);
        }
        else {
            res.status(404).send({ msg: "Product not found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getProductById = getProductById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.query;
    try {
        const product = yield product_model_1.ProductModel.findByIdAndDelete(productId);
        if (product) {
            res.status(200).send(product);
        }
        else {
            res.status(404).send(product);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deleteProductById = deleteProductById;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.query;
    const { name, amount, price } = req.body;
    const total_price = amount * price;
    const date = new Date();
    const newProduct = yield product_model_1.ProductModel.findByIdAndUpdate(productId, { $set: { name, amount, price, date, total_price } }).exec();
    if (newProduct) {
        res.status(200).send(newProduct);
    }
    else {
        res.status(404).send({ msg: "Product not found" });
    }
});
exports.updateProductById = updateProductById;
const getAllProductsByList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.query.listId;
    try {
        const result = yield product_model_1.ProductModel.aggregate([
            {
                $match: {
                    listId: new mongoose_1.default.Types.ObjectId(listId)
                }
            }
        ]);
        if (result) {
            res.status(200).send(result);
        }
        else {
            res.status(404).send({ msg: "this list not contain any product" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAllProductsByList = getAllProductsByList;
