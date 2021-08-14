import {ApiProperty} from "@nestjs/swagger";

export class AddBookDto {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    bookId: number;
}
