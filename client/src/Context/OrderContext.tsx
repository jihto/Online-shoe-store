// AppContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react'; 

interface OrderState {
    cartId: string; 
    currentContent: number;
}
 

interface AppAction {
    type: string;
    payload?: any;
}

const OrderContext = createContext<{ state: OrderState; dispatch: React.Dispatch<AppAction> } | undefined>(undefined);

const initialState: OrderState = {
    cartId: '', 
    currentContent: 0,
};

const reducer = (state: OrderState, action: AppAction): OrderState => {
    switch (action.type) {
        case 'SET_CART_ID':
            return { ...state, cartId: action.payload }; 
        case 'SET_CURRENT_CONTENT':
            return { ...state, currentContent: action.payload };
        default:
            return state;
    }
};
interface AppProviderProps {
    children: ReactNode;
}

export const OrderProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <OrderContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = (): { state: OrderState; dispatch: React.Dispatch<AppAction> } => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

