import React, { Component } from 'react';

class Hello extends Component {
  constructor(){
    super();
    this.state = { greeting: "" };
    this.hi = this.hi.bind(this);
  }

  hi(){
    const text = this.refs.name.value;
    this.setState({ greeting: `Hello, ${text}` });
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <input type="text" ref="name" />
        <button onClick={this.hi}>Say It</button>
        <div>{this.state.greeting}</div>
      </div>
    );
  }
}

export default Hello;
