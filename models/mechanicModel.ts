import mongoose from "mongoose";
import Person from "./personModel";
import slugify from "slugify";

const mechanicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A person must have a name"],
        maxLength: [40, "A person must have less or equal to 40 characters"],
        minLength: [4, "A person must have more or equal to 4 characters"]
    },
    email:{
        type: String,
        validate: {
            validator: function(email: string){
                return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
            },
            message: (props: {value: string;}) => `${props.value} is not a valid email address`
        }
    },
    experience:{type: Number, required: true},
    title: {
        type: String,
        enum: ["Mechanic", "Shit Mechanic", "Good Mechanic"],
        message: "title must be Mechanic, Shit Mechanic or Good Mechanic"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    //people: Array
    people: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
        required: [true, "A person must be assigned to a mechanic"]
    },
    slug: String,
},{
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    })

/* mechanicSchema.pre("save", async function(next) {
    const peoplePromises = this.people.map(id => Person.findById(id))
    this.people = await Promise.all(peoplePromises)
    next()
}) */

mechanicSchema.pre("save", function(next){
    this.slug = slugify(this.name, {lower:true})
    next()
})

mechanicSchema.virtual("timepris").get(function() {
    //return this.experience ? this.experience *120 : 100;
    return this.experience * 120;
})

mechanicSchema.post("save", function(doc, next){
    console.log(doc)
    next()
})

mechanicSchema.pre(/^find/, function() {
    this.populate({
        path: "people",
        select: "-__v -createdAt",
    })
}
)

mechanicSchema.pre(/^find/, function(next) {
    this.populate({
        path: "people"
    })
    next()
})

const Mechanic = mongoose.model("Mechanic", mechanicSchema)

export default Mechanic