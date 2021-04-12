import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UpcomingGame } from "./UpcomingGame";

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teamName: string;

    @Column()
    createdAt: string;

    @Column()
    regularTime: string;

    @Column()
    discordNick: string;

    @Column()
    discordId: number;



}
