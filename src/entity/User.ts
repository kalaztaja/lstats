import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Account } from "./Account";
import { BlockedUser } from "./BlockedUser";
import { Team } from "./Team";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Account, account => account.user)
    accounts: Account[];

    @OneToMany(() => BlockedUser, blockeduser => blockeduser.user)
    blockedusers: BlockedUser[];

    @Column()
    discordNick: string;

    @Column()
    discordId: string;

    @ManyToOne(() => Team, team => team.users)
    team: Team;

}
