import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {PrismaModule} from "../prisma/prisma.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [PrismaModule, JwtModule.register(
        {
            secret: process.env.JWT_SECRET_KEY as string,
            signOptions: {
                expiresIn: process.env.TOKEN_EXPIRE_TIME,
            },
        },
    ),]
})
export class AuthModule {
}
