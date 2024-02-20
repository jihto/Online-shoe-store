// AppContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ProductProps } from '../types/Product.interface';

interface ShoppingState {
    searchQuery: string;
    searchResults: ProductProps[];
    sort: Sort;
}
 

interface AppAction {
    type: string;
    payload?: any;
}

const ShoppingContext = createContext<{ state: ShoppingState; dispatch: React.Dispatch<AppAction> } | undefined>(undefined);

const initialState: ShoppingState = {
    searchQuery: '',
    searchResults: [],
    sort: ''
};

const reducer = (state: ShoppingState, action: AppAction): ShoppingState => {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'SET_SEARCH_RESULTS':
            return { ...state, searchResults: action.payload };
        case 'SET_SORT_QUERY':
            return { ...state, sort: action.payload };
        default:
            return state;
    }
};

interface AppProviderProps {
    children: ReactNode;
}

export const ShoppingProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ShoppingContext.Provider value={{ state, dispatch }}>
            {children}
        </ShoppingContext.Provider>
    );
};

export const useShoppingContext = (): { state: ShoppingState; dispatch: React.Dispatch<AppAction> } => {
    const context = useContext(ShoppingContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
