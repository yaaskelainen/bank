import { Account } from "./account";

export interface Transaction{
    
    id: string;

    accountnr: string;

    amount: number;

    description: string;

    date:Date;

    senderaccount: string;

    account: Account;
}