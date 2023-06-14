import * as mongoose from 'mongoose';

export interface User{
    id: string;
    username: string;
    password: string;
}
export const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
})