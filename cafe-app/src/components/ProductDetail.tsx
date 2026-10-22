import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Product, SIZE_EXTRA, Size, unitPrice } from '../data/menu';

type Props = {
  product: Product;
  onBack: () => void;
  onAdd: (product: Product, size: Size, qty: number) => void;
};

const SIZES: Size[] = ['S', 'M', 'L'];

export default function ProductDetail({ product, onBack, onAdd }: Props) {
  const [size, setSize] = useState<Size>('S');
  const [qty, setQty] = useState(1);

  const total = unitPrice(product, size) * qty;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <View style={[styles.hero, { backgroundColor: product.bg }]}>
          <Text style={styles.heroEmoji}>{product.emoji}</Text>
        </View>

        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{product.category}</Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>

        {product.hasSizes && (
          <>
            <Text style={styles.sectionTitle}>Өлшемі</Text>
            <View style={styles.sizesRow}>
              {SIZES.map((s) => {
                const active = s === size;
                return (
                  <Pressable key={s} style={[styles.sizeChip, active && styles.sizeChipActive]} onPress={() => setSize(s)}>
                    <Text style={[styles.sizeLabel, active && styles.sizeLabelActive]}>{s}</Text>
                    <Text style={[styles.sizePrice, active && styles.sizePriceActive]}>
                      {product.price + SIZE_EXTRA[s]} ₸
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Саны</Text>
        <View style={styles.qtyRow}>
          <Pressable style={styles.qtyButton} onPress={() => setQty((q) => Math.max(1, q - 1))}>
            <Text style={styles.qtyButtonText}>−</Text>
          </Pressable>
          <Text style={styles.qtyValue}>{qty}</Text>
          <Pressable style={styles.qtyButton} onPress={() => setQty((q) => q + 1)}>
            <Text style={styles.qtyButtonText}>+</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Жалпы бағасы</Text>
          <Text style={styles.bottomPrice}>{total} ₸</Text>
        </View>
        <Pressable style={styles.addToCart} onPress={() => onAdd(product, size, qty)}>
          <Text style={styles.addToCartText}>Себетке қосу</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 20 },
  backButton: { width: 44, height: 44, justifyContent: 'center', marginBottom: 8 },
  backText: { fontSize: 32, color: '#1B1923', fontWeight: '300' },
  hero: { height: 220, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  heroEmoji: { fontSize: 100 },
  name: { fontSize: 26, fontWeight: '700', color: '#1B1923' },
  pill: { alignSelf: 'flex-start', backgroundColor: '#F0EAFB', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5, marginTop: 10 },
  pillText: { color: '#A855F7', fontSize: 13, fontWeight: '600' },
  description: { fontSize: 15, color: '#6B6974', lineHeight: 22, marginTop: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1B1923', marginTop: 24, marginBottom: 12 },
  sizesRow: { flexDirection: 'row' },
  sizeChip: { flex: 1, backgroundColor: '#F8F8FA', borderRadius: 14, paddingVertical: 12, alignItems: 'center', marginRight: 10 },
  sizeChipActive: { backgroundColor: '#A855F7' },
  sizeLabel: { fontSize: 16, fontWeight: '700', color: '#1B1923' },
  sizeLabelActive: { color: '#FFFFFF' },
  sizePrice: { fontSize: 12, color: '#AAA9B2', marginTop: 2 },
  sizePriceActive: { color: '#F0EAFB' },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F8F8FA', justifyContent: 'center', alignItems: 'center' },
  qtyButtonText: { fontSize: 22, color: '#1B1923' },
  qtyValue: { minWidth: 48, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#1B1923' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 14, paddingBottom: 16, borderTopWidth: 1, borderTopColor: '#F0F0F2' },
  bottomLabel: { fontSize: 12, color: '#AAA9B2' },
  bottomPrice: { fontSize: 20, fontWeight: '700', color: '#1B1923', marginTop: 2 },
  addToCart: { backgroundColor: '#A855F7', borderRadius: 16, paddingHorizontal: 28, height: 54, justifyContent: 'center' },
  addToCartText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});
