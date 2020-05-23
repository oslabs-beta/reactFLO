import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import { StateDisplay } from '../../extension/frontend/StateDisplay';
import ReactJson from 'react-json-view';

configure({ adapter: new Adapter() });

describe('StateDisplay unit tests', () => {

  // Set json value to null 
  const nullProps = {
    title: 'title',
    json: null
  }

  // Set json value to truthy
  const stateNodeProps = {
    title: 'title',
    json: {
      key: 'key',
      value: 'value',
      topComponent: 'any',
      components: [],
      type: null
    }
  }

  // Shallow copy of StateDisplay when json value is null
  const wrapperJsonFalse = shallow(<StateDisplay {...nullProps} />)
  // Shallow copy of StateDisplay when json exists
  const wrapperJsonTrue = shallow(<StateDisplay {...stateNodeProps} />)

  // StateDisplay should not render anything if json is null
  it('StateDisplay should render an empty div if props.json is null', () => {
    expect(wrapperJsonFalse.find('h2')).toHaveLength(0);
    expect(wrapperJsonFalse.find(ReactJson)).toHaveLength(0);
  })


  it('StateDisplay should render a div with a <h1> and React Json component if props.json is not null', () => {
    expect(wrapperJsonTrue.find('h2').text()).toBe(stateNodeProps.title);
    expect(wrapperJsonTrue.find(ReactJson)).toHaveLength(1);
  })

  it('ReactJson should have correct values for src, name, collapsed, and enableClipboard props, ', () => {
    expect(wrapperJsonTrue.find(ReactJson).prop('src')).toBe(stateNodeProps.json);
    expect(wrapperJsonTrue.find(ReactJson).prop('name')).toBe(stateNodeProps.title);
    expect(wrapperJsonTrue.find(ReactJson).prop('collapsed')).toBe(true);
    expect(wrapperJsonTrue.find(ReactJson).prop('enableClipboard')).toBe(false);
  })
})