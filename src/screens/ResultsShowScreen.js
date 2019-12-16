import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import yelp from '../api/yelp';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const ResultsShowScreen = ({navigation}) => {
	const [result, setResult] = useState(null);
	const id = navigation.getParam('id');

	const { width, height } = Dimensions.get('window');
	const ASPECT_RATIO = width / height;
	const LATITUDE = 37.771707;
	const LONGITUDE = -122.4053769;
	const LATITUDE_DELTA = 0.0922;
	const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
	const GOOGLE_MAPS_APIKEY = 'AIzaSyBv01sAJoLuNCEklaz43KyKSNFZHJZF5JU';

	const coordinates = [
		{
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        }
    ];

	console.log(result);

	const getResult = async (id) => {
		const response = await yelp.get(`/${id}`);
		setResult(response.data);
	};

	//runs function only one time
	useEffect(() => {
		getResult(id);
	}, []);

	if(!result){
		return null; 
	}

	 
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{result.name}</Text>
			<Text>{result.rating} Stars, {result.review_count} Reviews</Text>
			<Text>Cell : {result.phone}</Text>
			<Text>Address : {result.location.display_address}</Text>
			<FlatList
				data={result.photos}
				keyExtractor={(photo) => photo}
				renderItem={({item}) => {
					return <Image style={styles.image} source={{uri:item}} />
				}}
			/>
			<MapView
		        initialRegion={{
		          latitude: LATITUDE,
		          longitude: LONGITUDE,
		          latitudeDelta: LATITUDE_DELTA,
		          longitudeDelta: LONGITUDE_DELTA,
		        }}
		        style={StyleSheet.absoluteFill}
		      >
		        {coordinates.map((coordinate, index) =>
		          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
		        )}
		        {(coordinates.length >= 2) && (
		          <MapViewDirections
		            origin={coordinates[0]}
		            waypoints={ (coordinates.length > 2) ? coordinates.slice(1, -1): null}
		            destination={coordinates[coordinates.length-1]}
		            apikey={GOOGLE_MAPS_APIKEY}
		            strokeWidth={3}
		            strokeColor="hotpink"
		            optimizeWaypoints={true}
		            onStart={(params) => {
		              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
		            }}
		            onReady={result => {
		              console.log('Distance: ${result.distance} km')
		              console.log('Duration: ${result.duration} min.')
		              
		              this.mapView.fitToCoordinates(result.coordinates, {
		                edgePadding: {
		                  right: (width / 20),
		                  bottom: (height / 20),
		                  left: (width / 20),
		                  top: (height / 20),
		                }
		              });
		            }}
		            onError={(errorMessage) => {
		              // console.log('GOT AN ERROR');
		            }}
		          />
		        )}
		      </MapView>
				
			
			
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		marginLeft:15,
		flex:1
	},
	image:{
		height:200,
		width:300,
		marginBottom:5
	},
	title:{
		fontSize:18,
		fontWeight:'bold',
		marginBottom:5
	},
	name:{
		fontWeight:'bold'
	},
	mapStyle: {
		width: Dimensions.get('window').width,
	    height: Dimensions.get('window').height,
	}
});

export default ResultsShowScreen;

