// SellerContext.tsx
import React, { createContext, useContext, ReactNode, useState, useReducer } from 'react';

interface SellerData {
  name: string;
  products: string[]; // Adjust the type according to your data structure
}

interface SellerContextProps {
  sellerData: SellerData;
  updateSellerData: (newData: Partial<SellerData>) => void;
}

const SellerContext = createContext<{ sellerState: SellerState; dispatch: React.Dispatch<AppAction> } | undefined>(undefined);

interface SellerProviderProps {
  children: ReactNode;
}

const initialState: SellerState = {
    data: '',  
};

interface SellerState {
    data: string;  
}
 

interface AppAction {
    type: string;
    payload?: any;
}

const reducer = (sellerState: SellerState, action: AppAction): SellerState => {
    switch (action.type) {
        case 'SET_INFORMATION_SELLER':
            return { ...sellerState, data: action.payload };  
        default:
            return sellerState;
    }
};

export const useSellerContext = (): { sellerState: SellerState; dispatch: React.Dispatch<AppAction> } => {
    const context = useContext(SellerContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};


export const SellerProvider: React.FC<SellerProviderProps> = ({ children }) => {
    
    const [sellerState, dispatch] = useReducer(reducer, initialState);

    return <SellerContext.Provider value={{ sellerState, dispatch }}>
        {children}
        </SellerContext.Provider>;
};
