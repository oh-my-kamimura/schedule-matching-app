import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';

function Index () {
	return (
		<Redirect href='Auth/SignUpScreen' />
	)
}

export default Index;