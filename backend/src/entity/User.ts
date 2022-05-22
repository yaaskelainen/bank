import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, Unique, OneToMany } from "typeorm"
import { Account } from "./Account"


@Entity()
export class User {

    @PrimaryColumn({unique:true})
    id: string 

    @Column({nullable:false})
    name: string

    @Column({nullable:false})
    adress: string

    @Column({nullable:false})
    phone: string

    @Column({nullable:false})
    szig: string;

    @Column({default:false})
    deleted: boolean;              

    @OneToMany(type => Account, account => account.user)
    accounts: Account[];

}
