import { Stat } from "./stat";

export interface Soccer {
    _id: string,
    name:String,
    surname:String,
    birthdate: Date,
    nationality:String,
    height:Number,
    weight:Number,
    gender:{type:String,enum:['Man','Female']},
    price:Number,
    desc:String,
    age:Number,
    fifaMultipler:Number,
    agentId:String,
    create_date:Date
    stats:Stat[]
}
