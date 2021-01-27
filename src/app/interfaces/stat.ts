import { Match } from "./match";
import { Soccer } from "./soccer";

export interface Stat {
    playtime:Number
    redCards:Number
    yellowCards:Number
    soccer:Soccer
    match:Match
}
