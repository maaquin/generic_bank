import mongoose, { Schema } from "mongoose";

const promotionSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: String,
        required: true,
        min: 0,
        max: 100
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    validUntil: {
        type: Date,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Promotion', promotionSchema)