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

<<<<<<< HEAD
  return (
=======



Mapbox.setAccessToken(''
);
export default class MyComponent extends Component {
  constructor() {
    super();
    this.state =
    {
      latitude: 24.8324405,
      longitude: 67.0421313,
      search: '',
      SelectAddress: '',
      modalVisible:false,
      flag: true,
      places: [],
      data:[],
      select:'Select a value',
      route:
      {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  11.953125,
                  39.436192999314095
                ],
                [
                  18.896484375,
                  46.37725420510028
                ]
              ]
            }
          }
        ]
      },   
  }
      
    }
  
  
  
  
  async componentDidMount() {
    
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // alert("You can use the location")
          Geolocation.getCurrentPosition((info) => {
              this.setState({
                  latitude: info.coords.latitude,
                  longitude: info.coords.longitude,
              })

          });

      }
    
      
      else {
          alert("Location permission denied")
      }
  }
  catch (err) {
      console.warn(err)
  }


     




    //  PermissionsAndroid.requestMultiple(
    //             [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
    //             {
    //                 title: 'Give Location Permission',
    //             message: 'App needs location permission to find your position.'
    //         }
    //     ).then(granted => {
    //         console.log("granted======>",granted);
    //         resolve();
    //     }).catch(err => {
    //         console.warn(err);
    //         reject(err);
    //     });
  }



  getDirection = () => {
   
    

    return fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${-84.518641},${39.134270};${-84.512023},${39.102779}?geometries=geojson&access_token=`)
      .then((response) => response.json())
      .then((responseJson) => {

        // convert meter to km 
        var Dist=Math.round(responseJson.route[0].distance/100)
        console.log("dist==>",Dist)
        // console.log("response ========>", Math.round(responseJson.routes[0].distance) / 1000)
        

       


      })
      .catch((error) => {
        alert(error.message)
      });

      
  }




  updateSearch = (search) => {

    this.setState({ search: search })
    const arr = [];
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({ places: responseJson.features })


      })
      .catch((error) => {
        alert(error.message)
      });


  }



  renderAnnotations() {
    return (
>>>>>>> 8d0339fd93c2d9a074629cc4a57b0918b13773c3
  
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




<<<<<<< HEAD
=======
<Icon iconStyle={{justifyContent:'flex-end',flex:1}} name="cross" type="entypo"  size={20}/>
 <Text style={{marginLeft:'3%',flex:1,alignSelf:'flex-start',color:'#797B83',fontWeight:'bold',fontSize:18}}>Badin</Text>
<Text style={{fontSize:18}}>10 Km</Text>
<Icon iconStyle={{marginLeft:8,top:'2%',alignSelf:'center',textAlign:'center'}} name="map-marker" type="font-awesome" color="#FF8081"  size={20}/>
</View>
</View>

</View>
      
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    height: 400,
    marginTop: 80
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    transform: [{ scale: 0.6 }]
  }
});
>>>>>>> 8d0339fd93c2d9a074629cc4a57b0918b13773c3
