import axios from 'axios'

export const userData = async() => {
  const token = localStorage.getItem('token');
   
     if (!token) {
       
        console.log("Token error", token)
        return
             
     }
 
     try {
 
             const response = await axios.get('https://online-marketplace-backend-six.vercel.app/api/productList', {
             headers: {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json',
              },
               });
               const data = response.data;
               return data;
     } 
     
     catch (error) {
         console.error('Error making request:', error);
 
     }
 
 }