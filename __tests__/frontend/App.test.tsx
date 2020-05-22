import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer'

import App from '../../extension/frontend/App'
// App should render a left panel and right panel
// LeftPanel should be given props of data, clickedNode, and selectNode
// RightPanel clickedNode, selectProp, clearTree