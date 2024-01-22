import React from 'react';
import {View, Text, Image, Alert, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Favorites from '../pages/Favorites/Favorites';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import GetInTouch from '../pages/GetInTouch/GetInTouch';
import LastAnnounces from '../pages/LastAnnounces/LastAnnounces';
import PersonalDetails from '../pages/PersonalDetails/PersonalDetails';
import Splash from '../pages/Splash/Splash';
import Details from '../pages/Details/Details';
import PostTrip from '../pages/PostTrip/PostTrip';
import Logout from '../pages/Logout/Logout';

import home from '../assets/images/tab/home.png';
import global from '../assets/images/tab/global.png';
import appartment from '../assets/images/tab/appartment.png';
import delivery from '../assets/images/tab/delivery.png';
import plus from '../assets/images/tab/plus.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();

function Root() {
  const isLoggedIn = useSelector(state => state['userAccountData'].isLoggedIn);
  const handleLogout = ()=>{
     Alert.alert('logout');
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen name="Home" component={Tabs} />
      {!isLoggedIn && (
        <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </>
      )}

      {isLoggedIn && (
        <>
          <Drawer.Screen name="Account" component={PersonalDetails} />
          <Drawer.Screen name="My Favorites" component={Favorites} />
          <Drawer.Screen name="Logout" component={Logout} />
        </>
      )}

      {/* <Drawer.Screen name="Favorites" component={Tabs} /> */}
      {/* <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="GetInTouch" component={GetInTouch} />
      <Drawer.Screen name="LastAnnounces" component={LastAnnounces} />
      <Drawer.Screen name="PersonalDetails" component={PersonalDetails} />
      <Drawer.Screen name="Details" component={Details} />
      <Drawer.Screen name="PostTrip" component={PostTrip} />
      <Drawer.Screen name="Splash" component={Splash} /> */}
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#009DE0',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.3,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
            shadowOpacity: 0.3,
            shadowColor: '#000',
          },
        }),
      }}>
      {children}
    </View>
  </TouchableOpacity>
);
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="Main"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={home}
                resizeMode="contain"
                style={{
                  width: 21,
                  height: 21,
                  tintColor: focused ? '#009de0' : '#c4c4c4',
                }}
              />
              {/* <Text>Home</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={global}
                resizeMode="contain"
                style={{
                  width: 21,
                  height: 21,
                  tintColor: focused ? '#009de0' : '#c4c4c4',
                }}
              />
              {/* <Text>Home</Text> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="PostTrip"
        component={PostTrip}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={plus}
              resizeMode="contain"
              style={{
                width: 26,
                height: 26,
                tintColor: '#fff',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={appartment}
                resizeMode="contain"
                style={{
                  width: 21,
                  height: 21,
                  tintColor: focused ? '#009de0' : '#c4c4c4',
                }}
              />
              {/* <Text>Home</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={delivery}
                resizeMode="contain"
                style={{
                  width: 21,
                  height: 21,
                  tintColor: focused ? '#009de0' : '#c4c4c4',
                }}
              />
              {/* <Text>Home</Text> */}
            </View>
          ),
        }}
      />

      {/* <Tab.Screen name="Login" component={Login} />
  <Tab.Screen name="Register" component={Register} /> */}

      {/* <Tab.Screen name="GetInTouch" component={GetInTouch} /> */}
      {/* <Tab.Screen name="LastAnnounces" component={LastAnnounces} />
  <Tab.Screen name="Details" component={Details} />
  <Tab.Screen name="PostTrip" component={PostTrip} /> */}
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const Routers = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routers;
