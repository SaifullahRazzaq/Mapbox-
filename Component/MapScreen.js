import React, { Component } from 'react';
import { Modal, View, StyleSheet, TextInput, Dimensions, Picker, Text, TouchableOpacity, Image, FlatList, StatusBar, SafeAreaView, Button, ScrollView } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import RNGooglePlaces from 'react-native-google-places';
import { SearchBar, Icon, ThemeProvider } from 'react-native-elements'
import MapboxGL, { Layer, features } from '@react-native-mapbox-gl/maps';
import { Container, Header, Item, Input } from 'native-base';
import * as geolib from 'geolib';
import { cond } from 'react-native-reanimated';




Mapbox.setAccessToken(
  'pk.eyJ1Ijoibm9idGliYSIsImEiOiJjazh2ZWwxdjEwMnQ3M21tY3Y3aXJjYzQxIn0.6OGijxB0_EV3CenM860ziw'
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
      modalVisible: false,
      flag: true,
      selectuserlat: '',
      selectuserlong: '',
      location: {},
      case: '',
      date: '',
      distance: '',
      places: [],
      data: [],
      MyData: [],
      select: 'Select a value',
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
      throw (err)
    }

    return fetch(`http://134.209.102.183:5000/api/process?daterange=0`)
      .then((response) => response.json())
      .then((responseJson) => {


        var joined = this.state.data.concat(responseJson.data[0].locations);
        this.setState({ data: joined, MyData: responseJson.data, case: responseJson.data[0].no_of_cases, date: responseJson.data[0].date })

      })






  }





  updateSearch(search) {

    this.setState({ search: search })
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=pk.eyJ1Ijoic2FpZnVsbGFoMTIzIiwiYSI6ImNrOG9tNTgzODFhcTIzZW13YWRpNjVvbnkifQ.Txvwh8tqAWrkiQNphL4Ddw`)
      .then((response) => response.json())
      .then((responseJson) => {



        this.setState({ places: responseJson.features, location: responseJson.features })


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
          source={require('../Ima/marker.jpg')}
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
    const { places, selectuserlat, selectuserlong, location, distance } = this.state;
    // const { navigate } = this.props.navigation
    console.log("Date====>", distance)










    return (

      <Container>
        <StatusBar hidden={true}></StatusBar>

        <Header searchBar rounded style={{ backgroundColor: '#FF8081', width: '100%' }}>
          <Item>
            <Icon name="ios-search" type="ionicon" />
            <Input placeholder="Search" onChangeText={(search) => this.updateSearch(search)} />
            <Icon name="ios-people" type="ionicon" />
          </Item>
          <Icon name="setting" type="antdesign" color="white" onPress={() => navigate('SettingScreen', { userlat: this.state.selectuserlat, userlong: this.state.selectuserlong })} containerStyle={{ alignSelf: 'center', marginLeft: 10 }} />
        </Header>
        <View style={{ justifyContent: 'flex-start', alignContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>

          {places == null ? this.state.flag :
            places.map((item, i) => {

              return <View style={{ flexDirection: 'row' }}>
                <Icon name="map-marker" type="font-awesome" color="green" />
                <TouchableOpacity onPress={() => { this.setState({ SelectAddress: item.place_name, places: null, search: '', selectuserlat: item.center[0], selectuserlong: item.center[1], location: item.bbox }) }}>
                  <Text style={{ fontSize: 15, marginLeft: 5, color: 'black', textAlign: 'center' }}>{item.place_name}</Text>
                </TouchableOpacity>
              </View>

            })
          }
        </View>


        <View style={{ width: Dimensions.get('screen').width / 1, height: Dimensions.get('screen').height / 2 }}>
          <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Street}
            zoomEnabled={true}
            centerCoordinate={this.state.longitude, this.state.latitude}
            style={styles.container}>

            <View style={{ width: 60, height: 60, borderRadius: 30, color: 'pink' }}>

              <MapboxGL.ShapeSource id='line1' shape={this.state.route}>
                <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'black', lineWidth: 5, visibility: 'visible', lineCap: 'butt' }} />
              </MapboxGL.ShapeSource>
              <Text style={{ color: 'red', fontWeight: "bold", fontSize: 20 }}>10 Km</Text>
              <Mapbox.PointAnnotation selected={true}

                key="pointAnnotation"
                id="pointAnnotation"
                title="8 km"
                coordinate={[this.state.longitude, this.state.latitude]}>
                <Image
                  source={require('../Ima/marker.jpg')}
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
        </View>

        <View style={{ height: 25, backgroundColor: '#FF8081' }}>
          {!this.state.case || this.state.data == null ? <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Loading....</Text> :

            <View style={{ justifyContent: 'space-around', flexDirection: 'row', flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}> Case   {this.state.case}</Text>
              <Text style={{ color: 'white', fontSize: 18 }}>Date{this.state.date}</Text>
            </View>
          }
        </View>





        {this.state.SelectAddress == '' ? null :
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', height: '18%', alignContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ marginRight: 10, flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignSelf: 'center' }}>

              <Icon iconStyle={{ justifyContent: 'flex-end', flex: 1 }} name="cross" type="entypo" size={20} />
              <Text style={{ marginLeft: '3%', flex: 1, alignSelf: 'flex-start', color: '#797B83', fontWeight: 'bold', fontSize: 18 }}>{this.state.SelectAddress}</Text>
              <Text style={{ fontSize: 18 }}>3 Km</Text>
              <Icon iconStyle={{ marginLeft: 8, top: '2%', alignSelf: 'center', textAlign: 'center' }} name="map-marker" type="font-awesome" color="#FF8081" size={20} />
            </View>





          </View>



        }

        {this.state.data.map((item, i) => {
          for (var key in item) {
            return <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', height: '18%', alignContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>
              <View style={{ marginRight: 10, flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignSelf: 'center' }}>
                <Icon iconStyle={{ justifyContent: 'flex-end', flex: 1 }} name="cross" type="entypo" size={20} />
                <Text style={{ marginLeft: '3%', flex: 1, alignSelf: 'flex-start', color: '#797B83', fontWeight: 'bold', fontSize: 18 }}>{item[key].loc_addr}</Text>
                <Text style={{ fontSize: 18 }}>4</Text>
                <Icon iconStyle={{ marginLeft: 8, top: '2%', alignSelf: 'center', textAlign: 'center' }} name="map-marker" type="font-awesome" color="#FF8081" size={20} />
              </View>
            </View>
          }
        })}




      </Container>
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