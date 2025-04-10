import { Schema, Document, model } from 'mongoose'


export interface ICategory extends Document {
    name: string,
    color: string
}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    color: { type: String, required: true }
}, {
    strict: "throw"
})

const Category = model<ICategory>("Category", categorySchema)


export default Category