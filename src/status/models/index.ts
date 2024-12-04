import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class StatusDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:  string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    color: string;
}
