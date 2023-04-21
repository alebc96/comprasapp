import { Schema, model } from "mongoose";
import { ProductSchema } from "./product.model";
import ListOfProducts from "../types/lista";

export const ListSchema = new Schema<ListOfProducts>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})
export const ListModel = model<ListOfProducts>('List', ListSchema)