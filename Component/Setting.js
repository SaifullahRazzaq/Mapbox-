import React, { Component } from 'react';
import { View, Text ,Dimensions} from 'react-native';
import RangeSlider from 'rn-range-slider';
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';
import { SearchBar ,Icon} from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';




export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeLow:'',
      latitude:'',
      longitude:'',
      high:'',

    };
  }


 componentDidMount()
 {
  Geolocation.getCurrentPosition((info) => {
    console.log("info===>",info)
    this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
    })

});
 } 
  render() {
    console.log("navigate===",this.props.navigation.goBack)
    return (

      <Container>
      <Header style={{backgroundColor:'#FF8081'}}>
        <Left>
          <Button transparent>
            <TouchableOpacity >
            <Icon name='arrow-back' color="white" onPress={()=>{this.props.navigation.navigate('MapScreen')}}/>
            </TouchableOpacity>
          </Button>
        </Left>
        <Body>
          <Title>Setting</Title>
        </Body>
        <Right>
          <Button transparent>
            <TouchableOpacity>
          <Icon name="setting" type="antdesign" color="white"   />
            </TouchableOpacity>
          </Button>
        </Right>
      </Header>
      <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height,backgroundColor:'#FFF'}}>
       <Text style={{fontSize:20,color:'#4A4A4A',margin:10}}>Distance To get the Notifications</Text>
        <Text style={{margin:10,fontSize:20}}>Default:-<Text>{this.state.rangeLow}</Text>
</Text>
      <RangeSlider
    style={{width:'100%', height: 80}}
    gravity={'center'}
    
    min={0}
    max={1000}
    step={20}
    selectionColor="#FF8081"
    valueType="number"
    labelStyle="bubble"
    blankColor="#FF8081"
    onValueChanged={(low, high, fromUser) => {
      this.setState({rangeLow: low, rangeHigh: high})
    }}/>
    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:6}}>
    <Text style={{color:'#96979B',textAlign:'center'}}>0m 100m 200m 300m  400m  500m 600m 700m 800m</Text>
    </View>
  
<View style={{borderWidth:2,borderColor:'#F3F3F3',backgroundColor:'#F3F3F3',top:'5%'}}>
  <Text style={{color:'#4A4A4A',fontSize:20,margin:10}}>DefaultLocation:
  <Text>{this.state.latitude},{this.state.longitude}</Text>
  
  </Text>
</View>


      </View>
    </Container>
    );
  }
}
