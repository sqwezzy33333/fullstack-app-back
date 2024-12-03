import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserLoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UserRegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    forName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;
}
