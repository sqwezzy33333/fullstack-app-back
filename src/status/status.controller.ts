import {Body, Controller, Delete, Get, Param, Post, Put, Req} from '@nestjs/common';
import {StatusService} from "./status.service";
import {TaskDto} from "../task/modules";
import {Task} from "@prisma/client";
import {StatusDto} from "./models";

@Controller('status')
export class StatusController {

    @Get()
    getStatuses() {
        return this.statusService.getAll();
    }

    @Delete(':id')
    deleteStatus(@Param('id') id: string) {
        return this.statusService.delete(id)
    }

    @Put(':id')
    editStatus(@Req() req: Request, @Param('id') id: string, @Body() body: StatusDto) {

    }

    @Post()
    createStatus(@Body() body: StatusDto) {
        return this.statusService.create(body);
    }

    constructor(private readonly statusService: StatusService) {
    }
}
