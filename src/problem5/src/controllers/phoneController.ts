import { Request, Response } from 'express';
import {validatePhoneData} from '../models/phone';
import * as phoneService  from '../service/phoneService';
import status from '../const/status';
import logger from '../logger';

const handleErrorResponse = (response: any) => {
  if (response.status === status.ERROR) {
    const err = response.data as string;
    logger.error(err);
    throw new Error();
    
  }
};

const createPhone = async (req: Request, res: Response) => {
  try {
    const phoneData = validatePhoneData(req.body);
    if (!phoneData) {
      return res.status(400).json({ error: "Invalid phone data. Please provide id , name, description ." });
    }

    const response = await phoneService.createPhone(phoneData);
    handleErrorResponse(response);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong when creating the phone." });
  }
};

const listPhones = async (req: Request, res: Response) => {
  try {
    const response = await phoneService.listPhones();
    handleErrorResponse(response);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong when getting the list of phones." });
  }
};

const getPhone = async (req: Request, res: Response) => {
  try {
    const response = await phoneService.getPhone(req.params.id);
    handleErrorResponse(response);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong when getting the phone by ID." });
  }
};

const updatePhone = async (req: Request, res: Response) => {
  try {
    const phoneData = validatePhoneData(req.body);
    if (!phoneData) {
      return res.status(400).json({ error: "Invalid phone data. Please provide id , name, description ." });
    }

    const response = await phoneService.updatePhone(req.params.id,phoneData);
    handleErrorResponse(response);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong when updating the phone." });
  }
};

const deletePhone = async (req: Request, res: Response) => {
  try {
    const response = await phoneService.deletePhone(req.params.id);
    handleErrorResponse(response);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong when deleting the phone." });
  }
};

export { createPhone, listPhones, getPhone, updatePhone, deletePhone };
