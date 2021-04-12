import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { WeeklyRecord } from "./WeeklyRecords";

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

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
    soloq_lp: string;

    @Column()
    soloq_tier: string;

    @Column()
    soloq_rank_from_challenger: number;

}
