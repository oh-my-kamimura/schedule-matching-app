import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Header from '../../Elements/Header';

function SetupScreen () {
  const [userName, setUserName] = useState('');
  const [remarks, setRemarks] = useState('');
  const [image, setImage] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	return (
	  <View style={{ flex: 1 }}>
      <Header title="初期登録" />
      <PaperProvider>
        <TextInput
          mode="outlined"
          label="ユーザ名"
          placeholder="ユーザ名を入力してください"
          value={userName} 
          onChangeText={setUserName}
          style={styles.textInput}
        />
        <TextInput
          mode="outlined"
          label="備考"
          placeholder="備考を入力してください"
          value={remarks}
          onChangeText={setRemarks}
          style={styles.textInput}
        />
      </PaperProvider>
	  </View>
	);
};

const styles = StyleSheet.create({
	textInput: {
		justifyContent: 'center', 
    marginTop: 10,
    marginHorizontal: 20,
    borderColor: '#4B8687'
	},
});

export default SetupScreen
