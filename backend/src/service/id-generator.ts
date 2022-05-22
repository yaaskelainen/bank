import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 6)

export function GenerateId():string{

    return nanoid();

}