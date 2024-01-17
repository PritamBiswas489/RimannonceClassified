/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View} from 'react-native';
import Home from './src/pages/Home/Home';
import Favorites from './src/pages/Favorites/Favorites';
import Login from './src/pages/Login/Login';
import Register from './src/pages/Register/Register';
import ProductDetails from './src/pages/ProductDetails/ProductDetails';
import Routers from './src/routes/Routers';




const App = () => {
  return (
    <Routers/>
  );
};
export default App;
