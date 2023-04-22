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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteList = exports.updateList = exports.getListById = exports.getAllList = exports.createList = void 0;
const lista_model_1 = require("../models/lista.model");
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const { name, description } = req.body;
    if (!req.body.name) {
        return res.status(400).send("Please introduce a valid List");
    }
    const newList = new lista_model_1.ListModel({ name, description, userId });
    try {
        const list = yield newList.save();
        res.status(201).send(list);
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(422).send(error);
        }
        else {
            res.status(500).send(error);
        }
    }
});
exports.createList = createList;
const getAllList = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lists = yield lista_model_1.ListModel.find();
        res.status(200).send(lists);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAllList = getAllList;
const getListById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.query;
    try {
        const list = yield lista_model_1.ListModel.findById(listId).exec();
        if (list) {
            res.status(200).send(list);
        }
        else {
            res.status(404).json({ msg: "List not found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getListById = getListById;
const updateList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.query;
    const { name, description } = req.body;
    try {
        const list = yield lista_model_1.ListModel.findByIdAndUpdate({ _id: listId }, { $set: { name, description } }).exec();
        if (list) {
            res.status(200).send(list);
        }
        else {
            res.status(404).json({ msg: "List not found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateList = updateList;
const deleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.query;
    try {
        const listDeleted = yield lista_model_1.ListModel.findByIdAndRemove(listId);
        if (listDeleted) {
            res.status(200).send(listDeleted);
        }
        else {
            res.status(404).json({ msg: 'List not found' });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deleteList = deleteList;
