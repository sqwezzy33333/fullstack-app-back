import {Body, Controller, Get, HttpCode, Post, Req, ValidationPipe} from '@nestjs/common';
import {UserLoginDto, UserRegisterDto} from "./interfaces";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: UserLoginDto) {
        return this.authService.login(body);
    }

    @Post('register')
    @HttpCode(200)
    async register(@Body() body: UserRegisterDto) {
        return this.authService.register(body);
    }

    constructor(
        private authService: AuthService,
    ) {
    }
}
