import { View, Text } from 'react-native';

export function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      {/* <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        /> */}
    </View>
  );
}