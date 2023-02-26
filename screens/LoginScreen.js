import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginByUserAndPassword } from '../services/auth';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleLogin = async () => {
    const res = await loginByUserAndPassword(email, password);
    console.log(res);
    if (res) {
      setIsSuccessModalVisible(true);
      navigation.navigate('Home');
    } else {
      console.log('Sin Datos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Modal
        visible={isSuccessModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsSuccessModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Login exitoso!</Text>
            <Button title="OK" onPress={() => setIsSuccessModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Login;