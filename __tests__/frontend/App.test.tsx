import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer'

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

import App from '../../extension/frontend/App'
// App should render a left panel and right panel
// LeftPanel should be given props of data, clickedNode, and selectNode
// RightPanel should be given props of clickedNode, selectProp, clearTree

describe('React App unit tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it('Expect App component to have div with className of panelWrap', () => {
    expect(wrapper.find('div').toHaveClass('panelWrap'));
  });
});