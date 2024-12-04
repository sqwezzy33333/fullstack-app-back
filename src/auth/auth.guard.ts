import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

const PATHS_WITHOUT_GUARD = ['auth'];

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const path = request.url.split('/')[1];
            if (PATHS_WITHOUT_GUARD.includes(path)) {
                return true;
            }
            const token = request.headers['authorization'].replace('Bearer ', '').trim();
            const payload = await this.jwtService.verifyAsync(token);
            request['user'] = payload;
        } catch (e) {
            throw new UnauthorizedException("Token is invalid");
        }
        return true;
    }

    constructor(private jwtService: JwtService) {
    }
}
