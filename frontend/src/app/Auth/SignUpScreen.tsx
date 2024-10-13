import {
  View, Text, Alert,
  StyleSheet, TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router'
import { TextInput, Button } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

import { auth } from '../../config';
import { db } from '../../config';
import BackButton from '../../Components/BackButton';

function SignUpScreen() {
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (userID: string, email: string, password: string): void => {
    console.log(userID, email, password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid)
        addDoc(collection(db, 'users'), {
          userID: userID,
          email: email,
          uid: userCredential.user.uid
        })
          .then((docRef) => {
            console.log("success", docRef.id);
          })
          .catch((error) => {
            console.log(error);
          }
          )
        router.replace('Calendar/CalendarScreen')
      })
      .catch((error) => {
        const { code, message } = error
        console.log(code, message)
        Alert.alert(message)
      })
  };

  return (
    <View style={styles.container}>
      <BackButton></BackButton>
      <Text style={styles.title}>
        アカウント作成
      </Text>
      <Text style={styles.description}>
        必要な情報を入力してください
      </Text>
      <TextInput
        label="ユーザID"
        mode="outlined"
        style={styles.textInput}
        activeOutlineColor='#4B8687'
        value={userID}
        onChangeText={setUserID}
        placeholder="ユーザIDを入力してください"
        placeholderTextColor='#AAAAAA'
        keyboardType='ascii-capable'
        autoCapitalize='none'
      />
      <TextInput
        label="メールアドレス"
        mode="outlined"
        style={styles.textInput}
        activeOutlineColor='#4B8687'
        value={email}
        onChangeText={setEmail}
        placeholder="メールアドレスを入力してください"
        placeholderTextColor='#AAAAAA'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoCapitalize='none'
      />
      <TextInput
        label="パスワード"
        mode="outlined"
        style={styles.textInput}
        activeOutlineColor='#4B8687'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="パスワードを入力してください"
        placeholderTextColor='#AAAAAA'
        textContentType='password'
        autoCapitalize='none'
      />
      <Icon name="person-circle" style={styles.person} color={"#666666"} size={100}/>
      <TouchableOpacity>
        <Button
          mode="contained"
          onPress={() => { handleRegister(userID, email, password) }}
          style={styles.button}
        >
          登録する
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
		alignItems: 'center'
	},
	title: {
		marginTop: 130,
		width: 290,
		textAlign: 'left',
		fontSize: 23,
		fontWeight: 'bold',
		color: '#4B8687'
	},
	description: {
		marginTop: 10,
		marginBottom: 15,
		width: 290,
		textAlign: 'left',
		fontSize: 14,
		color: '#4B8687'
	},
	textInput: {
		marginTop: 15,
		width: 305,
	},
  person: {
    marginTop: 30,
  },
	button: {
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#EB8434',
		marginTop: 30,
		width: 200,
		height: 45,
		borderRadius: 22.5
	}
});

export default SignUpScreen
