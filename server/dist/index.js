"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@twarz-buk.yomo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect(CONNECTION_URL)
    .then(() => {
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}).catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map