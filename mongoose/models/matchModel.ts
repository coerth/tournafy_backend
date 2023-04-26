import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, "A match must have a location"],
    }, date: {
        type: Date,
        default: Date.now(),    
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    }, score: [{
        type: Number
    }], stage: {
        type: Number,
        required: [true, "A match must have a stage"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    //player: Array
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: [true, "A team must be assigned to a match"]
    }],
})

matchSchema.pre(/^find/, function() {
    this.populate({
        path: "teams",
        select: "-__v -createdAt",
    })

    this.populate({
        path: "winner"
    })
}
)

matchSchema.post("save", function(doc, next){
    this.populate({
      path: "teams"})
      .then( () => next())
})

matchSchema.post("save", function(doc, next){
    this.populate({
      path: "winner"})
      .then( () => next())
})


const Match = mongoose.model("Match", matchSchema)

export default Match