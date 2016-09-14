import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Shopping from '../../src/components/Shopping';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Shopping />, div);
});

it('has a title', () => {
  const wrapper = shallow(<Shopping />);
  expect(wrapper.find('h1').text()).to.equal('Shopping Cart');
});

it('has an empty list', () => {
  const wrapper = shallow(<Shopping />);
  expect(wrapper.state('cart')).to.have.length(0);
});

it('has add called on button click', () => {
  sinon.spy(Shopping.prototype, 'add');
  const wrapper = mount(<Shopping />);
  wrapper.find('button').simulate('click');
  expect(Shopping.prototype.add.calledOnce).to.be.true;
  sinon.restore();
});

it('has add construct an item and add to list', () => {
  const clock = sinon.useFakeTimers(300);
  const wrapper = mount(<Shopping />);
  wrapper.ref('item').get(0).value = 'Steak';
  wrapper.ref('category').get(0).value = 'Meat';
  wrapper.find('button').simulate('click');
  expect(wrapper.state('cart')).to.have.length(1);
  expect(wrapper.state('cart')[0].done).to.be.false;
  expect(wrapper.state('cart')[0].hash).to.equal('b696d1c6b7b3e1ad8900357fb7b3f901');
  sinon.restore();
  clock.restore();
});
