import React from 'react';
import renderer from 'react-test-renderer';
import TextField from '../../components/common/TextField';

test('renders correctly', () => {
  const tree = renderer.create(<TextField />).toJSON;
  expect(tree).toMatchSnapshot();
});
