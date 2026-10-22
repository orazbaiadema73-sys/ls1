import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { CartItem, unitPrice } from '../data/menu';

type Props = {
  items: CartItem[];
  onChangeQty: (key: string, delta: number) => void;
  onOrder: () => void;
  onGoMenu: () => void;
};

export default function CartScreen({ items, onChangeQty, onOrder, onGoMenu }: Props) {
  const [takeAway, setTakeAway] = useState(false);

  const total = items.reduce((sum, i) => sum + unitPrice(i.product, i.size) * i.qty, 0);

  const handleOrder = () => {
    Alert.alert(
      'Тапсырыс қабылданды ✅',
      `${takeAway ? 'Өзімен алып кету' : 'Кафеде'} • ${total} ₸\nДайын болғанда хабарлаймыз.`,
      [{ text: 'Жарайды', onPress: onOrder }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Себет</Text>

        {items.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🛒</Text>
            <Text style={styles.emptyText}>Себет бос</Text>
            <Pressable style={styles.menuButton} onPress={onGoMenu}>
              <Text style={styles.menuButtonText}>Мәзірге өту</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              {items.map((i) => (
                <View key={i.key} style={styles.row}>
                  <View style={[styles.thumb, { backgroundColor: i.product.bg }]}>
                    <Text style={styles.thumbEmoji}>{i.product.emoji}</Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.itemName}>{i.product.name}</Text>
                    <Text style={styles.itemMeta}>
                      {i.product.hasSizes ? `Өлшемі ${i.size} • ` : ''}{unitPrice(i.product, i.size)} ₸
                    </Text>
                  </View>

                  <View style={styles.stepper}>
                    <Pressable style={styles.stepButton} onPress={() => onChangeQty(i.key, -1)}>
                      <Text style={styles.stepText}>−</Text>
                    </Pressable>
                    <Text style={styles.qty}>{i.qty}</Text>
                    <Pressable style={styles.stepButton} onPress={() => onChangeQty(i.key, 1)}>
                      <Text style={styles.stepText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              ))}

              <View style={styles.toggleRow}>
                {[false, true].map((v) => {
                  const active = takeAway === v;
                  return (
                    <Pressable key={String(v)} style={[styles.toggle, active && styles.toggleActive]} onPress={() => setTakeAway(v)}>
                      <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
                        {v ? 'Өзімен алып кету' : 'Кафеде'}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            <View style={styles.bottomBar}>
              <View>
                <Text style={styles.bottomLabel}>Барлығы</Text>
                <Text style={styles.bottomPrice}>{total} ₸</Text>
              </View>
              <Pressable style={styles.orderButton} onPress={handleOrder}>
                <Text style={styles.orderButtonText}>Тапсырыс беру</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 10 },
  title: { fontSize: 22, fontWeight: '700', color: '#1B1923', marginBottom: 18 },
  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyEmoji: { fontSize: 56 },
  emptyText: { fontSize: 16, color: '#AAA9B2', marginTop: 8, marginBottom: 20 },
  menuButton: { backgroundColor: '#A855F7', borderRadius: 16, paddingHorizontal: 28, height: 50, justifyContent: 'center' },
  menuButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F2' },
  thumb: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  thumbEmoji: { fontSize: 28 },
  info: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '700', color: '#1B1923' },
  itemMeta: { fontSize: 13, color: '#AAA9B2', marginTop: 3 },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepButton: { width: 30, height: 30, borderRadius: 10, backgroundColor: '#F8F8FA', justifyContent: 'center', alignItems: 'center' },
  stepText: { fontSize: 18, color: '#1B1923' },
  qty: { minWidth: 28, textAlign: 'center', fontSize: 15, fontWeight: '700', color: '#1B1923' },
  toggleRow: { flexDirection: 'row', marginTop: 22, marginBottom: 12 },
  toggle: { flex: 1, height: 46, borderRadius: 14, backgroundColor: '#F8F8FA', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  toggleActive: { backgroundColor: '#F0EAFB' },
  toggleText: { fontSize: 14, color: '#AAA9B2', fontWeight: '500' },
  toggleTextActive: { color: '#A855F7', fontWeight: '600' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, paddingBottom: 16, borderTopWidth: 1, borderTopColor: '#F0F0F2' },
  bottomLabel: { fontSize: 12, color: '#AAA9B2' },
  bottomPrice: { fontSize: 20, fontWeight: '700', color: '#1B1923', marginTop: 2 },
  orderButton: { backgroundColor: '#A855F7', borderRadius: 16, paddingHorizontal: 26, height: 54, justifyContent: 'center' },
  orderButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});
