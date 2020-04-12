import React from 'react';
import { View, Text, Image, ImageBackground, Dimensions } from 'react-native';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        5000
      )
    )
  }

  async componentDidMount() { 
      const {navigate}=this.props.navigation;
    
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
   navigate('MapScreen')
    }
  }


  render() {
    return (

     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:Dimensions.get('window').height,width:Dimensions.get('screen').width}}>
          <Image source={require('../Ima/splash.png')} style={{height:Dimensions.get('window').height,width:Dimensions.get('screen').width}}/> 
        </View>
     );
  }
}



export default SplashScreen;