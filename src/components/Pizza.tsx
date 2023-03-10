import React from "react";
import { useStateDispatch } from "./AppContext";
import { IPizza } from "../types";

interface Props {
  pizza: IPizza;
}

const Pizza: React.FC<Props> = ({ pizza }) => {
  const dispatch = useStateDispatch();
  const handleCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item: {
          id: pizza.id,
          name: pizza.name,
          price: pizza.price,
        },
      },
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
