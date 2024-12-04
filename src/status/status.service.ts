import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {TaskDto} from "../task/modules";
import {StatusDto} from "./models";

@Injectable()
export class StatusService {

    async getAll() {
        return this.prismaService.status.findMany();
    }

    async delete(id: string) {
        const exist = await this.prismaService.status.findFirst({where: {id: +id}});

        if (!exist) {
            throw new NotFoundException("Status Not Found");
        }
        return this.prismaService.status.delete({where: {id: +id}});
    }

    async create(body: StatusDto) {
        return this.prismaService.status.create({
            data: {
                ...body
            }
        });
    }

    async edit(id: string, body: StatusDto) {
        const exist = await this.prismaService.status.findFirst({where: {id: +id}});

        if (!exist) {
            throw new NotFoundException("Status Not Found");
        }

        this.prismaService.status.update({where: {id: +id}, data: body})
    }

    constructor(
        private prismaService: PrismaService
    ) {
    }
}
