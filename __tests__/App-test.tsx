/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import validateFormContact from '../src/validation/formContactValidation';

test('Form Contact Validation', () => {
  expect(validateFormContact({firstName:'firstName', lastName:'lastName', age:1, photo:'photoAvatar'})).toEqual('')
  expect(validateFormContact({})).toEqual('First name required')
  expect(validateFormContact({lastName:'lastName', age:1, photo:'photoAvatar'})).toEqual('First name required')
  expect(validateFormContact({firstName:'firstName', lastName:'', age:1, photo:'photoAvatar'})).toEqual('Last name required')
  expect(validateFormContact({firstName:'firstName', lastName:'lastName', age:0, photo:'photoAvatar'})).toEqual('Age must be more than 0')
  expect(validateFormContact({firstName:'firstName', lastName:'lastName', age:1, photo:''})).toEqual('Select an Image')
})
