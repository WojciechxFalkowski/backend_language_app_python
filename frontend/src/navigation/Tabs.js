import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SetsScreen } from '../screens/game/SetsScreen';
import { PlayScreen } from '../screens/game/PlayScreen'
import { HomeScreen } from '../screens/HomeScreen';
import { SetScreen } from '../screens/game/SetScreen';
import { LogoutScreen } from '../screens/auth/LogoutScreen';
import { AuthContext } from '../context/AuthContext'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { SettingsScreen } from '../screens/game/SettingsScreen'

const HomeStack = createNativeStackNavigator();

function HomeStackScreen () {
  return (<HomeStack.Navigator>
    <HomeStack.Screen name="Home details" component={HomeScreen} />
    {/* <HomeStack.Screen name="Details" component={PlayScreen} /> */}
  </HomeStack.Navigator>);
}

const SettingsStack = createNativeStackNavigator();

function PlayStackScreen () {
  return (<SettingsStack.Navigator options={{
    title: 'My home',
    headerStyle: {
      backgroundColor: 'red'
    },
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <SettingsStack.Screen name="Sets" options={{ headerTitle: 'Zestawy' }} component={SetsScreen} />
    <SettingsStack.Screen name="Set" options={{ headerTitle: 'Zestaw' }} component={SetScreen} />
    <SettingsStack.Screen name="Learn" options={{ headerTitle: 'Ucz się' }} component={PlayScreen} />
    <SettingsStack.Screen name="Settings" options={{ headerTitle: 'Ustawienia gry' }} component={SettingsScreen} />
  </SettingsStack.Navigator>);
}

const PLAY_ROUTE_NAME = 'Game'

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  const { logout } = React.useContext(AuthContext)

  return (<Tab.Navigator initialRouteName={PLAY_ROUTE_NAME} screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: 'tomato'
    // tabBarButton: ({ children }) => <View style={{  }}>
    //   {children}
    //   <View style={{display:''}}>
    //     <TouchableOpacity>
    //       <Text>Click me</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>

  })}>
    <Tab.Screen name="Logout" component={LogoutScreen}
                options={{
                  tabBarLabel: 'Wyloguj',
                  tabBarIcon: ({ color, size }) => (
                    <SimpleLineIcons name="logout" size={24} color="black" />
                  ),
                  tabBarButton: ({ children, style }) =>
                    <TouchableOpacity style={style} onPress={logout}>
                      {children}
                    </TouchableOpacity>
                }} />
    <Tab.Screen name={PLAY_ROUTE_NAME} component={PlayStackScreen}
                options={{
                  tabBarLabel: 'Graj',
                  tabBarIcon: ({ color, size }) => (<AntDesign name="play" color={color} size={size} />)
                }} />

    {/*<Tab.Screen name="Home" component={HomeScreen}*/}
    {/*    options={{*/}
    {/*        tabBarLabel: 'Home',*/}
    {/*        tabBarIcon: ({ color, size }) => (*/}
    {/*            <Ionicons name="home" color={color} size={size} />*/}
    {/*        ),*/}
    {/*    }} />*/}
  </Tab.Navigator>)
}
