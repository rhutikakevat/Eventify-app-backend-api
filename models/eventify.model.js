const mongoose= require("mongoose");

const meetupAppSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    timeToStart:{
        type:String,
        required:true,
    },
    timeToEnd:{
        type:String,
        required:true,
    },
    eventType:{
        type:String,
        enum:["Online","Offline"],
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    host:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true
    },
    eventTags:[{
        type:String,
    }],
    dressCode:{
        type:String,
    },
    ageRestrictions:{
        type:String,
    },
    locationCity:{
        type:String,
        required:true,
      
    },
    locationAddress:{
        type:String,
        required:true
    
    },
    price:{
        type:Number,
        required:true,
        min:0,
        default:0,
    },
    speakers:[{
        name:{
            type:String,
            required:true,
        },
        profileImage:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            required:true,
        }
    }]
},{
    timestamps:true,
});                           

const MeetupApp = mongoose.model("MeetupEvent",meetupAppSchema);

module.exports = MeetupApp;                    