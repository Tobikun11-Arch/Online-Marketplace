import '../../Client/auth/Css/Background.css'
import Slidebar from '../Components/Slidebar'
import AddProducts from '../Components/addProducts'
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

export default function Page() {

  return (
   <>

    <div className="w-full h-screen flex bg-gray-900" style={{filter: 'drop-shadow(-8px 7px 0px #008000)'}}>
    <Slidebar/>
    <div className="lg:pt-3 lg:pb-3 lg:w-full w-full lg:pr-3 lg:pl-3">

    <div className="h-full bg-white pt-7 lg:ml-0 lg:rounded-3xl">

    <AddProducts />
    
    </div>
    </div>

    </div>

   </>
  )
}




  
