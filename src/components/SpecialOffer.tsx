import React from "react";
import { IPizza } from "../types";
import { useStateDispatch } from "./AppContext";

interface Props {
  pizza: IPizza;
}

export const SpecialOffer: React.FC<Props> = ({ pizza }) => {
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
    <div className="splcontainer">
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button onClick={handleCart}>Add to cart</button>
    </div>
  );
};
