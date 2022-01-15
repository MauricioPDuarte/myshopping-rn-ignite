import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously()

    console.log(user);
  }

  async function handleSignInWithEmailAndPassword() {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
  }

  function handleCreateUserAccount() {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert("Usuario criado com sucesso!");
    })
    .catch(error => {
      console.log(error);
      if (error.code === 'auth/weak-password') {
        Alert.alert("Senha muito pequena!");
      }
    })
  }

  function handleResetPassword() {
    auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert("Email de recuperação enviado com sucesso!")
    })
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleResetPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}