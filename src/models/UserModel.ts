import { Schema, Document, model } from 'mongoose'


interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    balance?: number,
    transactions?: Schema.Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    transactions: { type: [Schema.Types.ObjectId], ref: 'Transaction', default: [] }
})

const User = model<IUser>("User", userSchema)


export default User