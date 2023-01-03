import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useReducer,
  useEffect,
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

interface InitializeCartAction extends Action<"INITIALIZE_CART"> {
  payload: {
    cart: AppContextValue["cart"];
  };
}

const reducer = (
  state: AppContextValue,
  action: AddToCartAction | InitializeCartAction
) => {
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
  } else if (action.type === "INITIALIZE_CART") {
    return { ...state, cart: action.payload.cart };
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

  useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    if (cart) {
      dispatch({
        type: "INITIALIZE_CART",
        payload: { cart: JSON.parse(cart) },
      });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default AppStateProvider;
