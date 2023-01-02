import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
} from "react";

interface AppContextValue {
  cart: {
    items: { id: number; name: string; price: number; quantity: number }[];
  };
}

interface Props {}

const defaultContext: AppContextValue = {
  cart: {
    items: [],
  },
};

export const AppContext = createContext(defaultContext);

export const AppSetStateContext = createContext<
  React.Dispatch<React.SetStateAction<AppContextValue>> | undefined
>(undefined);

export const useSetState = () => {
  const setState = useContext(AppSetStateContext);
  return setState;
};

const AppStateProvider: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, setState] = useState(defaultContext);
  return (
    <AppContext.Provider value={state}>
      <AppSetStateContext.Provider value={setState}>
        {children}
      </AppSetStateContext.Provider>
    </AppContext.Provider>
  );
};

export default AppStateProvider;
