import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //TO DO:
    //change Record type to a dto class
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) { 
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    //TO DO:
    //change Record type to a dto class
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerDto: Record<string, any>) { 
        return this.authService.register(registerDto.username, registerDto.password);
    }
}
