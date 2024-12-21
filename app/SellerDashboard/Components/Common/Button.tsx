import React, {ReactNode} from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    children: ReactNode;
}

export default function Button({children, ...props}: ButtonProps) {
  return (
   <>   
    <button {...props}>{children}</button>
   </>
  )
}
