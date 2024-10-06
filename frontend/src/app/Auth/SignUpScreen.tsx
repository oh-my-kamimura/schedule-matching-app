import {
  View, Text, Alert,
  StyleSheet, TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router'
import { TextInput, Button } from 'react-native-paper';
import Header from '../../Elements/Header';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

import { auth } from '../../config';
import { db } from '../../config';

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
      <Header title="会員登録" right="" />
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
      <Button
        mode="contained"
        onPress={() => { handleRegister(userID, email, password) }}
        style={styles.button}
      >
        登録する
      </Button>

      <View style={styles.footer}>
        <Text style={styles.footerText}>すでに会員登録している方は</Text>
        <Link href='/Auth/LogInScreen' asChild replace>
          <TouchableOpacity>
            <Text style={styles.footerLink}>こちら</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#4B8687',
    marginTop: 30,
    width: 200,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 4,
    color: '#222222'
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3'
  }
});

export default SignUpScreen
