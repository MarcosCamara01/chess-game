import React from 'react';
import { Status } from '@/constants';
import { useAppContext } from '@/Context';

const Popup = ({ children }: { children: React.ReactNode }) => {
    const { appState: { status } } = useAppContext();

    if (status === Status.ongoing)
        return null;

    return (
        <div className="absolute inset-0 flex content-center bg-highlight">
            {React.Children.toArray(children)}
        </div>
    );
}

export default Popup;
