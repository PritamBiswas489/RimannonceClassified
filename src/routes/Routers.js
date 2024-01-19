import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Favorites from '../pages/Favorites/Favorites';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import GetInTouch from '../pages/GetInTouch/GetInTouch';
import LastAnnounces from '../pages/LastAnnounces/LastAnnounces';
import PersonalDetails from '../pages/PersonalDetails/PersonalDetails';
import Details from '../pages/Details/Details';
import PostTrip from '../pages/PostTrip/PostTrip';

const Drawer = createDrawerNavigator();
function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Favorites" component={Favorites} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="GetInTouch" component={GetInTouch} />
      <Drawer.Screen name="LastAnnounces" component={LastAnnounces} />
      <Drawer.Screen name="PersonalDetails" component={PersonalDetails} />
      <Drawer.Screen name="Details" component={Details} />
      <Drawer.Screen name="PostTrip" component={PostTrip} />
    </Drawer.Navigator>
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
