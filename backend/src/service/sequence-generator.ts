import { Account } from "../entity/Account";


export function GenerateAccount(userid:string, accounts:Account[]):string{

    const sequencednumber:string = "000"+ accounts.length.toString();
    const partnumber:string = sequencednumber.slice(sequencednumber.length - 4);
    return userid + partnumber;

}