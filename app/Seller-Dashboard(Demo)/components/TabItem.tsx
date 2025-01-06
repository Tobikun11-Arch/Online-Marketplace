import React from 'react';
import { LucideProps } from 'lucide-react'; 
type IconType = React.ComponentType<LucideProps>;

// Define the props for the TabItem component
interface TabItemProps {
    icon: IconType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ icon: Icon, label, isActive, onClick }) => {
    return (
        <div
            className={`flex gap-2 items-center rounded-md hover:bg-blue-600 pl-3 py-2 hover:text-white ${
                isActive ? 'bg-blue-600 text-white' : ''
            }`} onClick={onClick}>
            <Icon size={20} />
            <h2>{label}</h2>
        </div>
    );
};

export default TabItem;