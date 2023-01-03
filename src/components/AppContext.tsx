import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface AppContextValue {
  cart: {
    items: CartItem[];
  };
}

interface Props {}

const defaultContext: AppContextValue = {
  cart: {
    items: [],
  },
};

export const AppContext = createContext(defaultContext);

export const AppDispatchContext = createContext<
  React.Dispatch<AddToCartAction> | undefined
>(undefined);

interface Action<T> {
  type: T;
}

interface AddToCartAction extends Action<"ADD_TO_CART"> {
  payload: {
    item: Omit<CartItem, "quantity">;
  };
}

const reducer = (state: AppContextValue, action: AddToCartAction) => {
  if (action.type === "ADD_TO_CART") {
    const itemToAdd = action.payload.item;
    const itemExists = state.cart.items.find(
      (item) => item.id === itemToAdd.id
    );
    return {
      ...state,
      cart: {
        ...state.cart,
        items: itemExists
          ? state.cart.items.map((item) => {
              if (item.id === itemToAdd.id) {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                };
              }
              return item;
            })
          : [...state.cart.items, { ...itemToAdd, quantity: 1 }],
      },
    };
  }
  return state;
};

export const useStateDispatch = () => {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) {
    throw Error(
      "useStateDispatch must be used inside AppDispatchContext.Provider"
    );
  }
  return dispatch;
};

const AppStateProvider: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultContext);
  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default AppStateProvider;
