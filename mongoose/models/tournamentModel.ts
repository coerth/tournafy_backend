import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tournament must have a name"],
        maxLength: [40, "A tournament name must have less or equal to 40 characters"],
        minLength: [4, "A tournament name must have more or equal to 4 characters"]
    },
    startDate: {
        type: Number,
        default: Date.now(),
        maxLength: [40, "A tournament name must have less or equal to 40 characters"]
    },
    endDate: {
        type: Number,
        default: Date.now(),
        maxLength: [40, "A tournament name must have less or equal to 40 characters"]
    },
    tournamentType: {
        type: String,
        enum: ["Elimination", "Round Robin"],
        message: "tournament type must be Elimination or Round Robin",
        default: "Elimination"
    }, 
    maxTeams: {
        type: Number,
        required: [true, "Tournament must have maximum teams"]
    }, 
    minTeams: {
        type: Number,
        required: [true, "Tournament must have minimum teams"]
    },
    //player: Array
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }],
})


tournamentSchema.pre(/^find/, function() {
    this.populate({
        path: "teams",
        select: "-__v -createdAt",
    })

    this.populate({
        path: "matches"
    })
}
)

tournamentSchema.post("save", function(doc, next){
      this.populate({
        path: "matches"})
        .then( () => next())
})

tournamentSchema.post("save", function(doc, next){
      this.populate({
        path: "teams"})
        .then( () => next())
})

const Tournament = mongoose.model("Tournament", tournamentSchema)

export default Tournament