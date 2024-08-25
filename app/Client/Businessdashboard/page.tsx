import '../../Client/auth/Css/Background.css'
import Slidebar from '../Components/Slidebar'
import AddProducts from '../Components/addProducts'

export default function page() {

  return (
   <>

    <div className="w-full h-screen flex bg-gray-900" style={{filter: 'drop-shadow(-8px 7px 0px #008000)'}}>
    <Slidebar />
    <div className="lg:pt-3 lg:pb-3 lg:w-full w-full lg:pr-2 lg:pl-3">
    <AddProducts />
    </div>
    </div>

   </>
  )
}
