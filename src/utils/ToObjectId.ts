import { Types } from 'mongoose'
import { BadRequestError } from '../errors'

const toObjectId = (id: string): Types.ObjectId | false => {
  const objectId = new Types.ObjectId(id)
  const isValid = Types.ObjectId.isValid(objectId)

  if (!isValid) {
    return false
  }

  return objectId
}

export default toObjectId