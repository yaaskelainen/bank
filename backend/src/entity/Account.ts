import { userInfo } from "os";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, MinKey, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";
import { User } from "./User";

@Entity()
export class Account{

    @PrimaryColumn()
    id: string;
    
    // @Column({nullable:false})
    // usernumber: string ;

    // @Column({width:4, type:"numeric", unique:true, generated:"increment", nullable:false})
    // accountid: number ;

    @Column({type: "double", default:0 })
    balance: number;

    @Column({default:false})   // lezárt
    deleted: boolean;

   
    @ManyToOne(type => User, user => user.accounts, {
        eager: true,
        cascade: true
    })
    user: User;

    @OneToMany(type => Transaction, transaction => transaction.account)
    transactions: Transaction[];

    
}
