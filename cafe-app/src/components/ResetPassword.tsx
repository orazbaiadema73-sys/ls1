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
  onContinue: (password: string) => void;
};

export default function ResetPassword({ onBack, onContinue }: Props) {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

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
          Сбросить пароль
        </Text>

        <Text style={styles.subtitle}>
          Не менее 8 символов, с прописными и строчными буквами
        </Text>

        <View style={styles.inputContainer}>
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

        <View style={[styles.inputContainer, styles.inputGap]}>
          <Text style={styles.inputIconText}>🔒</Text>

          <TextInput
            style={styles.input}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            placeholder="Повторить пароль"
            placeholderTextColor="#AAA9B2"
            secureTextEntry={!showRepeatPassword}
          />

          <Pressable onPress={() => setShowRepeatPassword((v) => !v)} hitSlop={10}>
            <Text style={styles.inputIconText}>
              {showRepeatPassword ? '🙈' : '👁'}
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.continueButton}
          onPress={() => onContinue(password)}
        >
          <Text style={styles.continueButtonText}>
            Продолжить
          </Text>
        </Pressable>

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
    fontSize: 22,
    fontWeight: '700',
    color: '#1B1923',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#AAA9B2',
    marginTop: 8,
    marginBottom: 29,
    textAlign: 'center',
    lineHeight: 21,
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

  continueButton: {
    width: '100%',
    height: 58,
    backgroundColor: '#A855F7',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
