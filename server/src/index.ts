import express from "express";
import mongoose from 'mongoose';
import passport from "passport";
import cors from 'cors';
import 'dotenv/config';
import {strategy} from "./utils/passport-utils";
import {authRouter} from "./routes/authRouter";

passport.use(strategy);

const app = express();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@twarz-buk.yomo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


app.use(express.json())
app.use(cors());

// Routes configuration
app.use('/auth', authRouter);

// Protected route for test purpose only
app.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json({msg: 'Access granted'});
});




mongoose.connect(CONNECTION_URL)
    .then(() => {

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });

    }).catch((err) => {
        console.error(err);
    });
