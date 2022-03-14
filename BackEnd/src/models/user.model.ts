import mongoose from "mongoose";

export interface UserDocument {
    name: string,
    email: string
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required:true },
        email: {type: String , required:true , unique: true},
        password: {type: String, required:true },
        phoneNumber: {type:String}
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;