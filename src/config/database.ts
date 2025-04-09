import mongoose from "mongoose"


mongoose.Promise = global.Promise
async function connectDB() {
    try {
        await mongoose.connect(`${process.env.DB_URI}`).then(() => {
            console.log("Connected to MongoDB...")
        })
    } catch (error) {
        console.error("Could not connect to MongoDB: " + error)
    }
}

export default connectDB