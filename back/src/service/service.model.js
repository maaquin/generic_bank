import mongoose, { Schema } from "mongoose";

const serviceSchema = mongoose.Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
    },
    monto: {
        type: String
    }
})

export default mongoose.model('Service', serviceSchema)