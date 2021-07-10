"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("../dbConfig"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userRoute = express_1.default.Router();
const MIN_PASS_LENGTH = 4;
const ROUNDS = 10; // for encryption
exports.userRoute.get('/login', (req, res, next) => {
    res.render('login');
});
exports.userRoute.get('/reg', (req, res, next) => {
    res.render('reg');
});
exports.userRoute.post('/reg', (req, res) => {
    let { username, password, password2 } = req.body;
    let errors = [];
    if (password.length < MIN_PASS_LENGTH) {
        errors.push(`Password should atleast be ${MIN_PASS_LENGTH} chars long`);
    }
    if (password != password2) {
        errors.push("Passwords do not match");
    }
    if (errors.length > 0) {
        res.render("reg", { errors: errors });
    }
    else {
        bcrypt_1.default.hash(password, ROUNDS)
            .then((hashedPassword) => {
            dbConfig_1.default.query(`SELECT * FROM users 
                WHERE uid= $1`, [username], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    if (result.rowCount > 0) {
                        errors.push("User alreay registered");
                        res.render("reg", { errors: errors });
                    }
                }
            });
        });
    }
});
exports.userRoute.get('/dashboard', (req, res, next) => {
    res.render('dashboard', { user: "thaqib" });
});
