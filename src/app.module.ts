import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {BookModule} from "./book/book.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule,
        BookModule,
    ],
    controllers: [
        AppController
    ],
    providers: []
})
export class ApplicationModule {
    constructor(private readonly connection: Connection) {
    }
}
