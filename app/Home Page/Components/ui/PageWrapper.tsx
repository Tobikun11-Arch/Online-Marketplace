"use client"
import React from 'react'
import { motion, AnimatePresence } from "framer-motion"

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper = ({children}: PageWrapperProps) => {
    return (
        <>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='min-h-screen flex items-center justify-center'>
                {children}
            </motion.div>
        </>
    )
}

export default PageWrapper


{/* <AnimatePresence>
<motion.div 
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className='min-h-screen flex items-center justify-center'> 
    {children}
</motion.div>
</AnimatePresence> */}