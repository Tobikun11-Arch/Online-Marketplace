import { useState } from 'react'

interface formDetails {

    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;

}

export const useForm = (initialState: formDetails) => {

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      return {formData, setFormData, handleChange};
};