import React, { Component } from "react";
import { FiShoppingCart } from "react-icons/fi";

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

  render() {
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
          <span>2 Pizza(s)</span>
        </button>
        <div
          className="cartDropDown"
          style={{ display: this.state.isOpen ? "block" : "none" }}
        >
          <ul>
            <li>Napoletana</li>
            <li>Marinara</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Cart;
