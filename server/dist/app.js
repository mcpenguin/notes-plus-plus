"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const express_session_1 = __importDefault(require("express-session"));
const express_flash_1 = __importDefault(require("express-flash"));
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express_1.default();
// cors
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_session_1.default({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(express_flash_1.default);
app.set('view engine', 'ejs');
app.get('/', (req, res, next) => {
    res.render('index');
});
app.use(bodyParser.json());
app.use('/user', user_1.userRoute);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
