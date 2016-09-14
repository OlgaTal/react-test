import React, { Component } from 'react';
import ShoppingList from './ShoppingList';
import md5 from 'md5';
import '../assets/Shopping.css';

class Shopping extends Component {
  constructor(){
    super();
    this.add = this.add.bind(this);
    this.state = {cart: []};
  }

  add(){
      const item = this.refs.item.value;
      const category = this.refs.category.value;
      const time = Date.now();
      const done = false;
      const hash = md5(item + category + time);
      this.setState({cart : [...this.state.cart, {item, category, time, done, hash}]})
  }

  render() {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <input type="text" ref="item" />
        <select ref="category">
            <option>Produce</option>
            <option>Meat</option>
            <option>Junk</option>
        </select>
        <button onClick={this.add}>Add</button>
        <ShoppingList cart={this.state.cart} />
      </div>
    );
  }
}

export default Shopping;
