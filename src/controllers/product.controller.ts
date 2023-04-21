import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { ListModel } from "../models/lista.model";
import mongoose from "mongoose";

export const createProduct = async (req: Request, res: Response) => {
    const {listId} = req.query
    const { name, price, amount } = req.body
    if(!name || !price || !amount){
        res.status(400).send({msg: "Introduce a valid user"})
    }   
    try{
        const newProduct = new ProductModel({name, amount, price, listId});
        const list = await ListModel.findById(listId)
        if(list){
            const product = await newProduct.save()
            if(product){
                res.status(201).send(product)
            }else{
                res.status(401).send({msg: "Error at create product"})
            }
        }else{
            res.status(404).send({msg: "List not found"})
        }      
    }catch(error){
        res.status(500).send(error)
    }
}

export const getProducts = async( req: Request, res: Response )=>{
    try {
        const products = await ProductModel.find({})
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getProductById = async( req: Request, res: Response) => {
    const {productId} = req.query
    try {
        const product = await ProductModel.findById(productId)
        if(product){
            res.status(200).send(product)
        }
        else{
            res.status(404).send({msg: "Product not found"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteProductById = async( req: Request, res: Response) => {
    const {productId} = req.query
    try {
        const product = ProductModel.findByIdAndDelete(productId)
        if(product){
            res.status(200).send(product)
        }else{
            res.status(404).send(product)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateProductById = async( req: Request, res: Response) => {
    const {productId} = req.query
    const {name, amount, price} = req.body
    const total_price = amount * price
    const date = new Date()
    const newProduct = await ProductModel.findByIdAndUpdate(productId, {$set:{name, amount, price, date, total_price}}).exec()
    if(newProduct){
        res.status(200).send(newProduct)
    }else{
        res.status(404).send({msg: "Product not found"})
    }
}

export const getAllProductsByList = async (req: Request, res: Response) => {
    const listId = req.query.listId as string;
    try {
        const result = await ProductModel.aggregate([
            {
                $match: {
                    listId: new mongoose.Types.ObjectId(listId)
                }
            }
        ])
        if(result){
            res.status(200).send(result)
        }else{
            res.status(404).send({msg: "this list not contain any product"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}