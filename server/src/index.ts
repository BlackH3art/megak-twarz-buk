import express from "express";
import mongoose from 'mongoose';
import passport from "passport";
import cors from 'cors';
import 'dotenv/config';
import {Users} from "./models/user";
import {issueJWT, strategy} from "./utils/passport-utils";

const app = express();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@twarz-buk.yomo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


app.use(express.json())
app.use(cors());
passport.use(strategy);


app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({err:'Email, username and password are required'});
    const newUser = new Users({
        email,
        password,
    });
    const user = await newUser.save();
    const {token, expires} = issueJWT(user);
    res.status(200).json({user, token, expires});
});

app.post('/login', async (req, res) => {
    const user = await Users.findOne({ email: req.body.email });
    if(!user || !req.body.password) return res.status(401).json({err: 'Invalid data'});
    const isValid = await user.checkPassword(req.body.password);
    if(isValid) {
        const {token, expires} = issueJWT(user);
        return res.status(200).json({user, token, expires});
    } else {
        return res.status(200).json({err: 'Invalid data'});
    }
});

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
