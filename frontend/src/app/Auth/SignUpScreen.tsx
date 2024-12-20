import {
  View, Text, Alert,
  StyleSheet, TouchableOpacity
} from 'react-native';
import React from 'react';
import { router } from 'expo-router'
import { TextInput, Button } from 'react-native-paper';

import BackButton from '../../Components/BackButton';
import ProfileImage from '../../Components/ProfileImage';
import { useCreateAccount } from '../../Hooks/useCreateAccount';
import { FirebaseError } from 'firebase/app';

function SignUpScreen() {

  const { userData, setUserData, createAccount, loading, error } = useCreateAccount();

  const handleUserData = (field: string, value: string) => {
    console.log("userData", userData);
    setUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRegister = (): void => {
    console.log("-------------------------");
    console.log("-------------------------");
    console.log("アカウント作成処理を開始します。");
    
    createAccount()
      .then((result: any) => {
        if (result instanceof FirebaseError) {
          Alert.alert("アカウント作成時にエラーが発生しました。");
          return;
        }
        console.log("-------------------------");
        console.log("アカウント作成に成功しました。");
        router.replace('Calendar/CalendarScreen');
      })
  }

  return (
    <View style={styles.container}>
      <BackButton route='' />
      <Text style={styles.title}>
        アカウント作成
      </Text>
      <Text style={styles.description}>
        必要な情報を入力してください
      </Text>
      <TextInput
        label="表示名"
        mode="outlined"
        style={styles.textInput}
        activeOutlineColor='#4B8687'
        value={userData.userName}
        onChangeText={(text) => handleUserData('userName', text)}
        placeholder="表示名を入力してください"
        placeholderTextColor='#AAAAAA'
        autoCapitalize='none'
      />
      <TextInput
        label="メールアドレス"
        mode="outlined"
        style={styles.textInput}
        activeOutlineColor='#4B8687'
        value={userData.email}
        onChangeText={(text) => handleUserData('email', text)}
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
        value={userData.password}
        onChangeText={(text) => handleUserData('password', text)}
        secureTextEntry
        placeholder="パスワードを入力してください"
        placeholderTextColor='#AAAAAA'
        textContentType='password'
        autoCapitalize='none'
      />
      <Text style={styles.uploadText}>
        プロフィール画像
      </Text>
      <ProfileImage 
        isUploadable = {true}
        size = {90}
      />
      <TouchableOpacity onPress={() => { handleRegister() }}>
        <Button
          mode="contained"
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
  uploadText: {
    marginTop: 30,
    marginBottom: 5,
    color: '#555555'
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
