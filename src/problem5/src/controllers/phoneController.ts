import { Request, Response } from 'express';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL||"http://localhost:3001/phone";

const createPhone = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(BASE_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    
    res.status(500).json({ error: "some thing went wrong when create new phone" });
  }
};

const listPhones = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(BASE_URL);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "some thing went wrong when get list phone"});
  }
};

const getPhone = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${BASE_URL}/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "some thing went wrong when get phone by id" });
  }
};

const updatePhone = async (req: Request, res: Response) => {
  try {
    const response = await axios.put(`${BASE_URL}/${req.params.id}`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "some thing went wrong when update phone" });
  }
};

const deletePhone = async (req: Request, res: Response) => {
  try {
    await axios.delete(`${BASE_URL}/${req.params.id}`);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "some thing went wrong when delete phone"});
  }
};
export { createPhone, listPhones, getPhone, updatePhone, deletePhone };