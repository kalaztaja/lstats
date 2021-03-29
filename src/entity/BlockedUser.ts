import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class BlockedUser {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.blockedusers)
    user: User;

    @Column()
    summonerName: string;

    @Column()
    pid: string;

    @Column()
    soloq_tier: string;

    @Column()
    soloq_lp: number;



}
