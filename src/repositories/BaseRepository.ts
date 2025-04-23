import { Model, Types } from "mongoose"
import { UpdateResult, DeleteResult } from "../types"


abstract class Repository<T> {
    protected model: Model<T>

    constructor (model: Model<T>) {
        this.model = model
    }

    getAll = async (): Promise<T[]> => {
        return this.model.find()
    }

    getOne = async (id: Types.ObjectId): Promise<T | null> => {
        return this.model
        .where("_id").equals(id)
        .findOne()
    }

    createOne = async (data: Partial<T>): Promise<T> => {
        return this.model.create(data)
    }

    updateOne = async (id: Types.ObjectId, data: Partial<T>): Promise<UpdateResult> => {
        return this.model
        .where("_id").equals(id)
        .updateOne(data)
    }

    deleteOne = async (id: Types.ObjectId): Promise<DeleteResult> => {
        return this.model
        .where("_id").equals(id)
        .deleteOne()
    }
}

export default Repository