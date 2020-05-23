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
  const PropDisplayPropsListNull = {
    title: 'title',
    propList: null,
    selectProp: () => console.log('selectProp')
  }
  // Props when PropsList exists
  const PropDisplayPropsListExists = {
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
  const wrapperNoProps = shallow(<PropDisplay {...PropDisplayPropsListNull} />)
  // Wrapper for props
  const wrapperWithProps = shallow(<PropDisplay {...PropDisplayPropsListExists} />)

  // PropDisplay should render empty div if props.propList doesn't exist
  it('PropDisplay should render empty div if propsList is null', () => {
    expect(wrapperNoProps.find('div')).toHaveLength(1);
  })
  // PropDisplay should render an array of PropInfo components if props.propList exists
  it('PropDisplay should render a <h2> title and PropInfo component for every element in propList', () => {
    expect(wrapperWithProps.find('h2').text()).toEqual('title');
    expect(wrapperWithProps.find(PropInfo)).toHaveLength(PropDisplayPropsListExists.propList.length)
  })
  //PropInfo components should have props of key, nodeProp, and selectProp
  it('PropDisplay should render PropInfo component if propsList is null', () => {

  })


})