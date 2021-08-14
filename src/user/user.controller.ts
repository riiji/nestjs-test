import {Get, Post, Body, Delete, Param, Controller, UsePipes, Put} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {ValidationPipe} from '../shared/pipes/validation.pipe';

import {
    ApiBearerAuth, ApiResponse, ApiTags
} from '@nestjs/swagger';
import {SetSubscriptionDto} from "./dto/set-subscription.dto";
import {AddBookDto} from "./dto/add-book.dto";
import {GetUserByIdDto} from "./dto/get-user-by-id.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {ReturnBookDto} from "./dto/return-book.dto";

@ApiBearerAuth()
@ApiTags('user')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    @ApiResponse({ status: 200 })
    async get() {
        return await this.userService.findAll();
    }

    @Get(':userId')
    async getById(@Param() {userId}: GetUserByIdDto) {
        return await this.userService.getUser(userId);
    }

    @Post('book-to-user')
    async addBookToUser(@Body() addBookDto: AddBookDto) {
        return await this.userService.addBookToUser(addBookDto);
    }

    @Post('return-book')
    async returnBook(@Body() returnBookDto: ReturnBookDto) {
        return await this.userService.returnBook(returnBookDto);
    }

    @Post('set-subscription')
    async setSubscription(@Body() setSubscriptionDto: SetSubscriptionDto) {
        return await this.userService.setSubscription(setSubscriptionDto);
    }

    @Put()
    async update(@Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(updateUserDto);
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() userData: CreateUserDto) {
        return await this.userService.create(userData);
    }

    @Delete(':userId')
    async delete(@Param() deleteUserDto : DeleteUserDto) {
        return await this.userService.delete(deleteUserDto);
    }
}
