import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        default: Date.now(),
    },
    endDate: {
        type: Date,
        default: Date.now(),
    },
    tournamentType: {
        type: String,
        enum: ["Elimination", "Round Robin"],
        message: "tournament type must be Elimination or Round Robin"
    }, maxTeams: {
        type: Number,
        required: [true, "Tournament must have maximum teams"]
    }, minTeams: {
        type: Number,
        required: [true, "Tournament must have minimum teams"]
    },
    //player: Array
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
        required: [true, "A match must be assigned to a tournament"]
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }],
})

tournamentSchema.pre(/^find/, function() {
    this.populate({
        path: "matches",
        select: "-__v -createdAt",
    })
}
)

tournamentSchema.pre(/^find/, function() {
    this.populate({
        path: "teams",
        select: "-__v -createdAt",
    })
}
)

tournamentSchema.pre(/^find/, function(next) {
    this.populate({
        path: "matches"
    })
    next()
})

tournamentSchema.pre(/^find/, function(next) {
    this.populate({
        path: "teams"
    })
    next()
})

const Tournament = mongoose.model("Tournament", tournamentSchema)

export default Tournament