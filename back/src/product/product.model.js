import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String,
    },
    imgUrl: {
        type: String
    },
    price: {
        type: Schema.Types.Number,
        required: true,
        min: 0.01
    },
    estado:{
        type: Boolean,
        default: true
    },
    discountedPrice: {
        type: Schema.Types.Number,
        min: 0.01
    },
})

export default mongoose.model('Product', productSchema)