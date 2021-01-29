import { Stat } from "./stat";

export interface Soccer {
    _id: string,
    name:string,
    surname:string,
    birthdate?: Date | string,
    nationality?:string,
    height?:Number,
    weight?:Number,
    gender?:{type:string,enum:["Man","Female"]},
    price?:Number,
    desc?:string,
    age?:Number,
    fifaMultipler?:Number,
    agentId?:string,
    create_date?:Date
    stats:Stat[]
}
