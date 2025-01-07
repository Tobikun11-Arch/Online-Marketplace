import { useState, useEffect } from 'react';

const UseScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    });

    useEffect(() => {
        const handleResize = () => {
        setScreenSize({ width: window.innerWidth });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); 

    return screenSize;
};

export default UseScreenSize;