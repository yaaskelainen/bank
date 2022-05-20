import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";


@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: false})
    accountnr: string;

    @Column({type: "double", nullable: false})
    amount: number;

    @Column({nullable: true})
    description: string;

    @Column()
    date:Date;

    @Column({nullable: true})
    senderaccount: string;

    @ManyToOne(type => Account, account => account.transactions, {
        eager: true,
        cascade: true
    })
    account: Account;

    }