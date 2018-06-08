import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Bar } from 'Views/common/Bar';

import { renderComponent } from '../../utils';

describe('Bar Component', () => {
  let wrapper = null;
  let changeSSR = null;

  beforeEach(() => {
    changeSSR = jest.fn();
    wrapper = shallow(renderComponent(Bar, {
     isSSR: true,
     changeSSR,
    }));
  });

  test('it should match with snapshot', () => {
    const tree = renderer.create(renderComponent(Bar, {
      isSSR: true,
      changeSSR: jest.fn(),
    }));

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('click button should call onClick function', () => {
    wrapper.find('button').simulate('click');
    expect(changeSSR.mock.calls.length).toBe(1);
  });
});
