import { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'react-native-uuid';

import { storage } from '../config';

function UploadProfileImage() {

	const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
			setSelectedImage(result.assets[0].uri);
			
			const uploadImage = async (uri: string) => {
				try {
					const response = await fetch(uri);
					const blob = await response.blob();
					const filename = uuid.v4();
					const storageRef = ref(storage, `profile_images/${filename}`);
					await uploadBytes(storageRef, blob);
					const downloadURL = await getDownloadURL(storageRef);
					console.log('Uploaded image URL:', downloadURL);
				} catch (error) {
					console.error("画像のアップロードに失敗しました:", error);
				}
			};
			
			uploadImage(result.assets[0].uri);
		}
	};
	
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