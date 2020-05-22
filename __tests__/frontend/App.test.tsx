import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer'
import chrome from 'sinon-chrome/extensions'

import App from '../../extension/frontend/App'
import LeftPanel from '../../extension/frontend/LeftPanel'
import RightPanel from '../../extension/frontend/RightPanel'

window.chrome = chrome;

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });


// App should render a left panel and right panel
// LeftPanel should be given props of data, clickedNode, and selectNode
// RightPanel should be given props of clickedNode, selectProp, clearTree

describe('App unit tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<App />);
    
  });

  it('Expect App component to have div with className of panelWrap', () => {
    expect(wrapper.find('div').at(1).hasClass('panelWrap')).toEqual(true);
  });

  it('Expect App component to render one LeftPanel', () => {
    expect(wrapper.find(LeftPanel)).toHaveLength(1);
  })

  it('Expect App component to render one RightPanel', () => {
    expect(wrapper.find(RightPanel)).toHaveLength(1);
  })

  afterAll(() => {
    chrome.flush()
    browser.flush()
  })
});