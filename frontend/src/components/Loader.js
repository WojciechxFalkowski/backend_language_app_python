import { View, Animated, StyleSheet, Easing } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export const Loader = ({ isFull = false, size = 24 }) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(Animated.timing(spinValue, {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: false
  })).start();

  const animatedViewStyles = {
    transform:
      [
        {
          rotate: spinValue.interpolate(
            {
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            }
          )
        }
      ]
  }

  return (
    <View style={[
      styles.loadingWrapper, {
        backgroundColor: isFull ? 'rgba(255,255,255,0.7)' : ''
      }
    ]}>
      <Animated.View style={animatedViewStyles}>
        <AntDesign name="loading1" size={size} color="black" />
      </Animated.View>
    </View>
  )
}


const styles = StyleSheet.create({
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})
