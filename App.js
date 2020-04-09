import React, { Component } from 'react';
import { Modal,View, StyleSheet, TextInput, Dimensions,Picker  ,Text, TouchableOpacity, Image, StatusBar, SafeAreaView ,Button, ScrollView} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import RNGooglePlaces from 'react-native-google-places';
import { SearchBar, Header, Icon } from 'react-native-elements'
import MapboxGL ,{Layer,features} from '@react-native-mapbox-gl/maps';








Mapbox.setAccessToken(
  'pk.eyJ1Ijoic2FpZnVsbGFoMTIzIiwiYSI6ImNrOG9tNTgzODFhcTIzZW13YWRpNjVvbnkifQ.Txvwh8tqAWrkiQNphL4Ddw'
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
   
    

    return fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${-84.518641},${39.134270};${-84.512023},${39.102779}?geometries=geojson&access_token=pk.eyJ1Ijoic2FpZnVsbGFoMTIzIiwiYSI6ImNrOG9tNTgzODFhcTIzZW13YWRpNjVvbnkifQ.Txvwh8tqAWrkiQNphL4Ddw`)
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
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=pk.eyJ1Ijoic2FpZnVsbGFoMTIzIiwiYSI6ImNrOG9tNTgzODFhcTIzZW13YWRpNjVvbnkifQ.Txvwh8tqAWrkiQNphL4Ddw`)
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
  
      <Mapbox.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={[this.state.longitude, this.state.latitude]}>
      <Image
      source={require('./Ima/marker.jpg')}
      style={{
        flex: 1,
        resizeMode: 'cover',
        width: 60,
        height: 60,
        borderRadius: 30
      }} />    

      </Mapbox.PointAnnotation>
     
  );
  }
  
  
  
  render() {
    const { places } = this.state;
    

    return (
      
<View >
  
      <View style={{ justifyContent: 'flex-start',alignContent:'center',backgroundColor:'white',borderRadius:10 }}>
          <SearchBar platform='ios'
            placeholder="Seach here"
            placeholderTextColor="white"
            value={this.state.search}
            onChangeText={this.updateSearch}
            
            />


          {places == null ? this.state.flag :
            places.map((item, i) => {
              return <View style={{ flexDirection: 'row' }}>
                <Icon name="map-marker" type="font-awesome" color="green" />
                <TouchableOpacity onPress={() => { this.setState({ SelectAddress: item.place_name,places:null,search:''}) }}>
                  <Text style={{ fontSize: 15, marginLeft: 5, color: 'black', textAlign: 'center' }}>{item.place_name}</Text>
                </TouchableOpacity>
              </View>


})
}









        </View>

<View style={{flex:1}}>

        <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>
                    
                    <ScrollView>
                    <View style={{flexDirection:'row',justifyContent:'space-around',borderColor:'#FF8081',borderWidth:2,backgroundColor:'#FF8081'}}>
                      <Text style={{color:'white'}}>Case</Text>
                      <Text style={{color:'white'}}>Date</Text>   
                    
                    </View>
                    {this.state.data.length==null?<Text style={{flex:1,justifyContent:'center',alignContent:'center',fontSize:20}}>Loading</Text>:this,this.state.data.map((item,i)=>{
                      return (
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                          <Text>{item.cases}</Text>
                          <Text>{item.date}</Text>
                    
                        
                        </View>
                      )
                    })}


                    
                    
<View style={{justifyContent:'flex-end'}}>
                    <Button title="Close" onPress={()=>this.setState({modalVisible:false})}></Button>
</View>     
          </ScrollView>
                    </Modal>


                    </View>


        <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height/1.4 }}>
          <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Street}
            zoomEnabled={true}
            centerCoordinate={this.state.longitude, this.state.latitude}
            style={styles.container}>

   <View style={{width:60,height:60,borderRadius:30,color:'pink'}}>

   <MapboxGL.ShapeSource id='line1' shape={this.state.route}>
            <MapboxGL.LineLayer id='linelayer1' style={{lineColor:'black',lineWidth:5,visibility:'visible',lineCap:'butt'}} />
          </MapboxGL.ShapeSource>
<Text style={{color:'red',fontWeight:"bold",fontSize:20}}>10 Km</Text>
<Mapbox.PointAnnotation selected={true}

key="pointAnnotation"
id="pointAnnotation"
title="8 km"
coordinate={[this.state.longitude, this.state.latitude]}>
      <Image
      source={require('./Ima/marker.jpg')}
      style={{
        flex: 1,
        resizeMode: 'cover',
        width: 60,
        height: 60,
        borderRadius: 30
      }} />    


      </Mapbox.PointAnnotation>
           

    

</View>
          </Mapbox.MapView>
<Button title="Show Case" onPress={()=>{this.setState({modalVisible:true})}} />
          
       

        {this.state.SelectAddress==''?null:
          <View style={{justifyContent:'space-between',flexDirection:'row',height:'18%',alignContent:'center',backgroundColor:'white',borderRadius:10}}>
       <View style={{ marginRight:10,flex:1,justifyContent:'flex-end',flexDirection:'row',alignSelf:'center'}}>
      
       <Icon iconStyle={{justifyContent:'flex-end',flex:1}} name="cross" type="entypo"  size={20}/>
        <Text style={{marginLeft:'3%',flex:1,alignSelf:'flex-start',color:'#797B83',fontWeight:'bold',fontSize:18}}>{this.state.SelectAddress}</Text>
       <Text style={{fontSize:18}}>3 Km</Text>
       <Icon iconStyle={{marginLeft:8,top:'2%',alignSelf:'center',textAlign:'center'}} name="map-marker" type="font-awesome" color="#FF8081"  size={20}/>
       </View>



     

    </View>



}

  <View style={{justifyContent:'space-between',flexDirection:'row',height:'18%',alignContent:'center',backgroundColor:'white',borderRadius:10}}>
<View style={{ marginRight:10,flex:1,justifyContent:'flex-end',flexDirection:'row',alignSelf:'center'}}>

<Icon iconStyle={{justifyContent:'flex-end',flex:1}} name="cross" type="entypo"  size={20}/>
 <Text style={{marginLeft:'3%',flex:1,alignSelf:'flex-start',color:'#797B83',fontWeight:'bold',fontSize:18}}>Gaeburg</Text>
<Text style={{fontSize:18}}>8 Km</Text>
<Icon iconStyle={{marginLeft:8,top:'2%',alignSelf:'center',textAlign:'center'}} name="map-marker" type="font-awesome" color="#FF8081"  size={20}/>
</View>
</View>

<View style={{justifyContent:'space-between',flexDirection:'row',height:'18%',alignContent:'center',backgroundColor:'white',borderRadius:10}}>
<View style={{ marginRight:10,flex:1,justifyContent:'flex-end',flexDirection:'row',alignSelf:'center'}}>

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