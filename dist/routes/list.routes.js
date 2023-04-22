"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_controller_1 = require("../controllers/list.controller");
const router = (0, express_1.Router)();
router.get("/lists", list_controller_1.getAllList);
router.get("/lists-by-id", list_controller_1.getListByUserId);
router.post("/lists", list_controller_1.createList);
router.get("/lists-id", list_controller_1.getListById);
router.delete("/lists", list_controller_1.deleteList);
router.put("/lists", list_controller_1.updateList);
exports.default = router;
