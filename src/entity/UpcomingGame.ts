import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Timestamp } from "typeorm";

@Entity()
export class UpcomingGame {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teamId: string;

    @Column()
    timestamp: string;

    @Column()
    played: string;


}
