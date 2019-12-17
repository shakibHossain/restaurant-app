import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button} from 'react-native';
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

	const goToYosemite = () => {
    	openMap({ latitude: 37.865101, longitude: -119.538330 });
  	}
	 
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{result.name}</Text>
			<Text>{result.rating} Stars, {result.review_count} Reviews</Text>
			<Text>Cell : {result.phone}</Text>
			<Text>Address : {result.location.display_address}</Text>
			<Button
		        color={'#bdc3c7'}
		        onPress={goToYosemite()}
		        title="Click To Open Maps 🗺" />
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
	}
});

export default ResultsShowScreen;

