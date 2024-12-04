import {Body, Controller, Delete, Get, Param, Post, Put, Req} from '@nestjs/common';
import {TaskService} from "./task.service";
import {TaskDto} from "./modules";

@Controller('task')
export class TaskController {
    @Get('all')
    getAllTasks() {
        return this.taskService.getAll()
    }

    @Post()
    createTask(@Body() body: TaskDto, @Req() req: Request) {
        return this.taskService.createTask(body, req)
    }

    @Get('my')
    getMyTasks(@Req() req: Request) {
        return this.taskService.getMy(req);
    }

    @Delete(':id')
    deleteTask(@Req() req: Request, @Param('id') id: string) {
        return this.taskService.delete(req, id)
    }

    @Put(':id')
    updateTask(@Req() req: Request, @Param('id') id: string, @Body() body: TaskDto) {
        return this.taskService.edit(req, id, body);
    }

    constructor(private readonly taskService: TaskService) {}
}
