import { Account } from "./account";

export interface User{
    
    id: string 
  
    name: string

    adress: string
    
    phone: string
    
    szig: string;
   
    deleted: boolean;              
   
    accounts: Account[];
}