import React from 'react';
import { Status } from '@/constants';
import { useAppContext } from '@/Context';
import './Popup.css';

const Popup = ({ children }: { children: React.ReactNode }) => {
    const { appState: { status } } = useAppContext();

    if (status === Status.ongoing)
        return null;

    return (
        <div className="popup">
            {React.Children.toArray(children)}
        </div>
    );
}

export default Popup;
