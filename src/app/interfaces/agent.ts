export interface Agent {
    _id: string,
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String},
    surname:{type:String},
    create_date: {
        type: Date
    }
}
