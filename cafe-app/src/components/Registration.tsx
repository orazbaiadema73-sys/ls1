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
  onBack: () => void;
  onLogin: () => void;
  onContinue: (data: { name: string; phone: string; password: string }) => void;
};

export default function Registration({ onBack, onLogin, onContinue }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const canSubmit = name.length > 0 && phone.length > 0 && password.length > 0 && agreed;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>

        <Pressable
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>
            ←
          </Text>
        </Pressable>

        <Text style={styles.title}>
          Регистрация
        </Text>

        <Text style={styles.subtitle}>
          Создайте учетную запись, чтобы продолжить!
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputIconText}>👤</Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Руслан"
            placeholderTextColor="#AAA9B2"
          />
        </View>

        <View style={[styles.inputContainer, styles.inputGap]}>
          <Text style={styles.inputIconText}>📞</Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+7 (700) 555 77 55"
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
            secureTextEntry={!showPassword}
          />

          <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={10}>
            <Text style={styles.inputIconText}>
              {showPassword ? '🙈' : '👁'}
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.agreementRow}
          onPress={() => setAgreed((v) => !v)}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Text style={styles.checkboxMark}>✓</Text>}
          </View>

          <Text style={styles.agreementText}>
            Создавая учетную запись, вы соглашаетесь с нашими{' '}
            <Text style={styles.linkText}>Условиями использования</Text>
          </Text>
        </Pressable>

        <Pressable
          style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
          onPress={() => onContinue({ name, phone, password })}
          disabled={!canSubmit}
        >
          <Text style={styles.primaryButtonText}>
            Зарегистрироваться
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          Уже есть аккаунт?{' '}
          <Text style={styles.linkText} onPress={onLogin}>
            Войти
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
    marginBottom: 24,
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

  agreementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 18,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#D9D8DE',
    marginRight: 10,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: '#A855F7',
    borderColor: '#A855F7',
  },

  checkboxMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  agreementText: {
    flex: 1,
    fontSize: 14,
    color: '#AAA9B2',
    lineHeight: 20,
  },

  linkText: {
    color: '#A855F7',
    fontWeight: '600',
  },

  primaryButton: {
    width: '100%',
    height: 58,
    backgroundColor: '#A855F7',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },

  primaryButtonDisabled: {
    opacity: 0.5,
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
    marginTop: 22,
  },
});
