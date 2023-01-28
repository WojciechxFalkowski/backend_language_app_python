import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Loader } from './Loader'

export const Button = ({ onPress, style, children, isLoading, isDisabled }) => {

  return (
    <TouchableOpacity
      style={[styles.checkButton, style]}
      onPress={onPress}
      disabled={isDisabled}>
      {children}

      {isLoading && <Loader isFull={true} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkButton: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1
  },

  checkButtonText: {
    padding: 16,
    alignItems: 'center'
  }
})
