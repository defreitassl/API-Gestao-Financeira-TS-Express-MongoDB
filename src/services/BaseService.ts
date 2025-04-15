import { Types, pluralize } from "mongoose"
import toObjectId from "../utils/ToObjectId"
import ServiceResponse from "../types/ServiceResponse"
import StatusCode from "../utils/StatusCode"
import Repository from "../repositories/BaseRepository"
import UpdateResult from "../types/UpdateRequestResult"
import DeleteResult from "../types/DeleteRequestResult"


abstract class Service<T> {
    protected repository: Repository<T>
    protected entityName: string

    constructor(repository: Repository<T>, entityName: string) {
        this.repository = repository
        this.entityName = entityName
        pluralize()
    }

    protected handleError(error: any, defaultMessage: string): ServiceResponse<null> {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"

        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            content: {
                message: defaultMessage,
                error: errorMessage,
            }
        }
    }

    getAll = async (): Promise<ServiceResponse<T[] | null>> => {
        try {
            const entities: T[] = await this.repository.getAll()
            const statusCode: StatusCode = entities.length === 0 ? StatusCode.NO_CONTENT : StatusCode.OK

            return {
                statusCode: statusCode,
                content: {
                    data: entities,
                    message: `${this.entityName}s retrieved successfully`,
                }
            }
        } catch (error) {
            const errorResponse: ServiceResponse<null> = this.handleError(error, `Error retrieving ${this.entityName}s`)
            return errorResponse
        }
    }

    getOne = async (idParam: string): Promise<ServiceResponse<T | null>> => {
        try {
            const id: Types.ObjectId = toObjectId(idParam)
            const entity: T | null = await this.repository.getOne(id)

            if (!entity) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: `${this.entityName} not found`,
                        error: "Not Found Error"
                    }
                }
            }

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: entity,
                    message: `${this.entityName} retrieved successfully`
                }
            }
        } catch (error) {
            const errorResponse: ServiceResponse<null> = this.handleError(error, `Error retrieving ${this.entityName}`)
            return errorResponse
        }
    }

    createOne = async (data: Partial<T>): Promise<ServiceResponse<T | null>> => {
        try {
            const entity: T = await this.repository.createOne(data)

            return {
                statusCode: StatusCode.CREATED,
                content: {
                    data: entity,
                    message: `${this.entityName} created successfully`
                }
            }
        } catch (error) {
            const errorResponse: ServiceResponse<null> = this.handleError(error, `Error creating ${this.entityName}`)
            return errorResponse
        }
    }

    updateOne = async (idParam: string, data: Partial<T>): Promise<ServiceResponse<UpdateResult | null>> => {
        try {
            const id: Types.ObjectId = toObjectId(idParam)
            const updatedEntityInfo: UpdateResult = await this.repository.updateOne(id, data)

            if (!updatedEntityInfo || updatedEntityInfo.matchedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        data: updatedEntityInfo,
                        message: `${this.entityName} not found`,
                        error: "Not Found Error"
                    }
                }
            }

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: updatedEntityInfo,
                    message: `${this.entityName} updated successfully`
                }
            }
        } catch (error) {
            const errorResponse: ServiceResponse<null> = this.handleError(error, `Error updating ${this.entityName}`)
            return errorResponse
        }
    }

    deleteOne = async (idParam: string): Promise<ServiceResponse<DeleteResult | null>> => {
        try {
            const id: Types.ObjectId = toObjectId(idParam)
            const deletedEntityInfo: DeleteResult = await this.repository.deleteOne(id)

            if (!deletedEntityInfo || deletedEntityInfo.deletedCount === 0) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    content: {
                        message: `${this.entityName} not found`,
                        error: "Not Found Error"
                    }
                }
            }

            return {
                statusCode: StatusCode.OK,
                content: {
                    data: deletedEntityInfo,
                    message: `${this.entityName} deleted successfully`
                }
            }
        } catch (error) {
            const errorResponse: ServiceResponse<null> = this.handleError(error, `Error deleting ${this.entityName}`)
            return errorResponse
        }
    }
}

export default Service
