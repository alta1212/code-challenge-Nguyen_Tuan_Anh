interface Phone {
    id: string;
    name: string;
    description: string;
}

  
const validatePhoneData = (phone: any): Phone | null => {
    if (!phone.id || !phone.name || !phone.description) {
      return null; // Invalid data
    }
    return {
      id: phone.id,
      name: phone.name,
      description: phone.description,
    };
  
};
export { validatePhoneData}