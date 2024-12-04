import {Controller, Get, Req} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOkResponse} from "@nestjs/swagger";
import {UserResponseBody} from "./models";

@Controller('user')
export class UserController {

    @Get('all')
    @ApiOkResponse({ type: [UserResponseBody] })
    getUsers() {
        return this.userService.getAllUsers()
    }

    @Get('me')
    @ApiOkResponse({ type: UserResponseBody })
    async getMe(@Req() request: Request) {
        return this.userService.getMe(request)
    }

    constructor(private readonly userService: UserService) {}

}
