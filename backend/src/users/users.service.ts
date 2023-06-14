import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async findOne(username: string) {

        let user;
        user = await this.userModel.findOne({username});
        console.log(user)
        if(!user){
            return null;
        }
        return user as User;
    }
    async createUser(user: User){
        const newUser = new this.userModel({
            username: user.username,
            password: user.password,
        });
        const res = await newUser.save();
        return res as User;
    }
}
