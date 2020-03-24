import React from 'react'
// import ReactShallowRenderer from 'react-test-renderer/shallow'
import toJSON from 'enzyme-to-json'
import {shallow} from 'enzyme'
import {Header} from '../../components/Header'

let wrapper, startLogout

beforeEach(() => {
  startLogout = jest.fn()
  wrapper = shallow(
    <Header 
      startLogout={startLogout}
    />)
})

test('should render header component', () => {
  expect(toJSON(wrapper)).toMatchSnapshot()
  // expect(wrapper.find('h1').text()).toBe('Expensify')
  // const renderer = new ReactShallowRenderer()
  // renderer.render(<Header />)
  // expect(renderer.getRenderOutput()).toMatchSnapshot()
})

test('shold call start logout click', () => {
  wrapper.find('button').simulate('click')
  expect(startLogout).toHaveBeenCalled()
})