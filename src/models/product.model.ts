import {Schema, model} from 'mongoose'
import Product from '../types/product'

export const ProductSchema = new Schema<Product>({
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    amount:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number
    },
    listId:{
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
    paid:{
        type: Boolean,
    }
})

ProductSchema.pre('save', function(next){
    this.total_price = this.price * this.amount;
    next()
})

export const ProductModel = model<Product>('Product', ProductSchema)