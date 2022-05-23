import { Transaction } from "./transaction";
import { User } from "./user";

export interface Account{
    
    id: string;
    
    balance: number;

    deleted: boolean;

    user: User;

    transactions: Transaction[];

}