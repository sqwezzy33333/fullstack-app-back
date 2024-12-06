import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import {
    ChangePassDto,
    RefreshTokenDto,
    TokenResponse,
    UserFromToken,
    UserLoginDto,
    UserRegisterDto
} from "./interfaces";
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
            throw new NotFoundException("Пользователь не найден");
        }

        if (user.password !== body.password) {
            throw new BadRequestException(["password|Неверный пароль"])
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
        if (exist) {
            throw new BadRequestException({
                message: ['login|Пользователь с логином ' + data.login + ' уже существует']
            })
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

    async changePass(body: ChangePassDto, request: Request) {
        try {
            const token = request.headers['authorization'].replace('Bearer ', '').trim();
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.prismaService.user.findFirst({where: {id: payload.id}});
            if (!user) {
                throw new NotFoundException("User Not Found");
            }

            if (body.oldPassword !== user.password) {
                throw new BadRequestException(['oldPassword|Неверный пароль'])
            }

            const result = await this.prismaService.user.update({
                where: {id: user.id},
                data: {password: body.newPassword}
            });
            return exclude(result, ['password']);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error
            }
            throw new UnauthorizedException("Token is invalid");
        }
    }

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {
    }
}
