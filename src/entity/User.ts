import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Account } from "./Account";
import { BlockedUser } from "./BlockedUser";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    discordNick: string;

    @Column()
    discordId: string;

    @Column({ nullable: true })
    teamId: string;

}
