import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository, DeleteResult} from 'typeorm';
import {UserEntity} from './user.entity';
import {CreateUserDto} from './dto';

import {validate} from 'class-validator';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {HttpStatus} from '@nestjs/common';
import {SetSubscriptionDto} from "./dto/set-subscription.dto";
import {BookEntity} from "../book/book.entity";
import {AddBookDto} from "./dto/add-book.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ReturnBookDto} from "./dto/return-book.dto";
import {Result} from "../shared/result";
import {DeleteUserDto} from "./dto/delete-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) {
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getUser(userId: number) {
        const user = await this.userRepository.findOne({where: {id: userId}, relations: ["books"]});

        if (!user) {
            return null;
        }
        return user;
    }

    async update(updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({where: {id: updateUserDto.userId}});

        user.username = updateUserDto.createUserDto.username;
        user.email = updateUserDto.createUserDto.email;
        user.password = updateUserDto.createUserDto.password;

        await this.userRepository.update({id: updateUserDto.userId}, user);
        return Result.FromMessage("User was updated");
    }

    async addBookToUser({userId, bookId}: AddBookDto) {
        const user = await this.userRepository.findOne({where: {id: userId}, relations: ["books"]});

        if (!user) {
            const errors = {user: "User doesn't exists"};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        if (!user.hasSubscription) {
            const errors = {user: "User hasn't subscription"};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        if (user.books.length > 5) {
            const errors = {user: "Book limit exceeded"};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        const book = await this.bookRepository.findOne({where: {id: bookId}});

        if (book.user) {
            const errors = {book: "Book already booked"};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        book.user = user;
        await this.bookRepository.update({id: bookId}, book);
        return Result.FromMessage("Book was added");
    }

    async returnBook({userId, bookId}: ReturnBookDto) {
        const user = await this.userRepository.findOne({where: {id: userId}, relations: ["books"]});

        const oldBookCount = user.books.length;

        user.books = user.books.filter(s => s.id != bookId);

        const newBookCount = user.books.length;

        if (oldBookCount == newBookCount) {
            const errors = {user: "This user don't have this book"};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        await this.userRepository.update({id: userId}, user);
        return Result.FromMessage("Book was returned");
    }

    async setSubscription({userId}: SetSubscriptionDto) {
        const user = await this.userRepository.findOne({where: {id: userId}});

        if (!user) {
            const errors = {user: "User doesn't exists"};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        user.hasSubscription = true;
        await this.userRepository.update({id: userId}, user);

        return Result.FromMessage("Subscription was successfully updated to true");
    }

    async create({username, email, password}: CreateUserDto) {
        const qb = await getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.username = :username', {username})
            .orWhere('user.email = :email', {email});

        const user = await qb.getOne();

        if (user) {
            const errors = {username: 'Username and email must be unique.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);

        }

        let newUser = new UserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.hasSubscription = false;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            const _errors = {username: 'User input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);

        } else {
            return await this.userRepository.save(newUser);
        }
    }

    async delete({userId}: DeleteUserDto) {
        return await this.userRepository.delete({id: userId});
    }
}
