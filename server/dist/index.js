"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const passport_utils_1 = require("./utils/passport-utils");
const authRouter_1 = require("./routes/authRouter");
passport_1.default.use(passport_utils_1.strategy);
const app = (0, express_1.default)();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@twarz-buk.yomo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes configuration
app.use('/auth', authRouter_1.authRouter);
// Protected route for test purpose only
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