import {ApiProperty} from "@nestjs/swagger";

export class UserResponseBody {
    @ApiProperty({
        default: "Sqwezzy228",
    })
    login: string;

    @ApiProperty(
        {
            default: "Sergei",
        }
    )
    forName: string;

    @ApiProperty(
        {
            default: "Kornev",
        }
    )
    lastName: string;
}
