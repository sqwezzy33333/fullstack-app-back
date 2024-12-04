import {Body, Controller, Get, HttpCode, Post, Req, ValidationPipe} from '@nestjs/common';
import {RefreshTokenDto, TokenResponse, UserLoginDto, UserRegisterDto} from "./interfaces";
import {AuthService} from "./auth.service";
import {ApiOkResponse} from "@nestjs/swagger";
import {UserResponseBody} from "../user/models";

@Controller('auth')
export class AuthController {

    @Post('login')
    @ApiOkResponse({ description: 'Токен', type: TokenResponse })
    @HttpCode(200)
    async login(@Body() body: UserLoginDto) {
        return this.authService.login(body);
    }

    @Post('register')
    @ApiOkResponse({type: UserResponseBody})
    @HttpCode(201)
    async register(@Body() body: UserRegisterDto) {
        return this.authService.register(body);
    }

    @Post('refresh')
    @HttpCode(200)
    refresh(@Body() refresh: RefreshTokenDto) {
        return this.authService.refreshToken(refresh);
    }


    constructor(
        private authService: AuthService,
    ) {
    }
}
