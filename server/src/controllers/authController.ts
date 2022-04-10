import { Request, Response} from 'express';
import {Users} from '../models/user';
import {issueJWT} from '../utils/passport-utils';

export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({err:'Email, username and password are required'});
    const newUser = new Users({
        email,
        password,
    });
    const user = await newUser.save();
    const {token, expires} = issueJWT(user);
    res.status(200).json({user, token, expires});
};

export const signIn = async (req: Request, res: Response) => {
    const user = await Users.findOne({ email: req.body.email });
    if(!user || !req.body.password) return res.status(401).json({err: 'Invalid data'});
    const isValid = await user.checkPassword(req.body.password);
    if(isValid) {
        const {token, expires} = issueJWT(user);
        return res.status(200).json({user, token, expires});
    } else {
        return res.status(200).json({err: 'Invalid data'});
    }
};