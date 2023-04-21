"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//create user
router.get('/users', (req, res) => { res.send("this is a user "); });
exports.default = router;
