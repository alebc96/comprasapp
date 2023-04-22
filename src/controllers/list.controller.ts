import { ListModel } from "../models/lista.model";
import { Request, Response } from "express";

export const createList = async (req: Request, res: Response) => {
  const {userId} = req.query
  const {name, description} = req.body
  if (!req.body.name) {
    return res.status(400).send("Please introduce a valid List");
  }
  const newList = new ListModel({name, description, userId});
  try {
    const list = await newList.save();
    res.status(201).send(list);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(422).send(error);
    } else {
      res.status(500).send(error);
    }
  }
};

export const getAllList = async (_req: Request, res: Response) => {
  try {
    const lists = await ListModel.find();
    res.status(200).send(lists);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getListById = async (req: Request, res: Response)=> {
    const {listId} = req.query
    try {
        const list = await ListModel.findById(listId).exec()
        if(list){
            res.status(200).send(list)
        }else{
            res.status(404).json({msg: "List not found"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateList = async (req: Request, res: Response)=> {
    const {listId} = req.query
    const {name, description} = req.body
    try {
        const list = await ListModel.findByIdAndUpdate({_id: listId}, {$set:{name, description}}).exec()
        if(list){
            res.status(200).send(list)
        }else{
            res.status(404).json({msg: "List not found"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteList = async (req: Request, res: Response) => {
    const {listId} = req.query
    try {
        const listDeleted = await ListModel.findByIdAndRemove(listId)
        if(listDeleted){
            res.status(200).send(listDeleted)
        }else{
            res.status(404).json({msg: 'List not found'})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}