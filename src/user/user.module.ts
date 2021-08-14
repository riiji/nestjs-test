import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import {BookService} from "../book/book.service";
import {BookEntity} from "../book/book.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BookEntity])],
  providers: [UserService, BookService],
  controllers: [
    UserController
  ],
  exports: [UserService]
})
export class UserModule {}
