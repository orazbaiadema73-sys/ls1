import React, { useRef, useState } from 'react';

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

const CODE_LENGTH = 4;

type Props = {
  onBack: () => void;
  phone: string;
  onSubmitCode: (code: string) => void;
  onResend: () => void;
};

export default function VerifyCode({ onBack, phone, onSubmitCode, onResend }: Props) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChangeDigit = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '');

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

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
          Подтвердить номер
        </Text>

        <Text style={styles.subtitle}>
          Мы только что отправили код на{'\n'}
          <Text style={styles.phoneText}>{phone}</Text>
        </Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputsRef.current[index] = ref;
              }}
              style={[styles.codeBox, digit ? styles.codeBoxFilled : null]}
              value={digit}
              onChangeText={(text) => handleChangeDigit(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <Pressable
          style={styles.continueButton}
          onPress={() => onSubmitCode(code.join(''))}
        >
          <Text style={styles.continueButtonText}>
            Продолжить
          </Text>
        </Pressable>

        <Pressable onPress={onResend} style={styles.resendWrapper}>
          <Text style={styles.resendText}>
            Отправить код еще раз
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
    fontSize: 27,
    fontWeight: '700',
    color: '#1B1923',
  },

  subtitle: {
    fontSize: 18,
    color: '#AAA9B2',
    marginTop: 5,
    marginBottom: 29,
  },

  phoneText: {
    color: '#1B1923',
    fontWeight: '600',
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  codeBox: {
    width: 68,
    height: 62,
    backgroundColor: '#F8F8FA',
    borderRadius: 18,
    fontSize: 22,
    fontWeight: '700',
    color: '#1B1923',
  },

  codeBoxFilled: {
    backgroundColor: '#F0EAFB',
  },

  continueButton: {
    width: '100%',
    height: 58,
    backgroundColor: '#A855F7',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  resendWrapper: {
    alignSelf: 'center',
    marginTop: 22,
  },

  resendText: {
    color: '#A855F7',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
