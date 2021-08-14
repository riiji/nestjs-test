import {CreateUserDto} from "./create-user.dto";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    createUserDto: CreateUserDto;
}
