import LogReg from './LogReg/page'
import Mailpop from './SendEmail.tsx/Mailpop'

export default function page() {

  return (
    <>

    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">

    <LogReg />

    </div>

    <div className="w-full h-screen bg-gray-100">

    <Mailpop />

    </div>
      

    </>
  )
}
