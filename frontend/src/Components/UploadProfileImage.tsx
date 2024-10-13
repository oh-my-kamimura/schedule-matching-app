import {
	View, Text, Alert,
	StyleSheet, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

function UploadProfileImage() {

	const pickImageAndUpload = async () => {
    
	};

	return (
		<TouchableOpacity onPress={() => pickImageAndUpload() }>
			<Icon
				name="person-circle" 
				color={"#666666"} 
				size={100}
			/>
		</TouchableOpacity>
	)
}

export default UploadProfileImage;