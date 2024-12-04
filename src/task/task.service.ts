import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {TaskDto} from "./modules";
import {Task} from "@prisma/client";

@Injectable()
export class TaskService {

    async getAll() {
        return this.prismaService.task.findMany()
    }

    async createTask(body: TaskDto, request: Request) {
        const creatorId = +request['user']['userId'];

        const assigneeId = body.assigneeId;
        if (assigneeId) {
            const assignee = await this.prismaService.user.findUnique({where: {id: +assigneeId}});
            if (!assignee) {
                throw new NotFoundException("Assignee Not Found");
            }
            return;
        }
        return this.prismaService.task.create({
            data: {
                ...body,
                creatorId,
                assigneeId: +body.assigneeId || creatorId,
                createdAt: new Date()
            }
        })
    }

    async getMy(request: Request): Promise<Task[]> {
        const creatorId = +request['user']['userId'];
        return this.prismaService.task.findMany({where: {id: creatorId}})
    }

    async delete(request: Request, id: string) {
        const task = await this.prismaService.task.findFirst({where: {id: +id}});
        const creatorId = +request['user']['userId'];
        if (!task) {
            throw new NotFoundException("Task Not Found");
        }


        if (task.creatorId !== creatorId) {
            throw new ForbiddenException('Задача не создана этим юзером')
        }

        return this.prismaService.task.delete({where: {id: task.id}});
    }

    async edit(request: Request, id: string, editTaskDto: TaskDto) {
        const task = await this.prismaService.task.findFirst({where: {id: +id}});
        const creatorId = +request['user']['userId'];
        if (!task) {
            throw new NotFoundException("Task Not Found");
        }
        if (editTaskDto.assigneeId) {
            const assignee = await this.prismaService.user.findUnique({where: {id: editTaskDto.assigneeId}});
            if (!assignee) {
                throw new NotFoundException("Assignee Not Found");
            }
        }


        if (task.creatorId !== creatorId) {
            throw new ForbiddenException('Задача не создана этим юзером')
        }

        return this.prismaService.task.update({
            where: {id: task.id}, data: {
                ...editTaskDto,
            }
        })
    }

    constructor(
        private prismaService: PrismaService,
    ) {
    }

}
