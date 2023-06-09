import mongoose from "mongoose";
import slugify from "slugify";
import Tournament from "./tournamentModel";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A team must have a name"],
        maxLength: [40, "A team must have less or equal to 15 characters"],
        minLength: [4, "A team must have more or equal to 4 characters"]
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: [true, "A team must have a captain"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    //player: Array
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: [true, "A player must be assigned to a team"]
    }],
    slug: String,
},{
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    })

teamSchema.virtual("tournaments").get( async function ()
{
  return await Tournament.find( {
        teams: this.get("id")
    })
})    

teamSchema.pre("save", function(next){
    this.slug = slugify(this.name, {lower:true})
    next()
})

teamSchema.pre(/^find/, function() {
    this.populate({
        path: "players",
        select: "-__v -createdAt",
    })

    this.populate({
        path: "captain",
    })
}
)

teamSchema.post("save", function(doc, next){
    this.populate({
      path: "players"})
      .then( () => next())
})

teamSchema.post("save", function(doc, next){
    this.populate({
      path: "captain"})
      .then( () => next())
})

const Team = mongoose.model("Team", teamSchema)

export default Team