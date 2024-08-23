import React from 'react'
import '../../Client/auth/Css/Background.css'

export default function page() {
  return (
   <>

    <div className="w-full h-screen flex">

    <nav className='w-3/12 h-screen bg-white'>
    
    </nav>


    <main className='w-3/4 h-screen bg-white flex'>

    <div className='custom-color w-2/3 h-screen'>
    
    <h1 className='ml-12 mt-4 font-bold text-2xl'>Business Dashboard</h1>

    <div className="w-full flex justify-center">
    <div className='w-11/12 h-24 mt-3 bg-transparent flex items-center'>

      <div className='flex w-52 h-20 bg-blue-500 rounded-lg flex-col justify-center ml-5'>
        <p className='text-white font-bold ml-5'>CUSTOMERS</p>
        <p className='text-white ml-5'>1,021</p>
      </div>

      <div className='flex w-52 h-20 bg-blue-500 rounded-lg flex-col justify-center ml-5'>
        <p className='text-white font-bold ml-5'>INCOME</p>
        <p className='text-white ml-5'>$2,054</p>
      </div>

      <div className='flex w-52 h-20 bg-blue-500 rounded-lg flex-col justify-center ml-5'>
      <p className='text-white font-bold ml-5'>PRODUCTS SOLD</p>
      <p className='text-white ml-5'>321</p>
      </div>

    </div>
    </div> {/**close of 3 box */}

    <h1 className='mt-7 ml-12 font-bold'>Marketplace</h1>

    <div className='w-full flex' style={{height: '300px'}}>

    <div className='flex h-full w-7/12 bg-transparent ml-12 flex-col justify-center gap-9'>
    
    <div className="customwhite h-32 rounded-2xl w-11/12">
    <p>Hotdog 1</p>
    </div>

    <div className="customwhite shadow-sm h-32 rounded-2xl w-11/12">
    <p>Hotdog 2</p>
    </div>
    
    </div>

    <div className='text-black w-64 h-full flex items-center'>
    <div className="w-11/12 h-full bg-white rounded-xl customwhite">
    <p >Hotdog 3</p>
    </div>
    </div>

    </div> {/**Section closed */}
    
    <div className='flex mt-5 ml-11 justify-between'>
    <h1 className='font-bold'>Recent Orders</h1>
    <h1 className='mr-11 font-bold text-sm text-blue-700'>SEE ALL</h1>
    </div>
    
    <footer className='mt-7 ml-11'>
      <h1>Details</h1>
    </footer>
    
    </div> {/**Main close */}

    <aside>
      <h1>aside</h1>
    </aside>

    </main>

    </div>

   </>
  )
}
