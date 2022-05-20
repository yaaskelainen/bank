import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, Unique, OneToMany } from "typeorm"
import { Account } from "./Account"

@Entity()
export class User {

    @PrimaryColumn({width:6, generated: "increment", type:"numeric", unique:true})
    id: string

    @Column()
    name: string

    @Column()
    adress: string

    @Column()
    phone: string

    @Column()
    szig: string;

    @Column({default:false})
    deleted: boolean;              

    @OneToMany(type => Account, account => account.user)
    accounts: Account[];

}
