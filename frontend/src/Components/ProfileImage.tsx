import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useRecoilState } from 'recoil';
import { Avatar } from '@rneui/themed';

import { userDataAtom } from '../Recoil/Atom/userDataAtom';

function ProfileImage(props: { isUploadable?: boolean, size: number }) {
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
		<>
			{props.isUploadable ? (
				<TouchableOpacity onPress={() => pickImageAndUpload()}>
					{userData.imagePath ? (
						<Image
							source={{ uri: userData.imagePath }}
							style={styles.image}
							width={props.size}
						/>
					) : (
						<Avatar
							size={props.size * 0.9}
							rounded
							icon={{ name: 'adb', type: 'material' }}
							containerStyle={{ backgroundColor: '#4B8687' }}
						>
							<Avatar.Accessory size={props.size * 0.24} />
						</Avatar>
					)}
				</TouchableOpacity>
			) :
				(
					userData.imagePath ? (
						<Image
							source={{ uri: userData.imagePath }}
							style={styles.image}
							width={props.size}
						/>
					) : (
						<Avatar
							size={props.size * 0.9}
							rounded
							icon={{ name: 'adb', type: 'material' }}
							containerStyle={{ backgroundColor: '#4B8687' }}
						>
						</Avatar>
					)
				)
			}
		</>
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

export default ProfileImage;