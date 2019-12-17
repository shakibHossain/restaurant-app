import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.yelp.com/v3/businesses',
	headers: {
		Authorization: 'Bearer xFuqkz18bCydiLbnCQjtrIUseP4BaOWj9_Ucn31AutFTbOqtkVQPO8suttqbjI8zx9FzvKWWwWXEbADEBd56Dbiy7aUkktG50-Gl_fEqCJNkO0dV5iHRCqPZ33D4XXYx'
	}
});