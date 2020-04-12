import React, { Component } from 'react';
import { View, Text,StyleSheet,ScrollView, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './Component/SplashScreen';
import MapScreen from './Component/MapScreen';
import SettingScreen from './Component/Setting'


enableScreens();

const Stack = createNativeStackNavigator();

function RootNavigator() {

  return (
  
    <NavigationContainer>

    <Stack.Navigator>
  
      <Stack.Screen name="SignupScreen" component={SplashScreen}  options={{headerShown:false }} />
      <Stack.Screen name="MapScreen" component={MapScreen}  options={{headerShown:false }} />
      <Stack.Screen name="SettingScreen" component={SettingScreen}   options={{headerShown:false }}/>
    </Stack.Navigator>
      
    </NavigationContainer>
  );
}





class App extends Component{
  render()
  {
    return(

      <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
      <StatusBar backgroundColor="#FF8081"></StatusBar>
      <RootNavigator/>
      </View>

    
    
 
    
    )
  }
}
export default App;




