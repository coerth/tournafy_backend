import mongoose from "mongoose";
import Team from "./teamModel";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A player must have a name"],
    maxLength: [40, "A player must have less or equal to 40 characters"],
    minLength: [4, "A player must have more or equal to 4 characters"],
  },
  gamerTag: {
    type: String,
    required: [true, "A player must have a gamertag"],
    maxLength: [20, "A player must have less or equal to 20 characters"],
    minLength: [4, "A player must have more or equal to 4 characters"],
  },
  email: {
    type: String,
    required: [true, "A player must have a email"],
    validate: {
      validator: function (email: string) {
        return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address`,
    },
  },
  phone: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  hash_password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["User", "Admin", "API"],
    default: "User",
  },
});

playerSchema.pre("findOneAndDelete", function (next) {
  Team.updateMany(
    { players: this.get("_id") },
    { $pull: { players: this.get("_id") } }
  ).then(() => next());
});

const PlayerModel = mongoose.model("Player", playerSchema);

export default PlayerModel;
