import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {exclude} from "../utils";

@Injectable()
export class UserService {
    async getAllUsers() {
        const users = await this.prismaService.user.findMany({});
        return users.map(user => exclude(user, ['password']))
    }

    async getMe(request: Request) {
        const id = request['user']['userId'];
        if (!id) {
            throw new NotFoundException("Пользователь не найден");
        }
        const userFromDb = await this.prismaService.user.findFirst({where: {id}});

        if (!userFromDb) {
            throw new NotFoundException("Пользователь не найден");
        }
        return exclude(userFromDb, ['password']);
    }

    constructor(private prismaService: PrismaService) {
    }
}
