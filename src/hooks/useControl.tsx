import { createContext, useContext } from 'react';
import { ControlContextType } from '../types/types';

export const ControlContext = createContext<ControlContextType | undefined>(undefined);

export function useControl() {
    const context = useContext(ControlContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
} 