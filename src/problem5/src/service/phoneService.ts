import axios from 'axios';
import status from '../const/status';

const BASE_URL = process.env.BASE_URL||"http://localhost:3001/phone";

const createPhone = async (phoneData:any) => {
    try {
        const response = await axios.post(BASE_URL, phoneData);
        return {
            status:status.SUCCSES,
            data:response.data
        }
    } catch (error) {
        
        return {
            status:status.ERROR,
            data:error
        }
    }
  };
  
  const listPhones = async () => {
    try {
      const response = await axios.get(BASE_URL);
      return {
            status:status.SUCCSES,
            data:response.data
        }
    } catch (error) {
        console.log(error);
        return {
            status:status.ERROR,
            data:error
        }
    }
  };
  
  const getPhone = async (id:string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return {
        status:status.SUCCSES,
        data:response.data
        }
    } catch (error) {
        return {
            status:status.ERROR,
            data:error
        }
    }
  };
  
  const updatePhone = async (id:string,data:any) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, data);
      return {
        status:status.SUCCSES,
        data:response.data
        }
    } catch (error) {
        return {
            status:status.ERROR,
            data:error
        }
    }
  };
  
  const deletePhone = async (id:string) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return {
            status:status.SUCCSES,
            data:null
        }
    } catch (error) {
        return {
            status:status.ERROR,
            data:error
        }
    }
  };
  
  export { createPhone, listPhones, getPhone, updatePhone, deletePhone };