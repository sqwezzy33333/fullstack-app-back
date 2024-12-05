import {ForbiddenException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {RefreshTokenDto, TokenResponse, UserFromToken, UserLoginDto, UserRegisterDto} from "./interfaces";
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";
import {JwtService} from '@nestjs/jwt';
import * as process from "node:process";
import {exclude} from "../utils";

@Injectable()
export class AuthService {
    async login(body: UserLoginDto): Promise<TokenResponse> {
        const user = await this.prismaService.user.findFirst({where: {login: body.login}});

        if (!user) {
            throw new NotFoundException("User Not Found");
        }

        const payload = {
            login: user.login,
            userId: user.id
        }

        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET_REFRESH_KEY,
                expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
            }),
        }
    }

    async register(data: UserRegisterDto) {
        const exist = await this.prismaService.user.findFirst({where: {login: data.login}});
        if(exist) {
            throw new ForbiddenException('Пользователь с логином ' + data.login + ' уже существует')
        }
        const user: User = await this.prismaService.user.create({
            data
        })

        return exclude(user, ['password']);
    }

    async refreshToken(data: RefreshTokenDto) {

        try {
            const refresh = this.jwtService.verify(data.refreshToken, {
                secret: process.env.JWT_SECRET_REFRESH_KEY,
            });

            const userFromBd: User | null = await this.prismaService.user.findFirst({where: {id: refresh.userId}});
            if (!userFromBd) {
                throw new UnauthorizedException("User Not Found");
            }
            const payload = {
                login: userFromBd.login,
                userId: userFromBd.id
            }

            return {
                accessToken: this.jwtService.sign(payload),
                refreshToken: this.jwtService.sign(payload, {
                    secret: process.env.JWT_SECRET_REFRESH_KEY,
                    expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
                }),
            }

        } catch (e) {
            throw new ForbiddenException(
                'Authentication failed (Refresh token is invalid or expired)',
            );
        }

    }

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {
    }
}
