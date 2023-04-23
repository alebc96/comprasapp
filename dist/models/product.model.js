"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number
    },
    listId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'List'
    },
    paid: {
        type: Boolean,
    }
});
exports.ProductSchema.pre('save', function (next) {
    this.total_price = this.price * this.amount;
    next();
});
exports.ProductModel = (0, mongoose_1.model)('Product', exports.ProductSchema);
