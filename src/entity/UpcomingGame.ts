import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Timestamp } from "typeorm";
import { Team } from "./Team";

@Entity()
export class UpcomingGame {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Team, team => team.users)
    team: Team;

    @Column()
    timestamp: string;

    @Column()
    played: string;


}
