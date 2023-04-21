"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
// singup
const signup = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            email: "email is reqired",
            password: "password is required"
        });
    }
};
exports.signup = signup;
