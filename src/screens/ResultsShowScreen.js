import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button} from 'react-native';
import yelp from '../api/yelp';
import openMap from 'react-native-open-maps';

const ResultsShowScreen = ({navigation}) => {
	const [result, setResult] = useState(null);
	const id = navigation.getParam('id');

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

	onPress = () => {
		openMap({ latitude: 23.8103, longitude: 90.4125 });
	}
	 
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{result.name}</Text>
			<Text>{result.rating} Stars, {result.review_count} Reviews</Text>
			<Text>Cell : {result.phone}</Text>
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

