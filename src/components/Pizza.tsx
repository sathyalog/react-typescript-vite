import React from "react";
import { useSetState } from "./AppContext";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Props {
  pizza: Pizza;
}

const Pizza: React.FC<Props> = ({ pizza }) => {
  const setState = useSetState();
  const handleCart = () => {
    setState((state: { cart: { items: any } }) => {
      const itemExists = state.cart.items.find(
        (item: Pizza) => item.id === pizza.id
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          items: itemExists
            ? state.cart.items.map((item: Pizza) => {
                if (item.id === pizza.id) {
                  return {
                    ...item,
                    quantity: item.quantity + 1,
                  };
                }
                return item;
              })
            : [
                ...state.cart.items,
                {
                  id: pizza.id,
                  name: pizza.name,
                  price: pizza.price,
                  quantity: 1,
                },
              ],
        },
      };
    });
  };
  return (
    <li className="pizza-container">
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button onClick={handleCart}>Add to cart</button>
    </li>
  );
};

export default Pizza;
