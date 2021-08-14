import {ApiProperty} from "@nestjs/swagger";

export class ReturnBookDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    bookId: number;
}
