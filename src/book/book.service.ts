import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from '../user/user.entity';
import {BookEntity} from "./book.entity";
import {validate} from 'class-validator';
import {CreateBookDto} from "./dto/create-book.dto";
import {HttpException} from "@nestjs/common/exceptions/http.exception";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async addBook({name}: CreateBookDto) {
        const newBook = new BookEntity();
        newBook.name = name;


        const errors = await validate(newBook);
        if (errors.length > 0) {
            const _errors = {username: 'User input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);

        } else {
            return await this.bookRepository.save(newBook);
        }
    }

    async getBooks() {
        return await this.bookRepository.find();
    }


}
