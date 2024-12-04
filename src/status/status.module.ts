import {Module} from '@nestjs/common';
import {StatusService} from './status.service';
import {StatusController} from './status.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    providers: [StatusService],
    controllers: [StatusController],
    imports: [PrismaModule]
})
export class StatusModule {
}
