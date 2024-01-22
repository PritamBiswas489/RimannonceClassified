/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import Routers from './src/routes/Routers';
import { Provider } from 'react-redux';
import store from './src/store';


const App = () => {
  return (
    <Provider store={store}>
       <Routers/>
    </Provider>
  );
};
export default App;
