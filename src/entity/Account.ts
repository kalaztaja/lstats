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
    soloq_wins: string;

    @Column()
    soloq_losses: string;

    @Column()
    soloq_lp: string;

    @Column()
    soloq_tier: string;

    @Column()
    soloq_rank_from_challenger: number;

}
