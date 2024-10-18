import { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

import { useHandleUserData } from '../Hooks/useHandleUserData';

function UploadProfileImage() {
	const [selectedImage, setSelectedImage] = useState<string>('');
	const [selectedImageFilepath, setSelectedImageFilepath] = useState<string>('');
	const { userData, handleUserData } = useHandleUserData();

	const pickImageAndUpload = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			alert("画像を選択するための権限がありません。");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			console.log("result.assets[0].uri: ", result.assets[0].uri);
			setSelectedImage(result.assets[0].uri);
			handleUserData("imagePath", result.assets[0].uri);
		};
	}

	return (
		<TouchableOpacity onPress={() => pickImageAndUpload()}>
			{selectedImage ? (
				<Image
					source={{ uri: selectedImage }}
					style={styles.image}
					width={100}
				/>
			) : (
				<Icon
					name="person-circle"
					color={"#666666"}
					size={100}
				/>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 90,
		height: 90,
		borderRadius: 50,
		marginTop: 5
	}
})

export default UploadProfileImage;