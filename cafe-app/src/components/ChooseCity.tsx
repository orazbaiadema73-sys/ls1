import React, { useState } from 'react';

import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

const CITIES = [
  'Астана',
  'Алматы',
  'Шымкент',
  'Қарағанды',
  'Ақтөбе',
  'Тараз',
  'Павлодар',
];

type Props = {
  onBack: () => void;
  onContinue: (city: string) => void;
};

export default function ChooseCity({ onBack, onContinue }: Props) {
  const [city, setCity] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
          Выберите город
        </Text>

        <Text style={styles.subtitle}>
          Заведения которые будут показываться вам, будут зависеть от вашего города.
        </Text>

        <Pressable
          style={styles.selectContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={city ? styles.selectValue : styles.selectPlaceholder}>
            {city ?? 'Выбрать город'}
          </Text>
          <Text style={styles.chevron}>⌄</Text>
        </Pressable>

        <View style={styles.spacer} />

        <Pressable
          style={[styles.continueButton, !city && styles.continueButtonDisabled]}
          onPress={() => city && onContinue(city)}
          disabled={!city}
        >
          <Text style={styles.continueButtonText}>
            Продолжить
          </Text>
        </Pressable>

      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalSheet}>
            <FlatList
              data={CITIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.cityRow}
                  onPress={() => {
                    setCity(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.cityRowText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
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
    fontSize: 16,
    color: '#AAA9B2',
    marginTop: 8,
    marginBottom: 29,
    lineHeight: 22,
  },

  selectContainer: {
    width: '100%',
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8FA',
    borderRadius: 18,
    paddingHorizontal: 18,
  },

  selectPlaceholder: {
    fontSize: 18,
    color: '#AAA9B2',
  },

  selectValue: {
    fontSize: 18,
    color: '#1B1923',
  },

  chevron: {
    fontSize: 22,
    color: '#AAA9B2',
  },

  spacer: {
    flex: 1,
  },

  continueButton: {
    width: '100%',
    height: 58,
    backgroundColor: '#A855F7',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  continueButtonDisabled: {
    opacity: 0.5,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 25, 35, 0.35)',
    justifyContent: 'flex-end',
  },

  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    maxHeight: '55%',
  },

  cityRow: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F2',
  },

  cityRowText: {
    fontSize: 17,
    color: '#1B1923',
  },
});
