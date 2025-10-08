import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView,{Marker, Callout} from 'react-native-maps'

export default function MapScreen(){

const [location, setLocation] = useState(null);
const [selectedCoords, setSelectedCoords] = useState(null);
const [selectedMarker, setselectedMarker] = useState(null)

useEffect(()=>{
    (async ()=> {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            console.log("permission denied!");
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
    })();

},[]);

const locations = [
    { id: 1, latitude: 19.0760, longitude: 72.8777, title: "Aman", house: "101, Green Villa" },
    { id: 2, latitude: 28.7041, longitude: 77.1025, title: "Shivraj", house: "202, Blue Residency" },
    { id: 3, latitude: 13.0827, longitude: 80.2707, title: "Shreyas", house: "303, Red Cottage" },
    { id: 4, latitude: 16.0760, longitude: 72.8777, title: "srinivas", house: "404, Yellow House" },
    { id: 5, latitude: 20.7041, longitude: 77.1025, title: "vishal", house: "505, Vishal Mansion" },
    { id: 6, latitude: 11.0827, longitude: 80.2707, title: "ackyshma", house: "606, White Palace" },
    { id: 7, latitude: 3.0760, longitude: 72.8777, title: "akash", house: "707, Akash Heights" },
    { id: 8, latitude: 25.7041, longitude: 77.1025, title: "shivraj K", house: "808, Shivraj Residency" },
    { id: 9, latitude: 10.0827, longitude: 80.2707, title: "jason", house: "909, Jason Villa" },
];

return (
    <View style={styles.container}>
        <Text>Map</Text>
        <MapView style={styles.map}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }>
        {location && (
            <Marker coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
            }}
            title='You are here' 
            onPress={() => setselectedMarker({title: 'You are here', latitude: location.latitude, longitude: location.longitude, house: 'N/A'})}
            >
            <Callout>
              <View style={{ width: 180 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>You are here</Text>
                <Text>Latitude: {location.latitude}</Text>
                <Text>Longitude: {location.longitude}</Text>
              </View>
            </Callout>
            </Marker>
        )}

        {locations.map(loc => (
            <Marker
            key={loc.id}
            coordinate={{
                latitude: loc.latitude,
                longitude: loc.longitude
            }}
            title={loc.title}
    pinColor="blue"
    onPress={() => setselectedMarker(loc)}
  >
    <Callout>
      <View style={{ width: 180 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>{loc.title}</Text>
        <Text>Latitude: {loc.latitude}</Text>
        <Text>Longitude: {loc.longitude}</Text>
        <Text>House: {loc.house}</Text>
      </View>
    </Callout>
            </Marker>
        ))}
        </MapView>

        {/* Show details only for Vishal when his marker is selected */}
      {selectedMarker  && (
        <View style={styles.detailsTab}>
          <Text style={styles.detailsTitle}>Details for {selectedMarker.title}</Text>
          <Text>Latitude: {selectedMarker.latitude}</Text>
          <Text>Longitude: {selectedMarker.longitude}</Text>
          <Text>House: {selectedMarker.house}</Text>
          {/* Add more details here if needed */}
        </View>
      )}

        {location && <>
        <Text>Latitude: {location.latitude}</Text>
        <Text>Longitude: {location.longitude}</Text>
        </>}
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
     map: {
    width: "100%",
    height: '80%',
  },
  detailsTab: {
    width: "90%",
    backgroundColor: "#e6f0ff",
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    alignItems: "center",
    elevation: 2,
  },
  detailsTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "#2a4d8f"
  }
})
