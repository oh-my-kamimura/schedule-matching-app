import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
      {/* 画面実装 */}
	  </View>
	);
};

export default SetupScreen
