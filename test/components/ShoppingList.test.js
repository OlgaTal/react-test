import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Shopping from '../../src/components/Shopping';
import ShoppingList from '../../src/components/ShoppingList';
let list;

beforeEach(() => {
  list = mount(<ShoppingList />);
  list.setState({cart: [
    {item: 'Tomato', category: 'Produce', 
    time: 100, done: false, hash: '123abc'},
    {item: 'Chicken', category: 'Meat', 
    time: 200, done: true, hash: '123def'}
  ]});
});

afterEach(() => {
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShoppingList />, div);
});

it('has a title', () => {
  const wrapper = shallow(<ShoppingList />);
  expect(wrapper.find('h1').text()).to.equal('Shopping List');
});

it('has an empty list', () => {
  const wrapper = shallow(<ShoppingList />);
  expect(wrapper.state('cart')).to.have.length(0);
});

it('will receive props when parent sends update', () => {
  sinon.spy(ShoppingList.prototype, 'componentWillReceiveProps');
  const clock = sinon.useFakeTimers(300);
  const wrapper = mount(<Shopping />);
  wrapper.ref('item').get(0).value = 'Steak';
  wrapper.ref('category').get(0).value = 'Meat';
  wrapper.find('button').simulate('click');
  expect(ShoppingList.prototype.componentWillReceiveProps.calledOnce).to.be.true;
  expect(ShoppingList.prototype.componentWillReceiveProps.calledWith(sinon.match({
    cart: [{ item: 'Steak',
             category: 'Meat',
             time: 300,
             done: false,
             hash: 'b696d1c6b7b3e1ad8900357fb7b3f901' }]
  }))).to.be.true;
  expect(wrapper.state('cart')).to.have.length(1);
  clock.restore();
  sinon.restore();
});

it('should change Tomato to done', () => {
  list.find('button.complete').at(0).simulate('click');
  expect(list.state('cart')[0].done).to.be.true;
});

it('should render a list of items', () => {
  list.find('button.complete').at(0).simulate('click');
  expect(list.find('span').at(0).text()).to.equal('Tomato');
});
