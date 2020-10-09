/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Login from './src/screens/Login';
import Navigator from './src/Navigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);

//Descomentar para dar Swipe Navigator 
//import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
///AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(Navigator));