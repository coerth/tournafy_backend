import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lower: true,
    trim: true,
    required: [true, "A user must have a email"],
    /* validate: {
      validator: function (email: string) {
        return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
      }, */
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address`,
    },
  hash_password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

 userSchema.method("comparePassword", function comparePassword(password) {
    return bcrypt.compareSync(password, this.hash_password)  
})

userSchema.method("isAdmin", function isAdmin() {
    return this.role == "Admin"
}) 



const UserModel = mongoose.model("User", userSchema);

export default UserModel;
