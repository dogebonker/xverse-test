// src/contexts/coreServiceContext.tsx
import React, { createContext, useContext } from 'react';
import { CoreService } from '../services/core.service';

const CoreServiceContext = createContext<CoreService | undefined>(undefined);

export const CoreServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const coreService = new CoreService();
    return (
        <CoreServiceContext.Provider value={coreService}>
            {children}
        </CoreServiceContext.Provider>
    );
};

export const useCoreService = (): CoreService => {
    const context = useContext(CoreServiceContext);
    if (context === undefined) {
        throw new Error('useCoreService must be used within a CoreServiceProvider');
    }
    return context;
};
