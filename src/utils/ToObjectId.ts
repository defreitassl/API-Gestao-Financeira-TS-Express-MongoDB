import { Types } from 'mongoose';

const toObjectId = (id: string): Types.ObjectId => {
  const objectId = new Types.ObjectId(id)
  const isValid = Types.ObjectId.isValid(objectId)

  if (!isValid) {
    throw new Error(`Invalid ObjectId: ${id}`)
  }

  return objectId
}

export default toObjectId