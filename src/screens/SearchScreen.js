import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
	//state variables
	const [term, setTerm] = useState('');
	const [searchApi, results, errorMessage] = useResults();

	//restaurants are filterd by price
	const filterResultsByPrice = (price) => {
		//price === '$' | '$$' | '$$$'
		return results.filter(result => {
			return result.price === price;
		});
	};
	
	return (
		<>
			<SearchBar 
				term={term} 
				onTermChange={setTerm} 
				onTermSubmit={() => searchApi(term)}
			/>
			{errorMessage ? <Text>{errorMessage}</Text> : null}
				<ScrollView>
				<ResultsList results={filterResultsByPrice('$')} title="Cheap"/>
				<ResultsList results={filterResultsByPrice('$$')} title="Expensive"/>
				<ResultsList results={filterResultsByPrice('$$$')} title="Very Expensive"/>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({});

export default SearchScreen;