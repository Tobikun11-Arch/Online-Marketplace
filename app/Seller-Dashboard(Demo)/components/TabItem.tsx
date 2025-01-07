import React from 'react';
import { LucideProps } from 'lucide-react'; 
type IconType = React.ComponentType<LucideProps>;
import UseScreenSize from './UseScreenSize'

// Define the props for the TabItem component
interface TabItemProps {
    icon: IconType;
    label?: string;
    isActive?: boolean;
    onClick?: () => void;
    tooltip?: string;
}

const TabItem: React.FC<TabItemProps> = ({ icon: Icon, label, isActive, onClick, tooltip }) => {
    const { width } = UseScreenSize();
    const isLargeScreen = width >= 1024; 

    return (
        <div
            className={`flex tooltip tooltip-right px-2 lg:gap-2 items-center rounded-md hover:bg-blue-600 justify-center lg:justify-start lg:pl-3 py-2 hover:text-white ${
                isActive ? 'bg-blue-600 text-white' : ''
            }`} onClick={onClick} data-tip={!isLargeScreen ? tooltip : ""}>
            <Icon size={20} className=""/>
            <h2 className='hidden lg:block'>{label}</h2>
        </div>
    );
};

export default TabItem;