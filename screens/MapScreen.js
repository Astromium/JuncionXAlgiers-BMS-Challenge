import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const { width, height } = Dimensions.get('window')

export default function MapScreen({ route }) {
    const {data} = route.params
    let coordinate = {
      latitude: data.location[0],
      longitude: data.location[1],
    };
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ width, height }}
          initialRegion={{
            latitude: data.location[0],
            longitude: data.location[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={coordinate}
            title={data.firstName}
            
          />
        </MapView>
      </View>
    );
}
