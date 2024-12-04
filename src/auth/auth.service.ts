import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserFromToken, UserLoginDto, UserRegisterDto} from "./interfaces";
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";
import {JwtService} from '@nestjs/jwt';
import * as process from "node:process";

@Injectable()
export class AuthService {
    async login(body: UserLoginDto) {
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

    async register(data: UserRegisterDto): Promise<User> {
        return this.prismaService.user.create({
            data
        })
    }

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {
    }
}
