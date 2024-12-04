import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {exclude} from "../utils";
import {UserFromToken} from "../auth/interfaces";

@Injectable()
export class UserService {
    async getAllUsers() {
        const users = await this.prismaService.user.findMany({});
        return users.map(user => exclude(user, ['password']))
    }

    async getMe(request: Request) {
        const id = request['user']['id'];
        const userFromDb = await this.prismaService.user.findFirst({where: {id}});

        if (!userFromDb) {
            throw new NotFoundException("User Not Found");
        }
        return exclude(userFromDb, ['password']);
    }

    constructor(private prismaService: PrismaService) {
    }
}
