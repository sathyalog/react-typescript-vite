import React, { Component } from "react";
import { FiShoppingCart } from "react-icons/fi";

interface Props {}

interface State {
  isOpen: boolean;
}

export class Cart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <div className="cartContainer">
        <button
          type="button"
          className="cartButton"
          onClick={() => {
            this.setState({
              isOpen: !this.state.isOpen,
            });
          }}
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
