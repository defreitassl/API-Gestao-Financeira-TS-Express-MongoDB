import { Schema, model, Document, Types } from 'mongoose'


export interface ITransaction extends Document {
    userId: Types.ObjectId,
    categoryId: Types.ObjectId,
    name: string,
    amount: number,
    inflow: boolean,
    paymentMethod: "Pix" | "Cartão" | "Dinheiro" | "Transferência",
    description?: string,
    recipient?: string,
    date?: string
}

const transactionSchema = new Schema<ITransaction>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    inflow: { type: Boolean, required: true },
    paymentMethod: { type: String, enum: ["Pix", "Cartão", "Dinheiro", "Transferência"], required: true },
    description: { type: String },
    recipient: { type: String },
    date: { type: String, default: Date.now }
}, {
    strict: "throw"
})

const Transaction = model<ITransaction>("Transaction", transactionSchema)


export default Transaction