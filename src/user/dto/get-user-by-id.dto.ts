import {ApiProperty} from "@nestjs/swagger";

export class GetUserByIdDto {
    @ApiProperty()
    userId: number;
}
