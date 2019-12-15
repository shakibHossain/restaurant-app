import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.yelp.com/v3/businesses',
	headers: {
		Authorization: 'Bearer ondgyd0UJUTOxsRhwF-G9OVNXvt9agxU9DDq5MVhpF3REtmqvxrL3NjI9FNA9xsvZyNvM0wcxBksZKDnU2z_9QZ0OhJRr2jps65d72IVJIELj-QABldXT0K-U-PoXXYx'
	}
});