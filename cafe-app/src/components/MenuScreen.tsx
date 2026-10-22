import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { CATEGORIES, PRODUCTS, Product } from '../data/menu';

type Props = {
  city?: string | null;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onOpenProfile: () => void;
};

export default function MenuScreen({ city, onSelectProduct, onQuickAdd, onOpenProfile }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Барлығы');

  const items = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === 'Барлығы' || p.category === category) &&
          p.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search, category]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Қош келдіңіз! ☕</Text>
            <Text style={styles.location}>📍 {city ?? 'Алматы'}</Text>
          </View>
          <Pressable style={styles.avatar} onPress={onOpenProfile}>
            <Text style={styles.avatarText}>👤</Text>
          </Pressable>
        </View>

        <View style={styles.search}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Кофе, десерт іздеу"
            placeholderTextColor="#AAA9B2"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <Pressable key={c} style={[styles.chip, active && styles.chipActive]} onPress={() => setCategory(c)}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Мәзір</Text>

        {items.length === 0 ? (
          <Text style={styles.empty}>Ештеңе табылмады</Text>
        ) : (
          <View style={styles.grid}>
            {items.map((p) => (
              <Pressable key={p.id} style={styles.card} onPress={() => onSelectProduct(p)}>
                <View style={[styles.emojiBox, { backgroundColor: p.bg }]}>
                  <Text style={styles.emoji}>{p.emoji}</Text>
                </View>
                <Text style={styles.name} numberOfLines={1}>{p.name}</Text>
                <Text style={styles.category}>{p.category}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{p.price} ₸</Text>
                  <Pressable style={styles.addButton} onPress={() => onQuickAdd(p)} hitSlop={8}>
                    <Text style={styles.addButtonText}>+</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 },
  greeting: { fontSize: 20, fontWeight: '700', color: '#1B1923' },
  location: { fontSize: 14, color: '#AAA9B2', marginTop: 4 },
  avatar: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F8F8FA', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18 },
  search: { flexDirection: 'row', alignItems: 'center', height: 54, backgroundColor: '#F8F8FA', borderRadius: 16, paddingHorizontal: 16, marginBottom: 18 },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, height: '100%', fontSize: 15, color: '#1B1923' },
  chips: { marginBottom: 24 },
  chip: { paddingHorizontal: 18, height: 38, borderRadius: 19, backgroundColor: '#F8F8FA', justifyContent: 'center', marginRight: 10 },
  chipActive: { backgroundColor: '#A855F7' },
  chipText: { fontSize: 14, color: '#AAA9B2', fontWeight: '500' },
  chipTextActive: { color: '#FFFFFF' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1B1923', marginBottom: 14 },
  empty: { fontSize: 14, color: '#AAA9B2' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#F0F0F2', padding: 10, marginBottom: 14 },
  emojiBox: { height: 110, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  emoji: { fontSize: 52 },
  name: { fontSize: 15, fontWeight: '700', color: '#1B1923' },
  category: { fontSize: 12, color: '#AAA9B2', marginTop: 2 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  price: { fontSize: 15, fontWeight: '700', color: '#1B1923' },
  addButton: { width: 30, height: 30, borderRadius: 10, backgroundColor: '#A855F7', justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#FFFFFF', fontSize: 20, lineHeight: 22, fontWeight: '600' },
});
