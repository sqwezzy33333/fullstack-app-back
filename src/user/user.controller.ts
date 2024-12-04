import {Controller, Get, HttpCode, Req} from '@nestjs/common';
import {UserService} from "./user.service";

@Controller('user')
export class UserController {

    @Get('all')
    getUsers() {
        return this.userService.getAllUsers()
    }

    @Get('getMe')
    @HttpCode(200)
    async getMe(@Req() request: Request) {
        return this.userService.getMe(request)
    }

    constructor(private readonly userService: UserService) {}

}
