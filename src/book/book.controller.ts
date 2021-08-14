import {Get, Controller, Body, Post} from '@nestjs/common';

import {
    ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import {BookService} from "./book.service";
import {CreateBookDto} from "./dto/create-book.dto";

@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    async getBooks() {
        return await this.bookService.getBooks();
    }

    @Post()
    async addBook(@Body() createBookDto: CreateBookDto) {
        return await this.bookService.addBook(createBookDto);
    }
}
