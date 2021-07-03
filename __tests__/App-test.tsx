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
  expect(validateFormContact({firstName:'firstName', lastName:'lastName', age:0, photo:'photoAvatar'})).toBe(true)
  expect(validateFormContact({firstName:'', lastName:'', age:undefined, photo:''})).toBe(false)
  expect(validateFormContact({})).toBe(false)
})
