import { IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;
}
