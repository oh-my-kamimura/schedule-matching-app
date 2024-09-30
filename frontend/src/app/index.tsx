import { View, Text } from 'react-native';
import { Redirect, router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { auth } from '../config';

function Index () {
	useEffect(() =>
		onAuthStateChanged(auth, (user) => {
			if(user !== null) {
				router.replace('/Calendar/CalendarScreen')
			}
		})
	, [])

	return (
		<Redirect href='Auth/LogInScreen' />
	)
}

export default Index;