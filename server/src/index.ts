import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@twarz-buk.yomo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


app.use(express.json())
app.use(cors());







mongoose.connect(CONNECTION_URL)
    .then(() => {

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });

    }).catch((err) => {
        console.error(err);
    });
