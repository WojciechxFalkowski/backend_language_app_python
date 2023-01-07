import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Button } from '../../components/Button'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import LoginSVG from '../assets/images/misc/login.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

// import CustomButton from '../components/CustomButton';
import InputField from '../../components/InputField';
import { AuthContext } from '../../context/AuthContext'

const LoginScreen = ({ navigation }) => {
  const { login, isLoading } = React.useContext(AuthContext)
  const [email, setEmail] = React.useState('maciek@gmail.com')
  const [password, setPassword] = React.useState('Admin123')

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          {/*<LoginSVG*/}
          {/*  height={300}*/}
          {/*  width={300}*/}
          {/*  style={{transform: [{rotate: '-5deg'}]}}*/}
          {/*/>*/}
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30
          }}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        {/*<CustomButton label={"Login"} onPress={() => {}} />*/}
        <Button style={styles.buttonContainer} onPress={() => login(email, password)} isDisabled={isLoading}
                isLoading={isLoading}>
          <Text style={styles.buttonText}>Login</Text>
        </Button>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#AD40AF',
    borderWidth: 0,
    marginBottom: 30,
    height: 40
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff'
  }
})
