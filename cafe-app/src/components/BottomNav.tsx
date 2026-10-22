import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Tab = 'menu' | 'cart' | 'profile';

type Props = {
  active: Tab;
  cartCount: number;
  onChange: (tab: Tab) => void;
};

const TABS: { key: Tab; icon: string; label: string }[] = [
  { key: 'menu', icon: '☕', label: 'Мәзір' },
  { key: 'cart', icon: '🛒', label: 'Себет' },
  { key: 'profile', icon: '👤', label: 'Профиль' },
];

export default function BottomNav({ active, cartCount, onChange }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
            <View>
              <Text style={[styles.icon, isActive && styles.iconActive]}>{tab.icon}</Text>
              {tab.key === 'cart' && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F0F0F2', backgroundColor: '#FFFFFF', paddingTop: 8, paddingBottom: 6 },
  tab: { flex: 1, alignItems: 'center' },
  icon: { fontSize: 18, opacity: 0.4 },
  iconActive: { opacity: 1 },
  label: { fontSize: 11, color: '#AAA9B2', marginTop: 3 },
  labelActive: { color: '#A855F7', fontWeight: '600' },
  badge: { position: 'absolute', top: -6, right: -12, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#A855F7', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4 },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
});
