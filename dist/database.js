"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(`mongodb+srv://alebecerrac96:iEKCMC8mxRt7sslI@cluster0.ltq44gk.mongodb.net/comprasapp?`)
    .then(res => { console.log("*************Conected to the database*************"); })
    .catch(error => { console.log(error); });
