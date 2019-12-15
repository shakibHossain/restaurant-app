import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
	return (
		<View style={styles.backgroundStyle}>
			<FontAwesome style={styles.iconStyle} name="search"/>
			<TextInput 
				autoCapitalize="none"
				autoCorrect={false}
				style={styles.inputStyle} 
				placeholder="Search"
				value={term}
				onChangeText={onTermChange} //reference to the function 
				onEndEditing={onTermSubmit} //reference to the function
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	backgroundStyle:{
		marginTop: 10,
		backgroundColor:'#F0EEEE',
		height: 40,
		borderRadius: 5,
		marginHorizontal: 15,
		flexDirection: 'row',
		marginBottom:10
	},
	inputStyle: {
		flex: 1,
		fontSize: 18
	},
	iconStyle: {
		fontSize: 35,
		alignSelf: 'center',
		marginHorizontal: 15
	}
});

export default SearchBar;