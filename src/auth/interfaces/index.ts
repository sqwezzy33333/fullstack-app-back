import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserLoginDto {
    @ApiProperty()
    @IsString({message: 'Логин должен быть строкой'})
    @IsNotEmpty({message: 'Поле не должно быть пустым'})
    login: string;

    @ApiProperty()
    @IsString({message: 'Пароль должен быть строкой'})
    @IsNotEmpty({message: 'Поле не должно быть пустым'})
    password: string;
}

export class UserRegisterDto {
    @ApiProperty()
    @IsString({message: 'Логин должен быть строкой'})
    @IsNotEmpty({message: 'Поле не должно быть пустым'})
    login: string;

    @ApiProperty()
    @IsString({message: 'Пароль должен быть строкой'})
    @IsNotEmpty({message: 'Поле не должно быть пустым'})
    password: string;

    @ApiProperty()
    @IsString({message: 'Имя должно быть строкой'})
    @IsNotEmpty({message: 'Поле не должно быть пустым'})
    forName: string;

    @ApiProperty()
    @IsString({message: 'Фамилия должена быть строкой'})
    @IsNotEmpty({message: 'Поле не должно быть пустым'})
    lastName: string;
}

export interface UserFromToken {
    login: string,
    userId: number,
    iat: number,
    exp: number
}
