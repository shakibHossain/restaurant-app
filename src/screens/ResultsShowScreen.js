import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button, Linking} from 'react-native';
import yelp from '../api/yelp';
import openMap from 'react-native-open-maps';

const ResultsShowScreen = ({navigation}) => {
	const [result, setResult] = useState(null);
	const id = navigation.getParam('id');

	const getResult = async (id) => {
		const response = await yelp.get(`/${id}`);
		setResult(response.data);
		console.log(response.data);
	};

	//runs function only one time
	useEffect(() => {
		getResult(id);
	}, []);

	if(!result){
		return null; 
	}

	// called when "get directions" button is clicked
	// parameters lat,lon are set accordingly from response.data
	// parameter end is set to "lat,lon"
	// to open google map with navigation mode, parameter navigate_mode is set to navigate   
	onPress = () => {
		openMap({ 
			latitude: result.coordinates.latitude, 
			longitude: result.coordinates.longitude,
			end: result.coordinates.latitude+","+result.coordinates.longitude,
			navigate_mode: "navigate"});
	}
	 
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{result.name}</Text>
			<Text>Alias : {result.alias}</Text>
			<Text>Restaurant Rating : {result.rating} Stars</Text>
			<Text>Review Count : {result.review_count} Reviews</Text>
			<Text>Price : {result.price}</Text> 
			<Text>Cell : {result.display_phone}</Text>
			<Text style={{color: 'blue'}}
			      onPress={() => Linking.openURL(result.url)}>
			  Business Page
			</Text>
			<Text>Address : {result.location.display_address}</Text>
			<TouchableOpacity style={styles.button}>
		        <Button
			    	onPress={this.onPress}
			        title="Get Directions" />
		    </TouchableOpacity>
		    <FlatList
				data={result.photos}
				keyExtractor={(photo) => photo}
				renderItem={({item}) => {
					return <Image style={styles.image} source={{uri:item}} />
				}}
			/>
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
	button: {
		marginTop:5,
		marginBottom:5,
		marginRight:5
	}
});

export default ResultsShowScreen;

