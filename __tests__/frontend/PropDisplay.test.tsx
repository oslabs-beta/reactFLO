import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer'
import PropDisplay, { PropInfo } from '../../extension/frontend/PropDisplay';
import ReactJson from 'react-json-view';

configure({ adapter: new Adapter() });

describe("PropDisplay unit tests", () => {
  // Props when PropsList is null
  const propsNull = {
    title: 'title',
    propList: null,
    selectProp: () => console.log('selectProp')
  }
  // Props when PropsList exists
  const propExists = {
    title: 'title',
    propList: [{
      key: 'string',
      value: null,
      topComponent: 'any',
      components: [],
      type: null
    }],
    selectProp: () => console.log('selectProp')
  }
  // Wrapper for no props
  const wrapperNoProps = shallow(<PropDisplay {...propsNull} />);
  // Wrapper for props
  const wrapperWithProps = shallow(<PropDisplay {...propExists} />);

  // PropDisplay should render empty div if props.propList doesn't exist
  it('PropDisplay should render empty div if propsList is null', () => {
    expect(wrapperNoProps.find('div')).toHaveLength(1);
  });

  // PropDisplay should render an array of PropInfo components if props.propList exists
  it('PropDisplay should render a <h2> title and PropInfo component for every element in propList', () => {
    expect(wrapperWithProps.find('h2').text()).toEqual('title');
    expect(wrapperWithProps.find(PropInfo)).toHaveLength(propExists.propList.length)
  });

  //PropInfo components should have props of key, nodeProp, and selectProp
  it('If PropDisplay renders PropInfo, component should have key, nodeProp, and selectProp as props', () => {
    expect(wrapperWithProps.find(PropInfo).prop('nodeProp')).toBe(propExists.propList[0]);
    expect(wrapperWithProps.find(PropInfo).prop('selectProp')).toBe(propExists.selectProp);
  });

});