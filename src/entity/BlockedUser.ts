import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class BlockedUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    summonerName: string;

    @Column()
    pid: string;

    @Column()
    soloq_tier: string;

    @Column()
    soloq_lp: number;

    @Column()
    soloq_wins: number;

    @Column()
    soloq_losses: number;

    @Column()
    soloq_rank_from_challenger: number;

    @Column()
    lastUpdated: string;

}
