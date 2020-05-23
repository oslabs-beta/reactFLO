import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer'
import { StateDisplay } from '../../extension/frontend/StateDisplay';
import ReactJson from 'react-json-view';

configure({ adapter: new Adapter() });

describe('StateDisplay unit tests', () => {
  let wrapper;
  const StateDisplayProps = {
    title: 'title',
    json: null
  }

  // if props.json falsey
  it('StateDisplay should render an empty div if props.json is false', () => {
    wrapper = shallow(<StateDisplay {...StateDisplayProps} />)
    expect(wrapper.find('h2')).toHaveLength(0);
    expect(wrapper.find(ReactJson)).toHaveLength(0);
    // expect(wrapper.find(ReactJson).prop('src')).toHaveLength(0);
    // expect(wrapper.find(ReactJson).prop('name')).toHaveLength(0);
    // expect(wrapper.find(ReactJson).prop('collapsed')).toHaveLength(0);
    // expect(wrapper.find(ReactJson).prop('enableClipboard')).toHaveLength(0);
  })
})
// if props.json truthy..
  // render h2 with props.title
  // render ReactJson component
    // render props src value props.json, name value props.title, 
    // collapse value true, enableClipboard value valse
