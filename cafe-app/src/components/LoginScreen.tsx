import React, { useState } from 'react';

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

type Props = {
  onForgotPassword: () => void;
  onRegister: () => void;
  onLoginSuccess: () => void;
};

export default function LoginScreen({ onForgotPassword, onRegister, onLoginSuccess }: Props) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    console.log('Артқа қайту батырмасы басылды');
  };

  const handleLogin = () => {
    console.log('Войти', { phone, password });
    onLoginSuccess();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>

        <Pressable
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>
            ←
          </Text>
        </Pressable>

        <Text style={styles.title}>
          Привет, с возвращением!
        </Text>

        <Text style={styles.subtitle}>
          Войдите в свой аккаунт.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputIconText}>📞</Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Номер телефона"
            placeholderTextColor="#AAA9B2"
            keyboardType="phone-pad"
          />
        </View>

        <View style={[styles.inputContainer, styles.inputGap]}>
          <Text style={styles.inputIconText}>🔒</Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Пароль"
            placeholderTextColor="#AAA9B2"
            secureTextEntry
          />
        </View>

        <Pressable
          style={styles.forgotLink}
          onPress={onForgotPassword}
        >
          <Text style={styles.linkText}>
            Забыть пароль?
          </Text>
        </Pressable>

        <Pressable
          style={styles.primaryButton}
          onPress={handleLogin}
        >
          <Text style={styles.primaryButtonText}>
            Войти
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          У вас нет аккаунта?{' '}
          <Text style={styles.linkText} onPress={onRegister}>
            Зарегистрироваться
          </Text>
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 10,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 24,
  },

  backButtonText: {
    fontSize: 32,
    color: '#1B1923',
  },

  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1B1923',
  },

  subtitle: {
    fontSize: 18,
    color: '#AAA9B2',
    marginTop: 3,
    marginBottom: 29,
  },

  inputContainer: {
    width: '100%',
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    borderRadius: 18,
    paddingHorizontal: 18,
  },

  inputGap: {
    marginTop: 14,
  },

  inputIconText: {
    fontSize: 20,
    marginRight: 14,
  },

  input: {
    flex: 1,
    height: '100%',
    color: '#1B1923',
    fontSize: 18,
  },

  forgotLink: {
    alignSelf: 'flex-end',
    marginTop: 14,
  },

  linkText: {
    color: '#A855F7',
    fontSize: 16,
    fontWeight: '500',
  },

  primaryButton: {
    width: '100%',
    height: 58,
    backgroundColor: '#A855F7',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  footer: {
    textAlign: 'center',
    color: '#AAA9B2',
    fontSize: 16,
    marginTop: 30,
  },
});
