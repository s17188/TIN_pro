import { Stat } from "./stat";

export interface Match {
    _id: string
    stadium:string
    match_date:Date
    create_date:Date
    stats:Stat[]
    soccerId?:string
}
