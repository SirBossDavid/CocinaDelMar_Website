import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

function cartReducer(state, action) { 
    switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.find(item => item.id === action.item.id);
      if (existing) {
        return state.map(item =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.item, quantity: 1 }];

    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.id);

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
 }

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

// custom hook — shortcut so any component just does: useCart()
export function useCart() {
  return useContext(CartContext)
}