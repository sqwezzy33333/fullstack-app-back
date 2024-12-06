import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserLoginDto {
    @ApiProperty()
    @IsString({message: 'login|Логин должен быть строкой'})
    @IsNotEmpty({message: 'login|Поле не должно быть пустым'})
    login: string;

    @ApiProperty()
    @IsString({message: 'passwordПароль должен быть строкой'},)
    @IsNotEmpty({message: 'password|Поле не должно быть пустым'})
    password: string;
}

export class UserRegisterDto {
    @ApiProperty()
    @IsString({message: 'login|Логин должен быть строкой'})
    @IsNotEmpty({message: 'login|Поле не должно быть пустым'})
    login: string;

    @ApiProperty()
    @IsString({message: 'password|Пароль должен быть строкой'})
    @IsNotEmpty({message: 'password|Поле не должно быть пустым'})
    password: string;

    @ApiProperty()
    @IsString({message: 'forName|Имя должно быть строкой'})
    @IsNotEmpty({message: 'forName|Поле не должно быть пустым'})
    forName: string;

    @ApiProperty()
    @IsString({message: 'lastName|Фамилия должена быть строкой'})
    @IsNotEmpty({message: 'lastName|Поле не должно быть пустым'})
    lastName: string;
}

export interface UserFromToken {
    login: string,
    userId: number,
    iat: number,
    exp: number
}

export class TokenResponse {
    @ApiProperty({
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InNxd2V6enkiLCJ1c2VySWQiOjEsImlhdCI6MTczMzMwMTA1NiwiZXhwIjoxNzMzMzA0NjU2fQ.5CYxmmccAOkcXhyfD0gbeYTjYPo9ybwKbQZbgMluATs'
    })
    accessToken: string;

    @ApiProperty({
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InNxd2V6enkiLCJ1c2VySWQiOjEsImlhdCI6MTczMzMwMTA1NiwiZXhwIjoxNzMzMzA0NjU2fQ.5CYxmmccAOkcXhyfD0gbeYTjYPo9ybwKbQZbgMluATs'
    })
    refreshToken: string;
}

export class RefreshTokenDto {
    @ApiProperty(
        {
            default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InNxd2V6enkiLCJ1c2VySWQiOjEsImlhdCI6MTczMzMwMTA1NiwiZXhwIjoxNzMzMzA0NjU2fQ.5CYxmmccAOkcXhyfD0gbeYTjYPo9ybwKbQZbgMluATs',
        }
    )
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}

export class ChangePassDto {
    @ApiProperty()
    @IsString({ message: "old_password|Пароль должен быть строкой" })
    oldPassword: string;

    @ApiProperty()
    @IsString({ message: "new_password|Пароль должен быть строкой" })
    newPassword: string;
}
