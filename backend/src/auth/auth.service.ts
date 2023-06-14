import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if(!user){
        throw new NotFoundException('User not found');
    }
    if (!await bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if(user){
        throw new BadRequestException('User already exists');
    }
    const hash = await bcrypt.hash(pass, 10);

    const newUser = await this.usersService.createUser({id: '0', username, password: hash})

    return {username: newUser.username};
  }
  

}
