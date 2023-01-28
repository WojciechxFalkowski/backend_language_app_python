import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Loader } from './Loader'

const GenericCheckbox = ({ label, onPress, isSelected }) => {
  const [isChecked, setIsChecked] = useState(isSelected);
  const [isLoading, setIsLoading] = React.useState(false)

  const changeValue = () => {
    const response = onPress()

    if (typeof response === 'object' && typeof response.then === 'function') {
      setIsLoading(true)
      response.then(() => {
        setIsChecked(!isChecked)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  return (
    <TouchableOpacity onPress={changeValue}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          {isChecked && <View style={styles.checkedBox} />}
        </View>
        <Text style={styles.label}>{label}</Text>

        {isLoading && <View style={styles.loadingContainer}>
          <Loader size={15} />
        </View>}
      </View>
    </TouchableOpacity>
  );
};

export default GenericCheckbox;


const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  boxContainer: {
    width: 20,
    height: 20,
    borderWidth: 2,
    // borderColor: '#2D9CDB',
    borderRadius: 4,
    marginRight: 10,
    padding: 1
  },
  checkedBox: {
    flex: 1,
    backgroundColor: '#000'
  },
  label: {
    // color: '#2D9CDB',
    fontWeight: '500',
    fontSize: 16
  },
  loadingContainer: {
    marginLeft: 8,
    width: 20,
    height: 20
  }
};
