import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useRecoilState } from 'recoil';
import { Avatar } from '@rneui/themed';

import { userDataAtom } from '../Recoil/Atom/userDataAtom';

function UploadProfileImage() {
	const [userData, setUserData] = useRecoilState(userDataAtom);

	const handleUserData = (field: string, value: string) => {
		console.log("userData", userData);
		setUserData((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

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
			handleUserData("imagePath", result.assets[0].uri);
		};
	}

	return (
		<TouchableOpacity onPress={() => pickImageAndUpload()}>
			{userData.imagePath ? (
				<Image
					source={{ uri: userData.imagePath }}
					style={styles.image}
					width={90}
				/>
			) : (
				<Avatar
					size={80}
					rounded
					icon={{ name: 'adb', type: 'material' }}
					containerStyle={{ backgroundColor: '#4B8687' }}
				>
					<Avatar.Accessory size={24} />
				</Avatar>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 85,
		height: 85,
		borderRadius: 50,
		marginTop: 3
	}
})

export default UploadProfileImage;