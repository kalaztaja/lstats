import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { WeeklyRecord } from "./WeeklyRecords";

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.accounts)
    user: User;

    @OneToMany(() => WeeklyRecord, weeklyrecord => weeklyrecord.account)
    weeklyrecords: WeeklyRecord[];


    @Column()
    summonerName: string;

    @Column()
    pid: string;

    @Column()
    lastUpdated: string;

    @Column()
    soloq_wins: number;

    @Column()
    soloq_losses: number;

    @Column()
    soloq_lp: number;

    @Column()
    soloq_tier: string;





}
