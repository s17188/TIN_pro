import { Stat } from "./stat";

export interface Match {
    stadium:String
    match_date:Date
    create_date:Date
    stats:Stat[]
}
