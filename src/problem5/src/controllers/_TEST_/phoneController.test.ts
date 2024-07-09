import { Request, Response } from 'express';
import status from '../../const/status';
import logger from '../../logger';
import { createPhone, deletePhone, getPhone, listPhones, updatePhone } from '../phoneController';
import * as phoneService from '../../service/phoneService'; 

jest.mock('../../service/phoneService'); 
jest.mock('../../logger');

describe('Phone Controller', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  describe('createPhone', () => {
    it('should return 400 if phone data is invalid', async () => {
      req.body = {};
      await createPhone(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid phone data. Please provide id , name, description ." });
    });

    it('should call createPhone with correct data', async () => {
      const phoneData = { id: '10', name: 'Phone 1', description: 'Description 1' };
      req.body = phoneData;
      const response = { status: status.SUCCSES, data: phoneData };
      (phoneService.createPhone as jest.Mock).mockResolvedValue(response); 
      await createPhone(req, res);
      expect(phoneService.createPhone).toHaveBeenCalledWith(phoneData); 
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(phoneData);
    });

    it('should return 500 if an error occurs', async () => {
      const phoneData = { id: '1', name: 'Phone 1', description: 'Description 1' };//Exited id
      req.body = phoneData;
      (phoneService.createPhone as jest.Mock).mockRejectedValue(new Error('Something went wrong'));
      await createPhone(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong when creating the phone." });
    });
  });

  describe('listPhones', () => {
    it('should call listPhones and return 200', async () => {
      const response = { status: status.SUCCSES, data: [{ id: '1', name: 'Phone 1', description: 'Description 1' }] };
      (phoneService.listPhones as jest.Mock).mockResolvedValue(response);
      await listPhones(req, res);
      expect(phoneService.listPhones).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(response.data);
    });


    it('should return 500 if an error occurs', async () => {
      (phoneService.listPhones as jest.Mock).mockRejectedValue(new Error('Something went wrong')); 
      await listPhones(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong when getting the list of phones." });
    });
  });

  describe('getPhone', () => {
    it('should call getPhone with correct id and return 200', async () => {
      req.params.id = '1';
      const response = { status: status.SUCCSES, data: { id: '1', name: 'Phone 1', description: 'Description 1' } };
      (phoneService.getPhone as jest.Mock).mockResolvedValue(response); 
      await getPhone(req, res);
      expect(phoneService.getPhone).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(response.data);
    });


    it('should return 500 if an error occurs', async () => {
      req.params.id = '1';
      (phoneService.getPhone as jest.Mock).mockRejectedValue(new Error('Something went wrong')); 
      await getPhone(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong when getting the phone by ID." });
    });
  });

  describe('updatePhone', () => {
    it('should return 400 if phone data is invalid', async () => {
      req.params.id = '1';
      req.body = {};
      await updatePhone(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid phone data. Please provide id , name, description ." });
    });

    it('should call updatePhone with correct data', async () => {
      req.params.id = '1';
      const phoneData = { id: '1', name: 'Phone 1', description: 'Description 1' };
      req.body = phoneData;
      const response = { status: status.SUCCSES, data: phoneData };
      (phoneService.updatePhone as jest.Mock).mockResolvedValue(response); 
      await updatePhone(req, res);
      expect(phoneService.updatePhone).toHaveBeenCalledWith('1', phoneData); 
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(phoneData);
    });

    it('should return 500 if an error occurs', async () => {
      req.params.id = '1';
      const phoneData = { id: '1', name: 'Phone 1', description: 'Description 1' };
      req.body = phoneData;
      (phoneService.updatePhone as jest.Mock).mockRejectedValue(new Error('Something went wrong'));
      await updatePhone(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong when updating the phone." });
    });
  });

  describe('deletePhone', () => {
    it('should call deletePhone with correct id and return 204', async () => {
      req.params.id = '1';
      const response = { status: status.SUCCSES };
      (phoneService.deletePhone as jest.Mock).mockResolvedValue(response); 
      await deletePhone(req, res);
      expect(phoneService.deletePhone).toHaveBeenCalledWith('1'); 
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return 500 if an error occurs', async () => {
      req.params.id = '1';
      (phoneService.deletePhone as jest.Mock).mockRejectedValue(new Error('Something went wrong')); // Mock phoneService.deletePhone
      await deletePhone(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong when deleting the phone." });
    });
  });
});
