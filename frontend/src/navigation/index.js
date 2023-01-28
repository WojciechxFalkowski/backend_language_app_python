import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { TabNavigation } from './Tabs'
import AuthStack from './AuthStack'
import React from 'react'
import { AuthContext } from '../context/AuthContext'
// import { useColorScheme } from 'react-native';

const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)'
  }
};

export const Navigation = () => {
  const { userToken } = React.useContext(AuthContext)
  // const scheme = useColorScheme();

  return (
    //theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
    <NavigationContainer theme={MyTheme}>
      {userToken !== null ? <TabNavigation /> : <AuthStack />}
    </NavigationContainer>
  )
}
