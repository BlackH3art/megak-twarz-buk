import {model, Schema} from "mongoose";
import * as bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password must be at least 5 characters!'],
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods = {
    async checkPassword(password: string): Promise<boolean> {
        return (await bcrypt.compare(password, this.password));
    },
};
export const Users = model('Users', userSchema);