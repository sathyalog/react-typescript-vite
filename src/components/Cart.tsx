import React, { Component } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AppContext } from "./AppContext";

interface Props {}

interface State {
  isOpen: boolean;
}

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export class Cart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    console.log(event.target);
    if (event.target as HTMLElement)
      this.setState({
        isOpen: !this.state.isOpen,
      });
  };

  /* we cannot use context hooks in class components and hence we are using render props here <AppContext.Consumer>{() => {}}</AppContext.Consumer>*/
  render() {
    return (
      <AppContext.Consumer>
        {(state) => {
          return (
            <div className="cartContainer">
              <button
                type="button"
                className="cartButton"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  this.handleClick(e)
                }
              >
                <FiShoppingCart />
                <span>{state.cart.items.length} Pizza(s)</span>
              </button>
              <div
                className="cartDropDown"
                style={{ display: this.state.isOpen ? "block" : "none" }}
              >
                <ul>
                  {state.cart.items.map((item) => (
                    <li key={item.id}>
                      {item.name} &times; {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default Cart;
