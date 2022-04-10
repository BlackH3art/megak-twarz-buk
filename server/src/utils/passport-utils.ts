import passport from 'passport';
import * as jsonwebtoken from 'jsonwebtoken';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {Users} from "../models/user";

export const issueJWT = (user: {_id: string, email: string, password: string}) => {
    const payload = {
        sub: user._id,
        iat: Date.now(),
    };
    const expiresIn = '15m';
    const signedToken = jsonwebtoken.sign(payload, process.env.JWT_ACCESS, { expiresIn });
    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn,
    };
};

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS,
    algorithm: ['HS256'],
};

export const strategy = new Strategy(options, (payload, done) => {
    Users.findOne({ _id: payload.sub })
        .then((user) => {
            if(user) return done(null, user);
            else return done(null, false);
        })
        .catch(err => done(err, null));
});


