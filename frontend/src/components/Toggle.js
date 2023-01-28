import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Loader } from './Loader'

const GenericToggle = ({ label, onPress }) => {
  const [isOn, setIsOn] = useState(false);
  const toggleAnim = new Animated.Value(isOn ? 15 : 0);

  const [isLoading, setIsLoading] = React.useState(false)

  const changeValue = () => {
    const response = onPress()

    if (typeof response === 'object' && typeof response.then === 'function') {
      setIsLoading(true)
      response.then(() => {
        setIsOn(!isOn)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isOn ? 14 : 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [isOn, toggleAnim]);

  return (
    <TouchableOpacity onPress={changeValue}>
      <View style={styles.container}>
        <View style={styles.toggleContainer}>
          <Animated.View
            style={[styles.toggle, { transform: [{ translateX: toggleAnim }], opacity: isOn ? 1 : 0.3 }]} />
        </View>
        <Text style={[styles.label, { opacity: isOn ? 1 : 0.4 }]}>{label}</Text>

        {isLoading && <View style={styles.loadingContainer}>
          <Loader size={15} />
        </View>}
      </View>
    </TouchableOpacity>
  );
};

export default GenericToggle;

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  toggleContainer: {
    width: 30,
    height: 16,
    borderRadius: 15,
    borderWidth: 2,
    // borderColor: '#2D9CDB',
    marginRight: 10,
    overflow: 'hidden',
    position: 'relative'
  },
  toggle: {
    width: 10,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 15,
    position: 'absolute',
    left: 1,
    top: 1
  },
  label: {
    // color: '#2D9CDB',
    // fontWeight: '500',
    fontSize: 16
  },
  loadingContainer: {
    marginLeft: 8,
    width: 20,
    height: 20
  }
};
