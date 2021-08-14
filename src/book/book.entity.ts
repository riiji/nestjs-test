import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm';
import {UserEntity} from "../user/user.entity";

@Entity('book')
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => UserEntity, user => user.books)
    user: UserEntity;
}
