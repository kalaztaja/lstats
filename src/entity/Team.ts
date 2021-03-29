import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
import { UpcomingGame } from "./UpcomingGame";

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => User, user => user.team)
    users: User[];

    @Column()
    teamName: string;

    @Column()
    createdAt: string;

    @Column()
    regularTime: string;

    @OneToMany(() => UpcomingGame, upcominggames => upcominggames.team)
    upcominggames: UpcomingGame[];


    @Column()
    discordNick: string;

    @Column()
    discordId: number;



}
