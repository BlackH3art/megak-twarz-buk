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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const user_1 = require("./models/user");
const passport_utils_1 = require("./utils/passport-utils");
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@twarz-buk.yomo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
passport_1.default.use(passport_utils_1.strategy);
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ err: 'Email, username and password are required' });
    const newUser = new user_1.Users({
        email,
        password,
    });
    const user = yield newUser.save();
    const { token, expires } = (0, passport_utils_1.issueJWT)(user);
    res.status(200).json({ user, token, expires });
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.Users.findOne({ email: req.body.email });
    if (!user || !req.body.password)
        return res.status(401).json({ err: 'Invalid data' });
    const isValid = yield user.checkPassword(req.body.password);
    if (isValid) {
        const { token, expires } = (0, passport_utils_1.issueJWT)(user);
        return res.status(200).json({ user, token, expires });
    }
    else {
        return res.status(200).json({ err: 'Invalid data' });
    }
}));
app.get('/protected', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ msg: 'Access granted' });
});
mongoose_1.default.connect(CONNECTION_URL)
    .then(() => {
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}).catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map