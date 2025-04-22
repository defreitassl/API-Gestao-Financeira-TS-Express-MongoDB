import { Types, pluralize } from "mongoose"
import toObjectId from "../utils/toObjectId"
import ServiceResponse from "../types/ServiceResponse"
import StatusCode from "../types/StatusCode"
import Repository from "../repositories/BaseRepository"
import UpdateResult from "../types/UpdateRequestResult"
import DeleteResult from "../types/DeleteRequestResult"
import { BadRequestError, NotFoundError } from "../errors"


abstract class Service<T> {
    protected repository: Repository<T>
    protected entityName: string

    constructor(repository: Repository<T>, entityName: string) {
        this.repository = repository
        this.entityName = entityName
        pluralize()
    }

    getAll = async (): Promise<ServiceResponse<T[]>> => {
        try {
            const entities: T[] = await this.repository.getAll()
            const message: string = entities.length === 0 ? `No ${this.entityName} found` : `${this.entityName}s retrieved successfully`

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: entities,
                    message: message,
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    getOne = async (idParam: string): Promise<ServiceResponse<T>> => {
        try {
            const id: Types.ObjectId | false = toObjectId(idParam)

            if (!id) throw new BadRequestError("Invalid id")

            const entity: T | null = await this.repository.getOne(id)

            if (!entity) throw new NotFoundError(`${this.entityName} not found | Wrong id`)

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: entity,
                    message: `${this.entityName} retrieved successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    createOne = async (data: Partial<T>): Promise<ServiceResponse<T>> => {
        try {
            if (!data || Object.keys(data).length === 0) throw new BadRequestError(`Missing ${this.entityName} data`)

            const entity: T = await this.repository.createOne(data)

            return {
                statusCode: StatusCode.CREATED,
                content: {
                    data: entity,
                    message: `${this.entityName} created successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    updateOne = async (idParam: string, data: Partial<T>): Promise<ServiceResponse<UpdateResult>> => {
        try {
            const id: Types.ObjectId | false = toObjectId(idParam)

            if (!id) throw new BadRequestError("Invalid id")
            if (!data || Object.keys(data).length === 0) throw new BadRequestError(`Missing ${this.entityName} data`)
                
            const updatedEntityInfo: UpdateResult = await this.repository.updateOne(id, data)

            if (!updatedEntityInfo || updatedEntityInfo.matchedCount === 0) throw new NotFoundError(`${this.entityName} not found | Wrong id`)

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: updatedEntityInfo,
                    message: `${this.entityName} updated successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }

    deleteOne = async (idParam: string): Promise<ServiceResponse<DeleteResult>> => {
        try {
            const id: Types.ObjectId | false = toObjectId(idParam)

            if (!id) throw new BadRequestError("Invalid id")

            const deletedEntityInfo: DeleteResult = await this.repository.deleteOne(id)

            if (!deletedEntityInfo || deletedEntityInfo.deletedCount === 0) throw new NotFoundError(`${this.entityName} not found | Wrong id`)

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: deletedEntityInfo,
                    message: `${this.entityName} deleted successfully`
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error()
        }
    }
}

export default Service
