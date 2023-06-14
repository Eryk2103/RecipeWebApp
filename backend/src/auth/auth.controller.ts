import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

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
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('user')
    getUser(@Req() req) { 
        return req.user;
    }
}
