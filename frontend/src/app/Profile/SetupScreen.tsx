import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';
import Header from '../../Elements/Header';

function SetupScreen () {
  const [userID, setUserID] = useState('');
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
          label="ユーザID"
          placeholder="ユーザIDを入力してください"
          activeOutlineColor='#4B8687'
          value={userID} 
          onChangeText={setUserID}
          style={styles.textInput}
        />
        <TextInput
          mode="outlined"
          label="ユーザ名"
          placeholder="ユーザ名を入力してください"
          activeOutlineColor='#4B8687'
          value={userName} 
          onChangeText={setUserName}
          style={styles.textInput}
        />
        <TextInput
          mode="outlined"
          label="備考"
          placeholder="備考を入力してください"
          activeOutlineColor='#4B8687'
          value={remarks}
          onChangeText={setRemarks}
          style={styles.textInput}
        />
        <Button 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={styles.button}
        >
          登録する
        </Button>
      </PaperProvider>
	  </View>
	);
};

const styles = StyleSheet.create({
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
  }
});

export default SetupScreen
