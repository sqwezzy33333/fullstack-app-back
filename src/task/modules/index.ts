import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class TaskDto {
    @ApiProperty()
    @IsString({message: 'Имя должно быть строкой'})
    @IsNotEmpty({message: 'Поле не должно быть пустым'})
    name: string;

    @ApiProperty()
    @IsString({message: 'Описание должно быть строкой'})
    @IsNotEmpty({message: 'Поле не должно быть пустым'})
    description: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    assigneeId?: number;

    @ApiProperty()
    status?: number;
}
