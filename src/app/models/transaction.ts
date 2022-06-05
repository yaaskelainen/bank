import { Account } from "./account";

export interface Transaction{
    
    id: string;

    goalaccountnr: string;

    amount: number;

    description: string;

    date:Date;

    account: Account;
}