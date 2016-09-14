import React, { Component } from 'react';
var classNames = require('classnames');

class ShoppingList extends Component {
  constructor(props){
    super(props);
    this.state = {cart: []};
  }

  componentWillReceiveProps(props){
    this.setState({cart: props.cart});
  }

  complete(hash){
    const item = this.state.cart.find(i => i.hash === hash);
    item.done = !item.done;
    this.setState({ cart: this.state.cart });
  }

  render() {
    return (
      <div>
        <h1>Shopping List</h1>
        {this.state.cart.map(c => {
          const css = classNames({'shopping-complete': c.done});
          return (
            <div className={css} key={c.hash}>
              <button className='complete' onClick={this.complete.bind(this, c.hash)}>Complete</button>
              <span>{c.item}</span>
              <span>{c.category}</span>
              <span>{c.time}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShoppingList;
