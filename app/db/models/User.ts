import { Schema, model, Types, type InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/@/, "Please provide a valid email address containing '@.'"],     
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: [30, "Password must be less than 30 characters long"],
        select: false,
    },
    displayName: {
        type: String,
        default: "User",
        trim: true,
        maxlength: [30, "Display name must be less than 30 characters long"],
    },
    onboardingComplete: {
        type: Boolean,
        default: false,
    },
},
 {timestamps: true}
);

//Password hashing before saving
userSchema.pre("save", async function() {
    const user = this;
    if(!user.isModified("password")) return;

    if(!user.password) return;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

});

export type UserType = InferSchemaType<typeof userSchema> & {
    _id: Types.ObjectId;
  };

export default model<UserType>("User", userSchema);