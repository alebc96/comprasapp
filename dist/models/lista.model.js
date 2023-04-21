"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModel = exports.ListSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ListSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});
exports.ListModel = (0, mongoose_1.model)('List', exports.ListSchema);
