import {useEffect, useState} from 'react';
import yelp from '../api/yelp';

export default () => {
	const [results, setResults] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	// called when search term is submitted
	// hard coded location to "regina", make it dynamic later
	const searchApi = async (searchTerm) => {
		try{
			const response = await yelp.get('/search', {
				params: {
					limit: 50,
					term: searchTerm,
					location: 'regina'

				}
			});
			setResults(response.data.businesses);	
		}
	catch(err){
			setErrorMessage('Something Went Wrong');
		}
	};
	
	// Call searchApi only one time (using useEffect) 
	// when component is first rendered,
	useEffect(() => {
		searchApi('burger');
	}, []);

	return [searchApi, results, errorMessage];
};