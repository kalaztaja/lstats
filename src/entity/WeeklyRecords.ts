import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Account } from "./Account";

@Entity()
export class WeeklyRecord {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    week: number;

    @ManyToOne(() => Account, account => account.weeklyrecords)
    account: Account;

    @Column()
    weekly_soloq_wins: number;

    @Column()
    weekly_soloq_losses: number;

    @Column()
    weekly_soloq_lp: number;

    @Column()
    weekly_soloq_tier: string;
}