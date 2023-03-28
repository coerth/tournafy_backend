import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A person must have a name"],
        maxLength: [40, "A person must have less or equal to 40 characters"],
        minLength: [4, "A person must have more or equal to 4 characters"]
    },
    age: Number,
    city: {
        type: String,
        enum: ["Bagsværd", "Herlev", "Lyngby"],
        message: "City must be Bagsværd, Herlev or Lyngby"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

const Person = mongoose.model("Person", personSchema)

export default Person