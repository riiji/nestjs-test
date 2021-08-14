import { IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class SetSubscriptionDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly userId: number;
}
