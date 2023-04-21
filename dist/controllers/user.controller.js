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
exports.login = exports.getUserByEmail = exports.activatedUser = exports.desactivateUser = exports.updateUserById = exports.deleteUserById = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const admin = require("firebase-admin");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.name) || !req.body.email || !req.body.password) {
        res.status(400).json({ msg: "Please introdue a valid user" });
    }
    const { name, email, password, role } = req.body;
    const activated = true;
    const newUser = new user_model_1.UserModel({ name, email, password, role, activated });
    try {
        const user = yield newUser.save();
        res.status(201).send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.UserModel.find();
        if (users) {
            res.status(200).send(users);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const user = yield user_model_1.UserModel.findById(userId);
        if (user) {
            return res.status(200).send(user);
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getUserById = getUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const user = yield user_model_1.UserModel.findByIdAndDelete(userId);
        if (user) {
            console.log("user deleted");
            return res.status(200).send(user);
        }
        else
            res.status(404).send("User not found");
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deleteUserById = deleteUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const { name, email, password } = req.body;
    try {
        const user = yield user_model_1.UserModel.findByIdAndUpdate(userId, {
            $set: { name, email, password },
        }).exec();
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send({ msg: "User not found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateUserById = updateUserById;
const desactivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const user = yield user_model_1.UserModel.findByIdAndUpdate(userId, {
            $set: { activated: false },
        });
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send({ msg: "User not found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.desactivateUser = desactivateUser;
const activatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const user = yield user_model_1.UserModel.findByIdAndUpdate(userId, {
            $set: { activated: true },
        });
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send({ msg: "User not found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.activatedUser = activatedUser;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.query;
    try {
        const result = yield user_model_1.UserModel.aggregate([
            {
                $match: {
                    email: userEmail,
                },
            },
        ]);
        if (result.length > 0) {
            return res.status(200).send(result);
        }
        else {
            return res.status(404).send({ msg: "User whit that email not found" });
        }
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.getUserByEmail = getUserByEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("starting login an user");
    const email = req.query.email;
    const password = req.query.password;
    let customToken = "";
    try {
        const user = yield user_model_1.UserModel.findOne({ email: email });
        if (!user) {
            res.status(404).send({ msg: "User not found" });
        }
        else {
            if (user.password !== password) {
                res.status(401).send({ msg: 'Password is not correct' });
            }
            else {
                try {
                    customToken = yield admin.auth().createCustomToken(user.email);
                    //res.status(200).send(customToken)
                }
                catch (error) {
                    res.send('Error creting custom token');
                }
                user.customToken = customToken;
                res.status(200).json(user);
            }
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.login = login;
